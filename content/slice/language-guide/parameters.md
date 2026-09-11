---
title: Parameters
description: Learn how to define parameters in Slice.
---

## Syntax

Parameters have the same syntax as [fields](fields), with two extensions:

1. When an operation returns a single parameter, this parameter cannot have a name. The syntax for this nameless return
parameter is simply `Type` or `tag(N) Type?`. For example:

    ```slice
    greet(name: string) -> string // the return parameter has a type (string) but no name.
    anotherGreet(name: string) -> tag(1) string? // the return parameter is tagged
    ```

2. The last parameter of an operation or return type may be a [stream parameter](stream-parameters), with the
`stream` keyword before the type. For example:

    ```slice
    downloadFile(name: string) -> stream uint8

    uploadMeasurements(measurements: stream Measurement)
    ```

## Tagged parameters

The syntax and semantics of tagged parameters are the same as the syntax and semantics of tagged fields. The scope of a
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

Stream parameters have their own mapping, described in [Stream parameters](stream-parameters#c#-mapping).
