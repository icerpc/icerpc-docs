---
title: Slice1 or Slice2
description: Understand the differences between Slice1 and Slice2.
---

## Encoding statement

A Slice file has always an associated encoding, which can be either Slice1 or Slice2.

This encoding determines the on the wire binary representation of your data. It also determines which syntax you can use
in this file. For example, a `class` can only appear in a Slice1 file, while a `varint32` can only appear in a Slice2
file.

The encoding of a Slice file can be specified with an encoding statement. This statement (if present) must be the first
statement in the file. For example:

```slice
// Copyright (c) ACME Corp.

encoding = Slice1
```

If your Slice file has no encoding statement, it uses the default encoding, Slice2.

You should use Slice1 if you need interoperability with Ice applications; otherwise, keep the default, Slice2.

## Encoding compatibility

The encoding for operation arguments and return values is not the same with Slice1 and Slice2; as a result, an encoding
mismatch between your client and server will result in a decoding failure. For example, the following operations are not
compatible even though they look almost identical:

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

It is always an error to reference a type defined in a file using the Slice2 encoding from a file using the Slice1
encoding.

On the other hand, you can reference a type defined in a file using the Slice1 encoding from a file using the Slice2
encoding provided this type can be encoded with Slice2. For example:

```slice
encoding = Slice1

module Example

// Can be encoded with both Slice1 and Slice2.
compat struct Point { x: int32, y: int32 }

// Can be encoded with Slice1 but not Slice2.
class Vehicle {
    hasEngine: bool
}

// Can be encoded with Slice1 but not Slice2.
compat struct VehicleCarrier {
    vehicle: Vehicle?
}
```

## C# mapping

The encoding statement is not mapped to anything in C#. It does however influence the C# mapping of most other Slice
definitions.
