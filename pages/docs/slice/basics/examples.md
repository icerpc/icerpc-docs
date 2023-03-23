---
title: Examples
description: Discover the Slice syntax through a few examples.
---

This page offers a quick overview of the Slice syntax through examples.

## Operations

```slice
module Example

interface MyOperations {
    // no parameter, no return value
    opVoid()

    // a single parameter, no return value
    opParam(message: string)

    // a single parameter and single return value with an optional type
    opParamReturn(message: string) -> int32?

    // two parameters and a return tuple
    opParamsReturns(message: string, count: int32) -> (value: float32, list: sequence<int32>)

    // a regular parameter and a stream parameter
    sendFile(name: string, contents: stream uint8)

    // a stream return value
    receiveTextFile(name: string) -> stream string

    // a return tuple with a stream
    receiveNextFile() -> (name: string, contents: stream uint8)

    // a oneway operation
    [oneway] opOneway(message: string)

    // an idempotent operation
    idempotent opIdempotent(message: string) -> int32
}
```

## Enums

```slice
module Example

// A checked enum (without "unchecked") is restricted to its enumerators.
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
    tag(1) lastSeen: WellknownTypes::TimeStamp? // the type of a tagged field must be optional
}

// A compact struct has only required fields.
compact struct Point { x: int32, y: int32 }
```

## Collections

```slice
module Example

interface DNS {
    resolveName(name: string) -> sequence<IpAddress>
}

interface Census {
    getCityPopulation(state: string) -> dictionary<string, uint32>
}
```

## Custom

```slice
module Example

// You can define your own custom types:
[cs::custom("System.Decimal")]
custom Money

// And you can use built-in custom types from module WellKnownTypes:
struct CustomBag {
    amount: Money
    uri: WellKnownTypes::Uri
    duration: WellKnownTypes::Duration
    timeStamp: WellKnownTypes::TimeStamp
}
```

## Exceptions

```slice
module Example

// An exception is just like a struct.
exception WidgetException {
    error: WidgetError
    tag(1) retryAfter: WellknownTypes::Duration?
}

interface WidgetFactory {
    // Unlike a struct, an exception can be thrown.
    createWidget(name: string) -> Widget throws WidgetException
}
```

## Interfaces

```slice
module Example

interface Widget {
    spin(count: int32)
}

interface WidgetFactory {
    // Returns a Widget proxy.
    createWidget(name: string) -> Widget
}

// an interface can extend one or more other interfaces
interface Gizmo : Widget {
    walk(direction: Direction)
}
```

## Attributes

```slice
[cs::namespace("AttributeExample")]
module Example

enum Transport {
    // Use the preferred C# spelling
    [cs::identifier("Tcp")]
    TCP

    [cs::identifier("Udp")]
    UDP
}

interface Atlas {
    getMainCities(country: string) -> [cs::generic("HashSet")] sequence<string>
}

[cs::readonly] compact struct Point { x: int32, y: in32 }
```

## Doc comments

```slice
module Example

/// Represents a factory for widgets.
interface WidgetFactory {
    /// Creates a new @link Widget.
    /// @param name: The name of the new widget.
    /// @param color: The color of the new widget.
    /// @returns: A proxy to the new widget.
    /// @throws WidgetException: Thrown if the factory could not create the widget.
    createWidget(name: string) -> Widget throws WidgetException

    /// Retrieves the last @link Widget created by this factory.
    /// @returns proxy: A proxy to the last widget.
    /// @returns timeStamp: The creation time stamp.
    /// @throws WidgetException: Thrown if the factory has not created any widget yet.
    getLastWidget() -> (proxy: Widget, timeStamp: TimeStamp) throws WidgetException
}
```
