---
title: Parameters
description: Learn how to define parameters in Slice.
---

## Syntax

{% slice1 %}
Parameters have the same syntax as [fields](fields), with one exception: when an operation returns a single parameter,
this parameter cannot have a name. The syntax for this nameless return parameter is simply `Type` or `tag(N) Type?`.

For example:

```slice
greet(name: string) -> string // the return parameter has a type (string) but no name.
anotherGreet(name: string) -> tag(1) string? // the return parameter is tagged
```

{% /slice1 %}
{% slice2 %}
Parameters have the same syntax as [fields](fields), with two extensions:

1. When an operation returns a single parameter, this parameter cannot have a name. The syntax for this nameless return
parameter is simply `Type` or `tag(N) Type?`. For example:

    ```slice
    greet(name: string) -> string // the return parameter has a type (string) but no name.
    anotherGreet(name: string) -> tag(1) string? // the return parameter is tagged
    ```

2. The last parameter of an operation or return type may be a stream parameter, with the `stream` keyword before the
type. For example:

    ```slice
    downloadFile(name: string) -> stream uint8

    uploadMeasurements(measurement: stream Measurement)
    ```

    It means the operation sends or returns a stream of elements of this type, not just one element. This stream can be
    empty or include numerous elements. Unlike a [sequence](sequence-types), the number of elements in a stream is
    unknown.

    A stream parameter cannot be tagged. Tagging is unnecessary for stream parameters because you can add or remove a
    stream parameter to/from an operation or a return type without breaking on the wire compatibility. When the
    generated code decodes a payload with an unexpected stream, it ignores this stream and tells the sender "don't send
    me more". In the reverse situation—the decoding code expects a stream at the end of the payload but the sender
    doesn't encode anything—the decoding code simply returns an empty stream.
{% /slice2 %}

## Tagged parameters

The syntax and semantics of tagged parameters is the same as the syntax and semantics of tagged fields. The scope of a
tag number within an operation is the parameter list or return type that contains the tagged parameter. It doesn't
encroach on the scope of other tagged parameters or fields.

For example, the following Slice definitions are valid since all `tag(1)` are in different tag scopes:

```slice
interface SingingGreeter {
    // Creates a personalized greeting and a song.
    greet(
        name: string
        tag(1) timeOfDay: TimeOfDay?
    ) -> (
        greeting: string
        tag(1) song: Sequence<uint8>?
    )
}
```

## C# mapping {% icerpcSlice=true %}

An operation parameter `name: Type` is mapped to a C# parameter with the same name, with name converted to camel case.
The type of the C# parameter is the mapped C# type for `Type`. For example, an `int32` parameter is mapped to an `int`
parameter in C#, as described in [Primitive types](primitive-types).

A return parameter `name: Type` is mapped to a C# return tuple field with the same name, with name converted to Pascal
case. The type of the C# field is the mapped C# type for `Type`.

Tagged parameters are mapped just like regular parameters. The tag and tag number don't appear in the mapped C# API.

{% slice2 %}
### Stream parameters in C#

A stream parameter of type `uint8` is mapped to a [PipeReader]. For example:

{% aside alignment="top" %}

```slice
interface ImageStore {
    uploadImage(name: string, bytes: stream uint8)
}
```

```csharp
public partial interface IImageStore
{
    Task UploadImageAsync(
        string name,
        PipeReader bytes,
        IFeatureCollection? features = null,
        CancellationToken cancellationToken = default);
}
```

{% /aside %}

When you give such a stream to the generated code, the IceRPC + Slice integration will complete this stream when it's
done reading it. This can occur when there is nothing left to read or when the peer stops reading. The IceRPC + Slice
integration always passes a null exception to [Complete].

When you receive such a stream, you must call [Complete] or [CompleteAsync] on the stream when you're done reading it.
The exception argument is ignored: the peer doesn't see a difference between a null and non-null exception.

For all other stream element types, a stream parameter is mapped to an [`IAsyncEnumerable<T>`], where
the async enumerable element type is the mapped C# type for the Slice stream element type. For example:

{% aside alignment="top" %}

```slice
interface TemperatureProbe {
    read() -> stream float32
}
```

```csharp
public partial interface ITemperatureProbe
{
    Task<IAsyncEnumerable<float>> ReadAsync(
        IFeatureCollection? features = null,
        CancellationToken cancellationToken = default);
}
```

{% /aside %}

When you give such a stream to the generated code, the IceRPC + Slice integration will either iterate over all the
elements (until your async enumerable yields `break`) or cancel the iteration early, typically because the peer doesn't
want more elements. This early cancellation is communicated to your async enumerable using the
[`EnumeratorCancellationAttribute`], as demonstrated by the server-side of the [Stream example] application.

When you receive such a stream, you can read all or only some of the elements, as demonstrated by the client-side of the
[Stream example] application. You don't need to do anything special if you don't want more elements:
just exit the iteration. You can also inject your own cancellation token into the async enumerable stream provided by
the generated code, with the [WithCancellation] extension method. This injected cancellation token is used to cancel a
blocked or slow read operation on the underlying byte stream. {% /slice2 %}

[`EnumeratorCancellationAttribute`]: https://learn.microsoft.com/en-us/dotnet/api/system.runtime.compilerservices.enumeratorcancellationattribute
[PipeReader]: https://learn.microsoft.com/en-us/dotnet/api/system.io.pipelines.pipereader
[Complete]: https://learn.microsoft.com/en-us/dotnet/api/system.io.pipelines.pipereader.complete
[CompleteAsync]: https://learn.microsoft.com/en-us/dotnet/api/system.io.pipelines.pipereader.completeasync
[Stream example]: https://github.com/icerpc/icerpc-csharp/tree/0.2.x/examples/slice/Stream
[WithCancellation]: https://learn.microsoft.com/en-us/dotnet/api/system.threading.tasks.taskasyncenumerableextensions.withcancellation
[`IAsyncEnumerable<T>`]: https://learn.microsoft.com/en-us/dotnet/api/system.collections.generic.iasyncenumerable-1
