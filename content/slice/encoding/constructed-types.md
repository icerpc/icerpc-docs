---
title: Constructed types
description: Learn how to encode constructed types with Slice.
---

{% slice1 %}
Slice provides two built-in generic types: `Dictionary<Key, Value>` and `Sequence<T>`. You need to specify the type
argument(s) of such a generic type in order to get an actual type - a constructed type. This page describes the encoding
of such constructed types.
{% /slice1 %}

{% slice2 %}
Slice provides three built-in generic types: `Dictionary<Key, Value>`, `Result<Success, Failure>`, and `Sequence<T>`.
You need to specify the type argument(s) of such a generic type in order to get an actual type - a constructed type.
This page describes the encoding of such constructed types.
{% /slice2 %}

## Dictionary

A dictionary with N entries is encoded like a sequence with N elements where the element type is a
[compact struct](user-defined-types#struct):

```slice
compact struct Pair { key: Key, value: Value }
```

`Key` represents the dictionary's key type and `Value` represents the dictionary's value type.

{% slice2 %}

## Result

A `Result<Success, Failure>` is encoded exactly like a compact enum with two enumerators (`Success` and `Failure`),
where each enumerator has a single field of the respective type (Success or Failure).

For example, a `Result<string, int32>` is encoded like a:

```slice
compact enum StringInt32Result {
    Success(value: string)
    Failure(value: int32)
}
```

{% /slice2 %}

{% slice1 %}

## Sequence

A sequence of N elements of type T is encoded as a [variable-length size][slice1-var-size] N followed by each element
encoded in order.

### Example: empty sequence

An empty sequence is encoded as:

```
0x00: size 0
```

### Example: sequence of int32

A sequence of `int32` with values 5, 32 and 9 is encoded as:

```
0x03:                3 elements (variable-length size on 1 byte)
0x05 0x00 0x00 0x00: 5 over 4 bytes in little-endian order
0x20 0x00 0x00 0x00: 32 over 4 bytes in little-endian order
0x09 0x00 0x00 0x00: 9 over 4 bytes in little-endian order
```

{% /slice1 %}

{% slice2 %}

## Sequence with a non-optional element type

A sequence of N elements with a non-optional element type T is encoded as a `varuint62`-encoded N followed by each
element encoded in order.

### Example: empty sequence

An empty sequence is encoded as:

```
0x00: size 0
```

### Example: sequence of int32

A sequence of `int32` with values 5, 32 and 9 is encoded as:

```
0x0C:                3 elements (varuint62 on 1 byte)
0x05 0x00 0x00 0x00: 5 over 4 bytes in little-endian order
0x20 0x00 0x00 0x00: 32 over 4 bytes in little-endian order
0x09 0x00 0x00 0x00: 9 over 4 bytes in little-endian order
```

## Sequence with an optional element type

A sequence of N elements with a optional element type T? is encoded as a varuint62-encoded N followed by a
[bit sequence][bit-sequence] with N bits, followed by each element with a value encoded in order.

### Example: sequence of int32?

A sequence of `int32?` with values 5, no-value, 9 and no-value is encoded as:

```
0x10:                4 elements (varuint62 on 1 byte)
0b00000101:          bit sequence with positions 0 and 2 set
0x05 0x00 0x00 0x00: 5 over 4 bytes in little-endian order
0x09 0x00 0x00 0x00: 9 over 4 bytes in little-endian order
```

{% /slice2 %}

[bit-sequence]: encoding-only-constructs#bit-sequence
[slice1-var-size]: encoding-only-constructs#variable-length-size
