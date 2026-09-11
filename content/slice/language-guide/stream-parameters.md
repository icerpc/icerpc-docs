---
title: Stream parameters
description: Learn how to send and receive streams of elements with Slice.
---

## Syntax

The last parameter of an operation or return type may be a stream parameter, with the `stream` keyword before the type.
For example:

```slice
interface FileStore {
    downloadFile(name: string) -> stream uint8

    uploadMeasurements(measurements: stream Measurement)

    receiveNextFile() -> (name: string, contents: stream uint8)
}
```

A stream parameter cannot be tagged, and an operation can have at most one stream parameter and one stream return
parameter.

## Semantics

A stream parameter means the operation sends or returns a stream of elements of this type, not just one element. This
stream can be empty or include numerous elements. Unlike a [sequence](sequence-types), the number of elements in a
stream is unknown: the sender does not need to have all the elements up-front, and the recipient consumes the elements
as they arrive.

The non-stream parameters are always sent first. The stream, if any, follows them in the request or response payload;
see [Operation encoding](/slice/encoding/operation) for details.

Tagging is unnecessary for stream parameters because you can add or remove a stream parameter to/from an operation or a
return type without breaking on-the-wire compatibility. When the generated code decodes a payload with an unexpected
stream, it ignores this stream and tells the sender "don't send me more". In the reverse situation—the decoding code
expects a stream at the end of the payload but the sender doesn't encode anything—the decoding code simply returns an
empty stream.

## C# mapping {% icerpcSlice=true %}

The C# mapping of a stream parameter depends on the direction of the stream:

- an **outgoing** stream is a stream your code gives to the generated code: the stream argument you pass to a proxy
  method, or the stream return value your service implementation returns
- an **incoming** stream is a stream the generated code gives to your code: the stream return value you receive from a
  proxy method, or the stream argument your service implementation receives

| Stream element type | Outgoing stream         | Incoming stream     |
| ------------------- | ----------------------- | ------------------- |
| `uint8`             | [PipeReader]            | [PipeReader]        |
| any other type `T`  | [`IAsyncEnumerable<T>`] | [`IAsyncStream<T>`] |

`T` is the mapped C# type for the Slice stream element type. A stream of `uint8?` is not a byte stream: it follows the
second row of the table.

### Byte streams

A stream parameter of type `uint8` is mapped to a [PipeReader] in both directions. For example:

{% aside alignment="top" %}

```slice
interface ImageStore {
    uploadImage(name: string, bytes: stream uint8)
}
```

```csharp
// Client-side
internal partial interface IImageStore
{
    Task UploadImageAsync(
        string name,
        PipeReader bytes,
        IFeatureCollection? features = null,
        CancellationToken cancellationToken = default);
}

// Server-side
internal partial interface IImageStoreService
{
    ValueTask UploadImageAsync(
        string name,
        PipeReader bytes,
        IFeatureCollection features,
        CancellationToken cancellationToken);
}
```

{% /aside %}

When you give such a stream to the generated code, the IceRPC + Slice integration will complete this stream when it's
done reading it. This can occur when there is nothing left to read or when the peer stops reading. The IceRPC + Slice
integration always passes a null exception to [Complete].

When you receive such a stream, you must call [Complete] or [CompleteAsync] on the stream when you're done reading it.
The exception argument is ignored: the peer doesn't see a difference between a null and non-null exception.

### Streams of other elements

For all other stream element types, an outgoing stream parameter is mapped to an [`IAsyncEnumerable<T>`], and an
incoming stream parameter is mapped to an [`IAsyncStream<T>`]. For example:

{% aside alignment="top" %}

```slice
interface TemperatureProbe {
    read() -> stream float32
}
```

```csharp
// Client-side
internal partial interface ITemperatureProbe
{
    Task<IAsyncStream<float>> ReadAsync(
        IFeatureCollection? features = null,
        CancellationToken cancellationToken = default);
}

// Server-side
internal partial interface ITemperatureProbeService
{
    ValueTask<IAsyncEnumerable<float>> ReadAsync(
        IFeatureCollection features,
        CancellationToken cancellationToken);
}
```

{% /aside %}

#### Sending a stream

When you give an async enumerable to the generated code, the IceRPC + Slice integration will either iterate over all
the elements (until your async enumerable yields `break`) or cancel the iteration early, typically because the peer
doesn't want more elements. This early cancellation is communicated to your async enumerable using the
[`EnumeratorCancellationAttribute`], as demonstrated by the server-side of the [Stream example] application.

#### Receiving a stream

[`IAsyncStream<T>`] is an `IAsyncEnumerable<T>` that is also `IDisposable`: it owns the underlying transport
[PipeReader] from which the elements are decoded, and you must dispose it when you're done with it. The simplest
approach is a `using` declaration:

```csharp
using IAsyncStream<float> temperatures = await temperatureProbeProxy.ReadAsync();

await foreach (float temperature in temperatures)
{
    Console.WriteLine(temperature);
}
```

You can read all or only some of the elements: if you don't want more elements, just exit the iteration. You can also
inject your own cancellation token with the [WithCancellation] extension method. This injected cancellation token is
used to cancel a blocked or slow read operation on the underlying byte stream.

An `IAsyncStream<T>` can be enumerated at most once. Disposing the stream is idempotent, and you can dispose it while
another task is blocked in an iteration: this iteration is unblocked with an `ObjectDisposedException`.

The client-side of the [Stream example] application receives a stream return value, while the server-side of the
[Thermostat example] application receives a stream argument.

[`EnumeratorCancellationAttribute`]: https://learn.microsoft.com/en-us/dotnet/api/system.runtime.compilerservices.enumeratorcancellationattribute
[`IAsyncEnumerable<T>`]: https://learn.microsoft.com/en-us/dotnet/api/system.collections.generic.iasyncenumerable-1
[`IAsyncStream<T>`]: csharp:IceRpc.IAsyncStream-1
[Complete]: https://learn.microsoft.com/en-us/dotnet/api/system.io.pipelines.pipereader.complete
[CompleteAsync]: https://learn.microsoft.com/en-us/dotnet/api/system.io.pipelines.pipereader.completeasync
[PipeReader]: https://learn.microsoft.com/en-us/dotnet/api/system.io.pipelines.pipereader
[Stream example]: https://github.com/icerpc/icerpc-csharp/tree/0.6.x/examples/slice/Stream
[Thermostat example]: https://github.com/icerpc/icerpc-csharp/tree/0.6.x/examples/slice/Thermostat
[WithCancellation]: https://learn.microsoft.com/en-us/dotnet/api/system.threading.tasks.taskasyncenumerableextensions.withcancellation
