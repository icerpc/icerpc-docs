---
title: Service
description: How Protobuf services are mapped to C#.
---

## Overview

A Protobuf service specifies an abstraction—a group of abstract RPC methods. A client application calls these methods
while a server application hosts an implementation of this service and all its methods.

For example:

```protobuf
syntax = "proto3";

package visitor_center;

// A simple Greeter service.
service Greeter {
    // Creates a personalized greeting.
    rpc Greet (GreetRequest) returns (GreetResponse);
}

// The request contains the name of the person to greet.
message GreetRequest {
    string name = 1;
}

// The response contains the greeting.
message GreetResponse {
    string greeting = 1;
}
```

All RPC methods are abstract at the Protobuf level: you can't implement a method in the Protobuf language.

In order to implement a Protobuf service, you need an RPC framework that provides support for Protobuf. Here, we
describe IceRPC's support for Protobuf.

## C# mapping

The `protoc-gen-icerpc-csharp` code generator generates code only for Protobuf services.

For Protobuf service _Name_, it creates two C# interfaces (I*Name* and I*Name*Service) and one C# struct (*Name*Client).
The identifiers of the generated interfaces and struct use _Name_ converted to Pascal case.

The generated code is in the same C# namespace as the classes `protoc` generates for your messages: the namespace
specified by the `csharp_namespace` option or, without this option, the Protobuf package converted to Pascal case.

The generated interfaces and struct are public by default. You can make them internal by setting the `Access` metadata
of the `ProtoFile` item to `internal` in your project file. For example:

```xml
<ItemGroup>
  <ProtoFile Update="greeter.proto" Access="internal" />
</ItemGroup>
```

`Access` applies to all the code generated from the Proto file: with `internal`, the classes `protoc` generates for your
messages are internal too.

The IceRPC examples and project templates set `Access` to `internal`.

### I*Name*

Interface I*Name* provides the client-side API that allows you to call the remote IceRPC service that implements
the associated Protobuf service. It's a minimal interface with an abstract method for each RPC method defined in this
Protobuf service.

For example:

{% aside alignment="top" %}

```protobuf
syntax = "proto3";
package example;
import "google/protobuf/empty.proto";

service Widget {
    rpc Spin (SpinConfig)
        returns (google.protobuf.Empty);
}
```

```csharp
namespace Example;

public partial interface IWidget
{
    // One C# method per RPC method
    Task<Google.Protobuf.WellKnownTypes.Empty> SpinAsync(
        SpinConfig message,
        IFeatureCollection? features = null,
        CancellationToken cancellationToken =
            default);
}
```

{% /aside %}

### *Name*Client

The generated record struct *Name*Client implements I*Name* by sending requests to a remote service with IceRPC.

In order to call a remote service, you need to construct a client struct using one of its "invoker" constructors:

```csharp
public readonly partial record struct WidgetClient : IWidget, IProtobufClient
{
    public WidgetClient(
        IInvoker invoker,
        ServiceAddress? serviceAddress = null,
        ProtobufEncodeOptions? encodeOptions = null)
    {
        ...
    }

    public WidgetClient(
        IInvoker invoker,
        System.Uri serviceAddressUri,
        ProtobufEncodeOptions? encodeOptions = null)
        : this(invoker, new ServiceAddress(serviceAddressUri), encodeOptions)
    {
    }
}
```

The `invoker` parameter represents your [invocation pipeline](/icerpc/invocation/invocation-pipeline), the
`serviceAddress` or `serviceAddressUri` parameter corresponds to the
[address](/icerpc/invocation/service-address) of the remote service, and the `encodeOptions` parameter allows
you to tune how request payloads are created: the memory pool and the minimum segment size of the pipes that hold these
payloads, and the flush threshold for streams of messages. It does not change how Protobuf messages are encoded. See
[ProtobufEncodeOptions] for details.

The generated client struct also provides a parameterless constructor. If you call this constructor directly, you also
need to initialize the invoker, for example with `new WidgetClient { Invoker = connection }`.

A `null` service address is equivalent to an icerpc service address with the default service path of the associated
Protobuf service.

{% callout type="note" %}
The default service path of a Protobuf service is `/` followed by its fully qualified name. For example, the default
service path of Protobuf service `visitor_center.Greeter` is `/visitor_center.Greeter`.
{% /callout %}

### I*Name*Service

Interface I*Name*Service is a server-side helper: it helps you create a service (a C# class) that implements Protobuf
service _Name_.

The principle is straightforward: your service class must be a partial class that implements I*Name*Service. It must
also carry the [Service] attribute.

The `Service` attribute instructs the Service Generator (a C# source generator) to implement interface [IDispatcher] by
directing incoming requests to I*Name*Service methods based on the Protobuf RPC method names.

For example:

{% aside alignment="top" %}

```protobuf
syntax = "proto3";
package example;
import "google/protobuf/empty.proto";

service Widget {
    rpc Spin (SpinConfig)
        returns (google.protobuf.Empty);
}
```

```csharp
namespace Example;

// Generated code
public partial interface IWidgetService
{
    // One method per RPC method
    ValueTask<Google.Protobuf.WellKnownTypes.Empty> SpinAsync(
        SpinConfig message,
        IFeatureCollection features,
        CancellationToken cancellationToken);
}

// Application code
[Service]
internal partial class MyWidget : IWidgetService
{
    // implement SpinAsync ...
}
```

{% /aside %}

{% callout type="note" %}
Even though I*Name*Service is an interface, it's not used as an abstraction: you shouldn't make calls to this interface
or create decorators for this interface. It's just a model that your service class must implement.
{% /callout %}

Note that the same service class can implement any number of Protobuf services, provided their RPC methods have unique
names. For example:

{% aside alignment="top" %}

```protobuf
syntax = "proto3";
package example;
import "google/protobuf/empty.proto";

service Widget {
    rpc Spin (SpinConfig)
        returns (google.protobuf.Empty);
}

service Counter {
    rpc GetCount (google.protobuf.Empty)
        returns (Count);
}
```

```csharp
// A service class that implements 2 Protobuf
// services
[Service]
internal partial class MyWidget : IWidgetService,
                                  ICounterService
{
    // implements SpinAsync and GetCountAsync.
}
```

{% /aside %}

### deprecated option

If you set the `deprecated` option to `true` on a Protobuf service, the client-side interface (I*Name*) and struct
(*Name*Client) generated by `protoc-gen-icerpc-csharp` are marked [Obsolete]. The server-side interface
(I*Name*Service) is not marked [Obsolete], so you can keep implementing a deprecated service without warnings.

[IDispatcher]: csharp:IceRpc.IDispatcher
[Obsolete]: https://learn.microsoft.com/en-us/dotnet/api/system.obsoleteattribute
[ProtobufEncodeOptions]: csharp:IceRpc.Protobuf.ProtobufEncodeOptions
[Service]: csharp:IceRpc.ServiceAttribute
