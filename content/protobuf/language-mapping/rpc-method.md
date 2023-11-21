---
title: RPC method
description: Learn how RPC methods are mapped to C#.
---

## C# mapping

A Protobuf RPC method named _OpName_ in service `Greeter` is mapped to abstract method *OpName*Async in the interface
`IGreeter` and to abstract method *OpName*Async in interface `IGreeterService`.

The mapped method name is always in Pascal case, per the usual C# naming conventions, even when _OpName_ is not in
Pascal case.

For example:

{% side-by-side alignment="top" %}

```protobuf
syntax = "proto3";

package visitor_center;
option csharp_namespace = "VisitorCenter";

// A simple Greeter service.
service Greeter {
    // Creates a personalized greeting.
    rpc Greet (GreetRequest) returns (GreetResponse);
}
```

```csharp
namespace VisitorCenter;

public partial interface IGreeter
{
    Task<GreetResponse> GreetAsync(
        GreetRequest message,
        IFeatureCollection? features = null,
        CancellationToken cancellationToken =
            default);
}

public partial interface IGreeterService
{
    ValueTask<GreetResponse> GreetAsync(
        GreetRequest message,
        IFeatureCollection features,
        CancellationToken cancellationToken);
}
```

{% /side-by-side %}

While the two methods are similar, please note they are not the same:

- the client-side method returns a `Task<T>` while the service method returns a `ValueTask<T>`
- the `features` parameter is nullable and defaults to null only in the client-side method
- the cancellation token parameter has a default value only in the client-side method

### deprecated option

If you set option `deprecated` to `true` on a RPC method, the mapped C# methods are marked [Obsolete].

### idempotency_level option

If you set option `idempotency_level` to `NO_SIDE_EFFECTS` or `IDEMPOTENT`, the client-side generated implementation
sets field [RequestFieldKey.Idempotent] in the outgoing request it creates; otherwise, it leaves this field unset.

[Obsolete]: https://learn.microsoft.com/en-us/dotnet/api/system.obsoleteattribute
[RequestFieldKey.Idempotent]: csharp:IceRpc.RequestFieldKey#Idempotent
