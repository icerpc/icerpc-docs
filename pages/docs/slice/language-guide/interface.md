---
title: Interface
description: Learn how to define interfaces in Slice.
---

## Interface basics

The ultimate goal of the Slice language is to define interfaces. All other Slice constructs and statements merely
support the definition of interfaces.

An interface specifies an abstraction. This abstraction is implemented by an IceRPC service, and is called by the
clients of this service.

An interface holds [operations](operation). For example:

```slice {% addEncoding=true %}
module GreeterExample

// An interface with a single operation; it does not extend any other interface.
interface Greeter {
    greet(name: string) -> string
}
```

This interface represents the contract between the clients (callers) and the service that implements this interface.

## Empty interface

An empty "marker" interface with no operation is valid, but rarely useful.

```slice {% addEncoding=true %}
module Example

interface Empty {} // syntactically correct but probably not necessary
```

## Interface inheritance

An interface can inherit from one or more interfaces, provided the operation names of all interfaces are unique.

For example:

```slice {% addEncoding=true %}
module Example

interface Shape {
    rotate(degrees: int16)
}

interface Fillable {
    idempotent setFillColor(newColor: Color)
}

interface Rectangle : Shape, Fillable {
    idempotent resize(x: int32, y: int32)
}
```

## C# mapping

TBD
