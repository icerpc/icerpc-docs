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
option csharp_namespace = "VisitorCenter";

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
The identifiers of the generated interfaces and struct use _Name_ converted to Pascal case with the same rule as
`protoc`'s C# code generator: the first letter and any letter that follows a digit or an underscore are converted to
uppercase, all other letters and digits are kept as-is, and underscores are removed. For example, service
`auth2service` is mapped to `IAuth2Service`, `IAuth2ServiceService`, and `Auth2ServiceClient`.

The generated code is in the C# namespace specified by the `csharp_namespace` option. Without this option, the
namespace is the Protobuf package with each period-separated segment converted to Pascal case with the same rule: for
example, package `lower.snake_case` is mapped to namespace `Lower.SnakeCase`. This is the namespace `protoc` uses for
the classes it generates for your messages.

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
option csharp_namespace = "Example";

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

In order to call a remote service, you typically construct a client struct using one of its "invoker" constructors:

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

You can also construct a client struct with its parameterless constructor and an object initializer that sets its
required `Invoker` property, and optionally its `ServiceAddress` and `EncodeOptions` properties.

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
option csharp_namespace = "Example";

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
option csharp_namespace = "Example";

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
