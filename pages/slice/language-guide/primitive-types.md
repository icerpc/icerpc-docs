---
title: Primitive types
description: Learn about Slice primitive types.
---

{% slice1 %}

## AnyClass

A field or parameter with Slice type `AnyClass` can hold an instance of any Slice class. `AnyClass` is the implicit
abstract base of all Slice [classes](class-types).

| Slice    | C# mapping              |
| ---------|-------------------------|
| AnyClass | ZeroC.Slice.SliceClass |

{% /slice1 %}

## Bool

Slice provides a boolean type, `bool`. It can have two values: true (1) or false (0).

| Slice | C# mapping |
| ------|------------|
| bool  | bool       |

{% slice2 %}

## Fixed-size integral types

Slice provides 8 fixed-size integral types. Types that start with a `u` are unsigned.

| Slice     | Range                                                             | C# mapping |
|-----------|-------------------------------------------------------------------|------------|
| int8      | -128 to 127                                                       | sbyte      |
| uint8     | 0 to 255                                                          | byte       |
| int16     | -32,768 to 32,767                                                 | short      |
| uint16    | 0 to 65,535                                                       | ushort     |
| int32     | -2,147,483,648 to 2,147,483,647                                   | int        |
| uint32     | 0 to 4,294,967,295                                               | uint       |
| int64     | -9,223,372,036,854,775,808 to 9,223,372,036,854,775,807           | long       |
| uint64    | 0 to 18,446,744,073,709,551,615                                   | ulong      |
{% /slice2 %}

## Floating-point types

Slice provides 2 floating-point types: a single precision type, `float32`, and a double-precision type, `float64`.

| Slice    | C# mapping |
| ---------|------------|
| float32  | float      |
| float64  | double     |

{% slice1 %}

## Integral types

Slice provides 4 integral types.

| Slice     | Range                                                             | C# mapping |
|-----------|-------------------------------------------------------------------|------------|
| uint8     | 0 to 255                                                          | byte       |
| int16     | -32,768 to 32,767                                                 | short      |
| int32     | -2,147,483,648 to 2,147,483,647                                   | int        |
| int64     | -9,223,372,036,854,775,808 to 9,223,372,036,854,775,807           | long       |
{% /slice1 %}

## String

Slice provides a string type, `string`. A string is a sequence of characters that can be encoded using [UTF-8].

| Slice    | C# mapping |
| ---------|------------|
| string   | string     |

{% slice2 %}

## Variable-size integral types

Slice provides 4 variable-size integral types. Types that start with a `varu` are unsigned.

| Slice     | Range                                                             | C# mapping |
|-----------|-------------------------------------------------------------------|------------|
| varint32  | -2,147,483,648 to 2,147,483,647                                   | int        |
| varuint32 | 0 to 4,294,967,295                                                | uint       |
| varint62  | -2,305,843,009,213,693,952 to 2,305,843,009,213,693,951           | long       |
| varuint62 | 0 to 4,611,686,018,427,387,903                                    | ulong      |

"variable-size" and "fixed-size" is in reference to the Slice encoding for these types: a fixed size integral type is
always encoded on the same number of bytes (for example, an int32 is always encoded on 4 bytes), whereas a variable-size
integral type is encoded on 1, 2, 4 or 8 bytes.

You would select a variable-size type over its fixed-size equivalent to save bandwidth when you need a "large" type
even though the values you send are usually small. If saving bandwidth is not a concern, prefer fixed-size types.

The integer value determines the minimum number of bytes required in the encoded representation:

| Slice          | Value                                                   | Minimum number of bytes |
|----------------|---------------------------------------------------------|-------------------------|
| varint{32,62}  | -32 to 31                                               | 1                       |
| varuint{32,62} | 0 to 63                                                 | 1                       |
| varint{32,62}  | -8,192 to -33 or 32 to 8,191                            | 2                       |
| varuint{32,62} | 64 to 16,383                                            | 2                       |
| varint{32,62}  | -536,870,912 to -8,193 or 8,192 to 536,870,911          | 4                       |
| varuint{32,62} | 16,384 to 1,073,741,823                                 | 4                       |

Any other value is encoded using 8 bytes.
{% /slice2 %}

[UTF-8]: https://en.wikipedia.org/wiki/UTF-8
