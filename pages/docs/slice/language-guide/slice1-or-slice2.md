---
title: Slice1 or Slice2
description: Understand the differences between Slice1 and Slice2.
---

## Encoding statement

A Slice file has always an associated encoding--either Slice1 or Slice2.

You can specify this encoding with an encoding statement at the top of the file. For example:
```slice
// Copyright (c) ACME Corp.

encoding = Slice1
```

A Slice file without an encoding statement uses the default encoding, Slice2.

Use Slice1 if you need interoperability with Ice applications; otherwise, keep the default, Slice2.

## Encoding compatibility

The encoding for operation arguments and return values is not the same with Slice1 and Slice2; as a result, an encoding
mismatch between your client and server will result in a decoding failure. For example, the following operations are not
compatible:

{% side-by-side alignment="top" %}
```slice
encoding = Slice1

module Example

interface Widget {
    spin(speed: int32)
}
```

```slice
// default encoding is Slice2

module Example

interface Widget {
    // Not compatible with the Slice1 spin operation.
    spin(speed: int32)
}
```
{% /side-by-side %}

## Using Slice1 types from Slice2

It is always an error to reference a type defined in an encoding = Slice2 file from an encoding = Slice1 file.

On the other hand, you can reference a type defined in an encoding = Slice1 file from an encoding = Slice2 file provided
this type can be encoded with Slice2. For example:

```slice
encoding = Slice1

module Example

// Can be encoded with both Slice1 and Slice2.
compat struct Point { x: int32, y: int32 }

// Can be encoded with both Slice1 and Slice2.
enum Fruit { Apple, Orange, Strawberry }

// Can be encoded with Slice1 but not Slice2.
class Vehicle {
    hasEngine: bool
}

// Can be encoded with Slice1 but not Slice2.
compat struct VehicleCarrier {
    vehicle: Vehicle?
}
```

## C# Language mapping

The encoding statement is not mapped to any C# code.
