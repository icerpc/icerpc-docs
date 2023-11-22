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
The identifiers of the generated interfaces and struct are always in Pascal case, per the usual C# naming conventions,
even when _Name_ is not in Pascal case.

### I*Name*

Interface I*Name* provides the client-side API that allows you to call the remote IceRPC service that implements the
the associated Protobuf service. It's a minimal interface with an abstract method for each RPC method defined in this
Protobuf service.

For example:

{% side-by-side alignment="top" %}

```protobuf
syntax = "proto3";
package example;
option csharp_namespace = "Example";

service Widget {
    rpc Spin (SpinConfig)
        returns (google.protobuf.Empty)
}
```

```csharp
namespace Example;

public partial interface IWidget
{
    // One C# method per rpc method
    Task<WellKnownTypes.Empty> SpinAsync(
        SpinConfig message,
        IFeatureCollection? features = null,
        CancellationToken cancellationToken =
            default);
}
```

{% /side-by-side %}

### *Name*Client

The generated record struct *Name*Client implements I*Name* by sending requests to a remote service with IceRPC.

In order to call a remote service, you need to construct a client struct using one of its "invoker" constructors:

```csharp
public readonly partial record struct WidgetProxy : IWidget
{
    public WidgetProxy(
        IInvoker invoker,
        ServiceAddress? serviceAddress = null,
        ProtobufEncodeOptions? encodeOptions = null)
    {
        ...
    }

    public WidgetProxy(
        IInvoker invoker,
        System.Uri serviceAddressUri,
        ProtobufEncodeOptions? encodeOptions = null)
        : this(invoker, new ServiceAddress(serviceAddressUri), encodeOptions)
    {
    }
}
```

The `invoker` parameter represents your [invocation pipeline](/icerpc/invocation/invocation-pipeline), the
`serviceAddress` an `serviceAddressUri` parameters corresponds to the
[address](/icerpc/invocation/service-address) of the remote service, and the `encodeOptions` parameter allows
you to customize the encoding of your Protobuf messages. See [ProtobufEncodeOptions] for details.

A `null` service address is equivalent to an icerpc service address with the default path of the associated Protobuf
service.

{% callout type="note" %}
The default path of a Protobuf service is `/` followed by its fully qualified name. For example, the default path of
Protobuf service `visitor_center.Greeter` is `/visitor_center.Greeter`.
{% /callout %}

### I*Name*Service

Interface I*Name*Service is a server-side helper: it helps you create a service (a C# class) that implements Protobuf
service _Name_.

The principle is straightforward: your service class must be a partial class that implements I*Name*Service. It must
also carry the [ProtobufService] attribute.

The `ProtobufService` attribute instructs the Protobuf Service source generator to implement interface [IDispatcher] by
directing incoming requests to I*Name*Service methods based on the Protobuf RPC method names.

For example:

{% side-by-side alignment="top" %}

```protobuf
syntax = "proto3";
package example;
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
    // One method per operation
    ValueTask<WellKnownTypes.Empty> SpinAsync(
        SpinConfig message,
        IFeatureCollection features,
        CancellationToken cancellationToken);
}

// Application code
[ProtobufService]
internal partial class MyWidget : IWidgetService
{
    // implement SpinAsync ...
}
```

{% /side-by-side %}

{% callout type="note" %}
Even though I*Name*Service is an interface, it's not used as an abstraction: you shouldn't make calls to this interface
or create decorators for this interface. It's just a model that your service class must implement.
{% /callout %}

Note that the same service class can implement any number of Protobuf services, provided their RPC methods have unique
names. For example:

{% side-by-side alignment="top" %}

```protobuf
syntax = "proto3";
package example;
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
[ProtobufService]
internal partial class MyWidget : IWidgetService,
                                  ICounterService
{
    // implements SpinAsync and GetCountAsync.
}
```

{% /side-by-side %}

### deprecated option

If you set the `deprecated` option to `true` on a Protobuf service, the 2 interfaces and the struct generated by
`protoc-gen-icerpc-csharp` are marked [Obsolete].

[IDispatcher]: csharp:IceRpc.IDispatcher
[Obsolete]: https://learn.microsoft.com/en-us/dotnet/api/system.obsoleteattribute
[ProtobufEncodeOptions]: csharp:IceRpc.Protobuf.ProtobufEncodeOptions
[ProtobufService]: csharp:IceRpc.Protobuf.ProtobufServiceAttribute
