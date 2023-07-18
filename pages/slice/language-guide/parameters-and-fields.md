---
title: Parameters and fields
description: Learn how to define parameters and fields in Slice.
---

## Syntax

The syntax for operation parameters, return parameters and fields is the same: `name: Type`, where `name` represents the
parameter or field name, and `Type` is the parameter or field type. For example:

```slice
name: string
image: sequence<uint8>
address: WellKnownType::Uri
```

When an operation returns a single parameter, this parameter cannot have a name and the syntax is slightly different:

```slice
greet(name: string) -> string // the return parameter has a type (string) but no name.
```

Two parameters or fields can be separated by either whitespace or a single comma. You would typically use a comma when
the parameters or fields are on the same line, as in:

```slice
compact struct Point { x: int32, y: int32 }
```

The type of a parameter or field can be a [primitive type](primitive-types) (such an int32 or a string), a
constructed type (a new type defined in Slice such an [enum](enum-types) or a [struct](struct-types)) or a
[proxy type](proxy-types).

## Optionals

When you define a parameter or a field, you can specify whether this parameter or field must carry a value of its type,
or if holding no value at all is also acceptable. In this latter situation, the parameter or field has an optional type,
with a `?` suffix. For example:

{% slice1 %}
```slice
encoding = Slice1

module VisitorCenter

interface Greeter {
    greet(string: name) -> string
    getBackup() -> Greeter?
}
```

Here, a greeter may or may not have backup, and the `getBackup` operation returns "not set" when called on a greeter
with no backup.

The type of a tagged parameter or field must always be optional. Otherwise, only a few types can be marked optional with
Slice1:
 - [proxies][proxy-types] (like in the example above)
 - [classes][class-types]
 - [custom types][custom-types]
{% /slice1 %}

{% slice2 %}
```slice
interface Test {
    op(x: bool, y: string)
    opOptional(x: bool?, y: string?)
}
```

With `op`, the parameter `x` is either true or false, while `y` is a string--perhaps an empty string, but not a "null
string". With `opOptional`, the parameter `x` can be true, false or not set, while `y` is a string or not set at all.
{% /slice2 %}

## Tagged parameters and fields

A parameter or field can have a tag before its name, which makes this parameter (resp. field) a "tagged parameter"
(resp. tagged field). A tag consists of the `tag` keyword followed by a tag number in parenthesis. For example:

{% slice1 %}
```slice
interface Test {
    op(tag(1) x: int32?) // tagged parameter
}

class Person {
    name: string
    tag(1) favoriteFood: Food? // tagged field
}
```
{% /slice1 %}
{% slice2 %}
```slice
interface Test {
    op(tag(1) x: int32?) // tagged parameter
}

struct Person {
    name: string
    tag(1) favoriteFood: Food? // tagged field
}
```
{% /slice2 %}

Tag parameters and fields allow you to change your Slice definitions while maintaining on the wire compatibility with
applications that use older Slice definitions without these new tagged parameters and fields.

### Tag number

A tag number is a positive integer, such as 0, 1, 77.

The scope of a tag number is the enclosing parameters or type. For example, the following definitions are correct, with
several `tag(1)` in different scopes:

```slice
interface Test {
    // Operation parameters and return parameters have separate scopes.
    op(tag(1) x: int32?) -> tag(1) string

    // anotherOp has its own scope for tag numbers.
    anotherOp(tag(1) name: string?)
}

exception MyException {
    tag(1) errorCode: int32?
}
```

### Tag type

A tagged parameter or field must have an optional type.

### Tag sorting

A tagged parameter or field can appear anywhere in the enclosing parameter list or type, in particular before or after
a non-tagged parameter or field. And you don't need to sort tag parameters/fields by tag number. For instance, the
operation below has a valid though unusual parameter list:

```slice
op(
    tag(5) x: int32?
    y: int32
    tag(1) s: string?
)
```

### Tag semantics

A regular (non-tagged) parameter/field is mandatory: it's always encoded into the request or response payload by the
sender and decoded from this payload by the recipient. If the sender and recipient don't agree on this
parameter/field--their Slice definitions are not the same--the decoding of the payload will fail.

On the other hand, a tagged parameter/field tolerates mismatches. The sender can send a tagged parameter/field that the
recipient doesn't know about (it will be ignored), and the recipient can expect a tagged parameter/field that the sender
doesn't know (the recipient will get a "not set" value).

You can add and remove tagged parameters/fields over time while maintaining on the wire compatibility. The only
constraint is you can never change the type associated with a tag number. If the type associated with tag 7 is a string,
it must always remain a string; if you were to reuse tag 7 with another type, you would break on the wire compatibility
with applications that expect tag 7 parameters/fields (in this tag number scope) to be encoded as strings.

{% slice2 %}
## Stream parameters

The last parameter of an operation or return type may be a stream parameter, such as:

```slice
downloadFile(name: string) -> stream uint8

uploadMeasurements(measurement: stream Measurement)
```

It means the operation sends or returns a stream of elements of this type, not just one element. This stream can be
empty or include numerous elements. Unlike a [sequence](sequence-types), the number of elements in a stream is unknown.

A stream parameter cannot be tagged. Tagging is unnecessary for tag parameters because you can add or remove tag
parameter to/from an operation or a return type without breaking on the wire compatibility. When the generated code
decodes a payload with an unexpected stream, it ignores this stream and tells the sender "don't send me more". In the
reverse situation--the decoding code expects a stream at the end of the payload but the sender doesn't encode
anything--the decoding code simply returns an empty stream.
{% /slice2 %}

## C# mapping

A field `name: Type` is mapped to a C# field with the same name, with name converted to Pascal case. The type of the C#
field is the mapped C# type for `Type`.

Tagged fields are mapped just like regular fields. The tag and tag number don't appear in the mapped C# API.

### Optionals in C#

Optional types are mapped to nullable C# types. For example, `int32?` is mapped to `int?` in C#.

### Parameters in C#

{% callout %}
This section is specific to the IceRPC-Slice integration.
{% /callout %}

An operation parameter `name: Type` is mapped to a C# parameter with the same name, with name converted to camel case.
The type of the C# parameter is the mapped C# type for `Type`. For example, an int32 parameter is mapped to an int
parameter in C#, as described in [Primitive types](primitive-types).

A return parameter `name: Type` is mapped to a C# return tuple field with the same name, with name converted to Pascal
case. The type of the C# field is the mapped C# type for `Type`.

Tagged parameters are mapped just like regular parameters. The tag and tag number don't appear in the mapped C# API.

{% slice2 %}
### Stream parameters in C#

{% callout %}
This section is specific to the IceRPC-Slice integration.
{% /callout %}

A stream parameter of type `uint8` is mapped to a [`PipeReader`][pipe-reader]. For example:

{% side-by-side alignment="top" %}
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
{% /side-by-side %}

When you give such a stream to the Slice generated code, the IceRPC-Slice integration will complete this stream when
it's done reading it. This can occur when there is nothing left to read or when the peer stops reading. The IceRPC-Slice
integration always pass a null exception to [`Complete`][pipe-reader-complete].

When you receive such a stream, you must call [`Complete`][pipe-reader-complete] or
[`CompleteAsync`][pipe-reader-complete-async] on the stream when you're done reading it. The exception argument is
ignored: the peer doesn't see a difference between a null and non-null exception.

For all other stream element types, a stream parameter is mapped to an `IAsyncEnumerable<T>` in C#, where the async
enumerable is the mapped C# type for the Slice stream element type. For example:

{% side-by-side alignment="top" %}
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
{% /side-by-side %}

When you give such a stream to the Slice generated code, the IceRPC-Slice integration will either iterate over all the
elements (until your async enumerable yields `break`) or cancel the iteration early, typically because the peer doesn't
want more elements. This early cancellation is communicated to your async enumerable using the
[`EnumeratorCancellation` attribute][enumerator-cancellation], as demonstrated by the server-side of the
[Stream example application][stream-example].

When you receive such a stream, you can read all or only some of the elements, as demonstrated by the client-side of the
[Stream example application][stream-example]. You don't need to do anything special if you don't want more elements:
just exit the iteration. You can also inject your own cancellation token into the async enumerable stream provided by
the generated code, with the [`WithCancellation`][with-cancellation] extension method. This injected cancellation token
is used to cancel a blocked or slow read operation on the underlying byte stream.
{% /slice2 %}

[enumerator-cancellation]: https://learn.microsoft.com/en-us/dotnet/api/system.runtime.compilerservices.enumeratorcancellationattribute
[pipe-reader]: https://learn.microsoft.com/en-us/dotnet/api/system.io.pipelines.pipereader
[pipe-reader-complete]: https://learn.microsoft.com/en-us/dotnet/api/system.io.pipelines.pipereader.complete
[pipe-reader-complete-async]: https://learn.microsoft.com/en-us/dotnet/api/system.io.pipelines.pipereader.completeasync
[stream-example]: https://github.com/icerpc/icerpc-csharp/tree/main/examples/Stream
[with-cancellation]: https://learn.microsoft.com/en-us/dotnet/api/system.threading.tasks.taskasyncenumerableextensions.withcancellation
