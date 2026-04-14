---
title: Examples
description: Discover the Slice syntax through a few examples.
---

This page offers a quick overview of the Slice syntax through examples.

## Interfaces

```slice
module Example

interface Widget {
    spin(count: int32)
}

// An interface can extend one or more other interfaces
interface Gizmo : Widget {
    walk(direction: Direction)
}
```

## Operations

```slice
module Example

interface MyOperations {
    // no operation parameter, no return parameter
    opVoid()

    // a single operation parameter, no return parameter
    opParam(message: string)

    // a single operation parameter and single return parameter with an optional type
    opParamReturn(message: string) -> int32?

    // an operation can also return a Result
    opResult(message: string) -> Result<string, int32>

    // two operation parameters and two return parameters
    opParamsReturns(message: string, count: int32) -> (value: float32, list: Sequence<int32>)

    // an operation with tagged operation parameters and tagged return parameters
    opTagged(message: string, tag(1) from: string?) -> (value: float32, tag(1) list: Sequence<int32>?)

    // a regular operation parameter and a stream operation parameter
    sendFile(name: string, contents: stream uint8)

    // a stream return parameter
    receiveTextFile(name: string) -> stream string

    // two return parameters; the last return parameter is a stream
    receiveNextFile() -> (name: string, contents: stream uint8)

    // a one-way operation
    [oneway] opOneway(message: string)

    // an idempotent operation
    idempotent opIdempotent(message: string) -> int32
}
```

## Enums

```slice
module Example

// A basic enum has an underlying type and one or more enumerators.
// It is checked by default, which means the decoding rejects
// unknown enumerators.
enum Fruit : uint8 {
    Apple
    Strawberry
    Pineapple
}

// An unchecked basic enum can hold any value in its underlying type.
unchecked enum Permissions : uint8 {
    Execute = 0
    Read = 1
    Write = 2
    Delete = 4
}

// A variant enum is a discriminated union, and doesn't have an
// underlying type. Its members (called variants) may have fields,
// including tagged fields.
enum Shape {
    Circle(radius: uint32, tag(1) color: Color?)
    Rectangle(width: uint32, length: uint32)
    Dot
}

// A variant enum can also be unchecked.
unchecked enum TwoDShape {
    Circle(radius: uint32, tag(1) color: Color?)
    Rectangle(width: uint32, length: uint32)
    // can add more enumerators later on
}
```

## Result

```slice
module Example

// A 'Result<Success, Failure>' is a constructed Slice type, and can be used like
// any other Slice type, for example as the type of a field. It is most commonly
// used as the return type of an operation.

interface Portal {
    login(username: string, password: string) -> Result<SessionProxy, PortalError>
}

unchecked enum PortalError : uint16 {
    Busy
    NotAuthorized
    UnknownUser
}
```

## Structs

```slice
module Example

// A regular struct can have both required and tagged fields.
struct Contact {
    name: string
    phoneNumber: string
    email: string? // a required field can have an optional type
}

// Tagged fields can be added later on without breaking on-the-wire compatibility.
struct Contact {
    name: string
    phoneNumber: string
    email: string?
    tag(1) lastSeen: string? // the type of a tagged field must be optional
}

// A compact struct has only required fields.
compact struct Point { x: int32, y: int32 }
```

## Sequences and dictionaries

```slice
module Example

interface Dns {
    resolveName(name: string) -> Sequence<IPAddress>
}

interface Census {
    getCityPopulation(state: string) -> Dictionary<string, int32>
}
```

## Custom and well-known types

```slice
module Example

// You can define your own custom types:
[cs::type("System.Decimal")]
custom Money

// And you can use built-in custom types defined in module WellKnownTypes:
struct CustomBag {
    amount: Money
    uri: WellKnownTypes::Uri
    duration: WellKnownTypes::Duration
    timeStamp: WellKnownTypes::TimeStamp
}
```

## Attributes

```slice
[cs::identifier("AttributeExample")]
module Example

[cs::identifier("WorldAtlas")]
interface Atlas {
    getMainCities(country: string) -> [cs::type("HashSet<string>")] Sequence<string>
}

[cs::readonly]
compact struct Point { x: int32, y: int32 }
```

## Doc comments

```slice
module Example

/// Represents a factory for widgets.
/// @see Widget
interface WidgetFactory {
    /// Creates a new {@link Widget}.
    /// @param name: The name of the new widget.
    /// @param color: The color of the new widget.
    /// @returns: A proxy to the new widget.
    createWidget(name: string) -> WidgetProxy

    /// Retrieves the last {@link Widget} created by this factory.
    /// @returns proxy: A proxy to the last widget.
    /// @returns timeStamp: The creation time stamp.
    getLastWidget() -> (proxy: WidgetProxy, timeStamp: WellKnownTypes::TimeStamp)
}

/// Represents a proxy to a Widget service.
/// @see Widget
[cs::type("Example.WidgetProxy")]
custom WidgetProxy
```
