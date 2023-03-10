---
title: Collection types
description: Learn how to encode sequences and dictionaries with Slice.
---

## Dictionary

A dictionary with N entries is encoded like a [sequence](#sequence) with N elements where the element type is a
[compact struct](constructed-types-slice2#struct):

```slice
compact struct Pair { key: Key, value: Value }
```

`Key` represents the dictionary's key type and `Value` the dictionary's value type. `Value` may be an optional type
such as a `string?`.

## Sequence with a non-optional element type

A sequence of N elements with a non-optional element type T is encoded as a varuint62-encoded N followed by each element
encoded in order.

_Example: empty sequence_

An empty sequence is encoded as:

```
0x00: size = 0
```

_Example: sequence of int32_

A sequence of `int32` with values 5, 32 and 2 is encoded as:

```
0x0c:                3 elements (varuint62 on 1 byte)
0x05 0x00 0x00 0x00: 5 over 4 bytes in little-endian order
0x20 0x00 0x00 0x00: 32 over 4 bytes in little-endian order
0x02 0x00 0x00 0x00: 2 over 4 bytes in little-endian order
```

## Sequence with an optional element type

A sequence of N elements with a optional element type T? is encoded as a varuint62-encoded N followed by a
[bit sequence](bit-sequence) with N bits, followed by each element with a value encoded in order.

_Example: sequence of int32?_

A sequence of `int32?` with values 5, no-value, 2 and no-value is encoded as:

```
0x10:                4 elements (varuint62 on 1 byte)
0b00000101:          bit sequence with positions 0 and 2 set
0x05 0x00 0x00 0x00: 5 over 4 bytes in little-endian order
0x02 0x00 0x00 0x00: 2 over 4 bytes in little-endian order
```
