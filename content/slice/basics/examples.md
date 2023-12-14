---
title: Examples
description: Discover the Slice syntax through a few examples.
---

This page offers a quick overview of the Slice syntax through examples.

## Interfaces

```slice {% addMode=true %}
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

{% slice1 %}

```slice {% addMode=true %}
module Example

interface MyOperations {
    // no operation parameter, no return parameter
    opVoid()

    // a single operation parameter, no return parameter
    opParam(message: string)

    // a single operation parameter and single return parameter with an optional type
    opParamReturn(message: string) -> int32?

    // two operation parameters and two return parameters
    opParamsReturns(message: string, count: int32) -> (value: float32, list: Sequence<int32>)

    // an operation with tagged operation parameters and tagged return parameters
    opTagged(message: string, tag(1) from: string?) -> (value: float32, tag(1) list: Sequence<int32>?)

    // a one-way operation
    [oneway] opOneway(message: string)

    // an idempotent operation
    idempotent opIdempotent(message: string) -> int32
}
```

{% /slice1 %}

{% slice2 %}

```slice
module Example

interface MyOperations {
    // no operation parameter, no return parameter
    opVoid()

    // a single operation parameter, no return parameter
    opParam(message: string)

    // a single operation parameter and single return parameter with an optional type
    opParamReturn(message: string) -> int32?

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

{% /slice2 %}

## Enums

{% slice1 %}

```slice {% addMode=true %}
module Example

// A checked enum is restricted to its enumerators.
enum Fruit {
    Apple
    Strawberry
    Pineapple
}

// An unchecked enum can hold any positive int32 value .
unchecked enum Permissions {
    Execute = 0
    Read = 1
    Write = 2
    Delete = 4
}
```

{% /slice1 %}

{% slice2 %}

```slice
module Example

// A checked enum is restricted to its enumerators.
enum Fruit : uint8 {
    Apple
    Strawberry
    Pineapple
}

// An unchecked enum can hold any value in its underlying type.
unchecked enum Permissions : uint8 {
    Execute = 0
    Read = 1
    Write = 2
    Delete = 4
}

// An enum without an underlying type is a discriminated union;
// its enumerators may have fields
enum Shape {
    Circle(radius: uint32, tag(1) color: Color?)
    Rectangle(width: uint32, length: uint32)
    Dot
}

// A compact enum cannot have tagged fields
compact enum LaunchResult {
    Success(speed: int32, elapsed: WellKnownTypes::Duration)
    Failure(message: string)
}
```

{% /slice2 %}

## Structs

{% slice1 %}

```slice {% addMode=true %}
module Example

// A compact struct cannot have tagged fields.
compact struct Point { x: int32, y: int32 }
```

{% /slice1 %}

{% slice2 %}

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

{% /slice2 %}

{% slice1 %}

## Classes

```slice {% addMode=true %}
module Example

// A class have both required and tagged fields.
class Contact {
    name: string
    phoneNumber: string
}

// Tagged fields can be added later on without breaking on-the-wire compatibility.
class Contact {
    name: string
    phoneNumber: string
    tag(1) lastSeen: WellknownTypes::TimeStamp? // the type of a tagged field must be optional
}

// Classes support single inheritance
class BusinessContact : Contact {
    company: Company
    tag(1) sendNewsletter: bool? // the scope of a tag is a class slice.
}
```

{% /slice1 %}

{% slice1 %}

## Exceptions

```slice {% addMode=true %}
module Example

// An exception is like a class.
exception WidgetException {
    error: WidgetError
    tag(1) retryAfter: int32?
}

interface WidgetFactory {
    // Unlike a class, an exception can be thrown but can't be used as the type of a field.
    createWidget(name: string) -> Widget throws WidgetException
}
```

{% /slice1 %}

## Sequences and dictionaries

```slice {% addMode=true %}
module Example

interface Dns {
    resolveName(name: string) -> Sequence<IPAddress>
}

interface Census {
    getCityPopulation(state: string) -> Dictionary<string, int32>
}
```

## Custom and well-known types

{% slice1 %}

```slice {% addMode=true %}
module Example

// You can define your own custom types:
[cs::type("System.Decimal")]
custom Money

// You can use the built-in custom type ServiceAddress defined in module IceRpc:
compact struct CustomBag {
    amount: Money
    serviceAddress: IceRpc::ServiceAddress
}
```

{% /slice1 %}

{% slice2 %}

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

{% /slice2 %}

## Attributes

```slice {% addMode=true %}
[cs::namespace("AttributeExample")]
module Example

[cs::identifier("WorldAtlas")]
interface Atlas {
    getMainCities(country: string) -> [cs::type("HashSet<string>")] Sequence<string>
}

[cs::readonly]
compact struct Point { x: int32, y: int32 }
```

## Doc comments

{% slice1 %}

```slice  {% addMode=true %}
module Example

/// Represents a factory for widgets.
/// @see Widget
interface WidgetFactory {
    /// Creates a new {@link Widget}.
    /// @param name: The name of the new widget.
    /// @param color: The color of the new widget.
    /// @returns: A proxy to the new widget.
    /// @throws WidgetException: Thrown if the factory could not create the widget.
    /// @throws InvalidNameException: Thrown if the provided name was invalid.
    createWidget(name: string) -> WidgetProxy throws (WidgetException, InvalidNameException)

    /// Retrieves the last {@link Widget} created by this factory.
    /// @returns proxy: A proxy to the last widget.
    /// @returns timeStamp: The creation time stamp.
    /// @throws WidgetException: Thrown if the factory has not created any widget yet.
    /// @throws DerivedFromWidgetException: It's okay to document derived exceptions.
    getLastWidget() -> (proxy: WidgetProxy, timeStamp: TimeStamp) throws WidgetException
}

/// Represents a proxy to a Widget service.
/// @see Widget
[cs::type("Example.WidgetProxy")]
custom WidgetProxy
```

{% /slice1 %}

{% slice2 %}

```slice
module Example

/// Represents a factory for widgets.
/// @see Widget
interface WidgetFactory {
    /// Creates a new {@link Widget}.
    /// @param name: The name of the new widget.
    /// @param color: The color of the new widget.
    /// @returns: A proxy to the new widget.
    createWidget(name: string) -> Widget

    /// Retrieves the last {@link Widget} created by this factory.
    /// @returns proxy: A proxy to the last widget.
    /// @returns timeStamp: The creation time stamp.
    getLastWidget() -> (proxy: Widget, timeStamp: WellKnownTypes::TimeStamp)
}
```

{% /slice2 %}
