---
title: RPC method
description: How RPC methods are mapped to C#.
---

## C# mapping

A Protobuf RPC method named _RpcName_ in service `Greeter` is mapped to abstract method *RpcName*Async in interface
`IGreeter` and to abstract method *RpcName*Async in interface `IGreeterService`.

The mapped method name is _RpcName_ converted to Pascal case with the same rule as `protoc`'s C# code generator,
followed by `Async`: the first letter and any letter that follows a digit or an underscore are converted to uppercase,
all other letters and digits are kept as-is, and underscores are removed. For example, RPC method `get2values` is mapped
to `Get2ValuesAsync`, and RPC method `get_http_value` is mapped to `GetHttpValueAsync`.

For example:

{% aside alignment="top" %}

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

{% /aside %}

While the two methods are similar, please note they are not the same:

- the client-side method returns a `Task<T>` while the service method returns a `ValueTask<T>`
- the `features` parameter is nullable and defaults to null only in the client-side method
- the cancellation token parameter has a default value only in the client-side method

### Streaming RPC methods

A Protobuf RPC method can accept a stream of input messages, return a stream of output messages, or both, using the
`stream` keyword. The mapped C# methods are the same as for a unary RPC method, except a stream input is mapped to a
`stream` parameter (instead of a `message` parameter), and a stream output is mapped to a stream return value.

The C# type of a stream depends on its direction:

- an **outgoing** stream is a stream your code gives to the generated code, namely the input stream you pass to a
  client-side method or the output stream your service method returns
- an **incoming** stream is a stream the generated code gives to your code, namely the output stream you receive from a
  client-side method or the input stream your service method receives

| Stream direction | C# type                 |
| ---------------- | ----------------------- |
| Outgoing         | [`IAsyncEnumerable<T>`] |
| Incoming         | [`IAsyncStream<T>`]     |

`T` is the C# class that `protoc` generates for the streamed message. For example:

```protobuf
syntax = "proto3";
package example;
option csharp_namespace = "Example";

service Sensor {
    // Client streaming
    rpc Upload (stream Reading) returns (UploadSummary);

    // Server streaming
    rpc Monitor (MonitorRequest) returns (stream Reading);

    // Bidirectional streaming
    rpc Calibrate (stream Reading) returns (stream Reading);
}
```

```csharp
namespace Example;

public partial interface ISensor
{
    Task<UploadSummary> UploadAsync(
        IAsyncEnumerable<Reading> stream,
        IFeatureCollection? features = null,
        CancellationToken cancellationToken = default);

    Task<IAsyncStream<Reading>> MonitorAsync(
        MonitorRequest message,
        IFeatureCollection? features = null,
        CancellationToken cancellationToken = default);

    Task<IAsyncStream<Reading>> CalibrateAsync(
        IAsyncEnumerable<Reading> stream,
        IFeatureCollection? features = null,
        CancellationToken cancellationToken = default);
}

public partial interface ISensorService
{
    ValueTask<UploadSummary> UploadAsync(
        IAsyncStream<Reading> stream,
        IFeatureCollection features,
        CancellationToken cancellationToken);

    ValueTask<IAsyncEnumerable<Reading>> MonitorAsync(
        MonitorRequest message,
        IFeatureCollection features,
        CancellationToken cancellationToken);

    ValueTask<IAsyncEnumerable<Reading>> CalibrateAsync(
        IAsyncStream<Reading> stream,
        IFeatureCollection features,
        CancellationToken cancellationToken);
}
```

#### Sending a stream

When you give an async enumerable to the generated code, the IceRPC + Protobuf integration either iterates over all its
messages or cancels the iteration early, typically because the peer doesn't want more messages. This early cancellation
is communicated to your async enumerable using the [`EnumeratorCancellationAttribute`], as demonstrated by the server
side of the [Stream example] application.

#### Receiving a stream

[`IAsyncStream<T>`] is an `IAsyncEnumerable<T>` that is also `IDisposable`: it owns the underlying transport stream from
which the messages are decoded. Once you start iterating over it with `await foreach`, this transport stream is released
when the iteration ends, including when you exit the iteration early with `break`. If you don't iterate over the
stream, you must dispose it. A `using` declaration covers both cases:

```csharp
using IAsyncStream<Reading> readings = await sensor.MonitorAsync(new MonitorRequest());

await foreach (Reading reading in readings)
{
    Console.WriteLine(reading.Value);
}
```

An `IAsyncStream<T>` can be enumerated at most once.

### deprecated option

If you set the `deprecated` option to `true` on an RPC method, the mapped client-side methods (such as
`IGreeter.GreetAsync` and `GreeterClient.GreetAsync`) are marked [Obsolete]. The mapped service method (such as
`IGreeterService.GreetAsync`) is not marked [Obsolete], so you can keep implementing a deprecated RPC method without
warnings.

### idempotency_level option

If you set the `idempotency_level` option to `NO_SIDE_EFFECTS` or `IDEMPOTENT`, the client-side generated implementation
sets the field [RequestFieldKey.Idempotent] in the outgoing request it creates; otherwise, it leaves this field unset.

[`EnumeratorCancellationAttribute`]: https://learn.microsoft.com/en-us/dotnet/api/system.runtime.compilerservices.enumeratorcancellationattribute
[`IAsyncEnumerable<T>`]: https://learn.microsoft.com/en-us/dotnet/api/system.collections.generic.iasyncenumerable-1
[`IAsyncStream<T>`]: csharp:IceRpc.IAsyncStream-1
[Obsolete]: https://learn.microsoft.com/en-us/dotnet/api/system.obsoleteattribute
[RequestFieldKey.Idempotent]: csharp:IceRpc.RequestFieldKey#Idempotent
[Stream example]: https://github.com/icerpc/icerpc-csharp/tree/0.6.x/examples/protobuf/Stream
