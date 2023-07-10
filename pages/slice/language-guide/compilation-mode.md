---
title: Compilation mode
description: Understand when to use Slice1 or Slice2.
---

## Slice1 or Slice2

Slice supports two compilation modes: Slice1 and Slice2. Slice2 is the default mode, recommended for most applications.
Slice1 provides interoperability with [Ice][ice] applications and must be enabled explicitly.

Each Slice file has an associated compilation mode specified with the `mode` statement. This statement can only appear
once per file, and must come before any other statement. For example:

```slice
// Copyright (c) ACME Corp.

mode = Slice1

module Warehouse
```

A file without a `mode` statement uses the default mode: Slice2.

The compilation mode of a Slice file determines the types and features you can use in that particular file. For example,
you can define a `class` type in a Slice1 file (a Slice file with `mode = Slice1`), but not in a Slice2 file (a Slice
file with `mode = Slice2`). Conversely, you can define an operation with a `stream` parameter in a Slice2 file but not
in a Slice1 file.

{% callout %}
As you would expect, the Slice1 feature set is largely equivalent to the feature set of the IDL provided by Ice (the
[original Slice][original-slice] language).
{% /callout %}

Since you typically use a single compilation mode at a time, this documentation is split between Slice1 and Slice2. When
you select Slice2, you don't see Slice1-specific features, and vice-versa.

## Mode and client-server contract

The mode is part of the contract between a client and a server: if you change the mode, you break the contract.

For example, the following operations are not compatible even though they are identical except for the compilation mode.

{% side-by-side alignment="top" %}
```slice
mode = Slice1

module Example

interface Widget {
    spin(speed: int32)
}
```

```slice
// default mode is Slice2

module Example

interface Widget {
    spin(speed: int32)
}
```
{% /side-by-side %}

Each compilation mode corresponds to a specific [encoding][encoding] for operation arguments. As a result, a call to
`spin` from a client using the Slice2 file will fail if the remote service is implemented with the Slice1 file.

## Using Slice1 and Slice2 together

It is possible but uncommon to use Slice files with both modes in the same application.

If you are in this situation, you need to observe the following rules:
 - a Slice2 file can use a type defined in Slice1 file provided this type is Slice2-compatible (see below)
 - an interface defined in a Slice2 file can derive from an interface defined in a Slice1 file
 - a Slice1 file cannot use a type, an interface or any other construct defined in a Slice2 file

A type defined in a Slice1 file is Slice2-compatible if it's an [enum type][enum-type], a [proxy type][proxy-type], or
if this type could be defined as-is in a Slice2 file. For example:

```slice
mode = Slice1

module Example

// Slice2-compatible: an enum is always Slice2-compatible.
enum Fruit { Apple, Orange }

// Slice2-compatible: `Point` could be defined as-is in a Slice2 file.
compat struct Point { x: int32, y: int32 }

// Slice2-incompatible: a class cannot be defined in a Slice2 file.
class Vehicle {
    hasEngine: bool
}

// Slice2-incompatible: `VehicleCarrier` references a Slice1-only type (`Vehicle`)
compat struct VehicleCarrier {
    vehicle: Vehicle?
}
```

## C# mapping

The mode statement is not mapped to anything in C#. It does however influence the C# mapping of most other Slice
definitions.

[encoding]: ../encoding
[enum-type]: enum-types
[ice]: https://github.com/zeroc-ice/ice
[original-slice]: https://doc.zeroc.com/ice/3.7/the-slice-language
[proxy-type]: proxy-types
