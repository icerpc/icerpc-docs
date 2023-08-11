---
title: Primitive types
description: Learn how primitive types are encoded with Slice.
---

{% slice1 %}
## AnyClass

`AnyClass` is an abstract type. When you encode or decode a parameter or field with type `AnyClass`, you are encoding
or decoding a concrete class instance using the [class encoding/decoding rules](../constructed-types#class).
{% /slice1 %}

## Bool

A `bool` is encoded on a single byte, where 0 means `false` and 1 means `true`. Other values are invalid.

{% slice2 %}
## Fixed-size integral types

| Type          | Encoded on N bytes |
| ------------- | ------------------ |
| int8, uint8   | 1                  |
| int16, uint16 | 2                  |
| int32, uint32 | 4                  |
| int64, uint64 | 8                  |

The encoding of all signed integers uses [two's complement][two-complement], the
standard representation for signed integers.
{% /slice2 %}

## Floating-point types

A `float32` or `float64` is encoded on 4 resp. 8 bytes using the binary32 resp. binary64 formats specified by
[IEEE 754][IEEE_754].

{% slice1 %}
## Integral types

| Type  | Encoded on N bytes |
| ----- | ------------------ |
| uint8 | 1                  |
| int16 | 2                  |
| int32 | 4                  |
| int64 | 8                  |
{% /slice1 %}

## String

{% slice1 %}
A `string` is encoded using UTF-8 as a [variable-length size](encoding-only-constructs#variable-length-size) followed by
size UTF-8 bytes. These UTF-8 bytes don't include a [BOM]. For example, the string "1 μs" is usually encoded as:
```
0x05      # size 5 encoded on 1 byte
0x31      # '1'
0x20      # ' '
0xCE 0xBC # 'μ'
0x73      # 's'
```

The size is not necessarily encoded on a single byte. It can be encoded on 5 bytes. For example:
```
0xFF 0x05 0x00 0x00 0x00 # size 5 encoded on 5 bytes
```
{% /slice1 %}

{% slice2 %}
A `string` is encoded using UTF-8 as a `varuint62` size followed by size UTF-8 bytes. These UTF-8 bytes don't include a
[BOM]. For example, the string "1 μs" is usually encoded as:
```
0x14      # size 5 encoded on 1 byte
0x31      # '1'
0x20      # ' '
0xCE 0xBC # 'μ'
0x73      # 's'
```

The `varuint62` size is not necessarily encoded on a single byte. It can be encoded on 1, 2, 4 or 8 bytes. For example:
```
0x15 0x00  # size 5 encoded on 2 bytes
```
{% /slice2 %}

{% callout type="information" %}
The size represents the number of UTF-8 bytes in the encoded representation of the string, not the number of characters
in this string.
{% /callout %}

{% slice2 %}
## Variable-size integral types

A `varint32`, `varuint32`, `varint62`, `varuint62` is encoded on 1, 2, 4 or 8 bytes. The least significant 2 bits of the
first byte encode the number of bytes used to encode the full value.

| First 2 bits | Number of bytes |
| ------------ | --------------- |
| 0            | 1               |
| 1            | 2               |
| 2            | 4               |
| 3            | 8               |

The encoding for `varuint32` and `varuint62` is identical. The value is logically multiplied by 4, or'ed with the value
of the first two bits and then stored in the selected number of bytes.

Likewise, the encoding for `varint32` and `varint62` is identical. The value is logically multiplied by 4, or'ed with
the value of the first two bits and then stored in the selected number of bytes.

The value of the first 2 bits indirectly determines the min and max encodable values:

| First 2 bits | Min varint | Max varint | Min varuint | Max varuint |
| ------------ | ---------- | ---------- | ----------- | ----------- |
| 0            | -2^5       | 2^5 - 1    | 0           | 2^6 - 1     |
| 1            | -2^13      | 2^13 - 1   | 0           | 2^14 - 1    |
| 2            | -2^29      | 2^29 - 1   | 0           | 2^30 - 1    |
| 3            | -2^61      | 2^61 - 1   | 0           | 2^62 - 1    |

In general, a Slice encoder should encode a value on as few bytes as possible. It's however ok for a Slice encoder to
encode a value on more bytes than required, and a Slice decoder must always decode such a value properly. For example,
`7` is usually encoded on a single byte but can also be encoded on 2, 4 or 8 bytes.

{% callout type="information" %}
The encoding of varuint62 is identical to the encoding of variable-length integers in QUIC, except for the byte order
(QUIC is big-endian, Slice is little-endian).
{% /callout %}

{% /slice2 %}

[IEEE_754]: https://en.wikipedia.org/wiki/IEEE_754
[two-complement]: https://en.wikipedia.org/wiki/Two%27s_complement
[BOM]: https://en.wikipedia.org/wiki/Byte_order_mark