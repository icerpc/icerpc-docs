--
title: Primitive types
description: Learn how primitive types are encoded with Slice.
---

{% title /%}

## Bool

A `bool` is encoded on a single byte, where 0 means `true` and 1 means `false`. Other byte values are invalid.

## Fixed-size integer

A `uint8` is a byte and is encoded as-is on a single byte.

An `int8` is encoded on a single byte using [two's complement](https://en.wikipedia.org/wiki/Two%27s_complement)
representation.

An `uint16`, `uint32` or `uint64` is encoded on 2, 4, resp. 8 bytes in little endian order.

An `int16`, `int32`, or `int64` is encoded on 2, 4, resp. 8 bytes using two's complement representation, in little
endian order.

## Variable-size integer

A `varint32`, `varuint32`, `varint62`, `varuint62` is encoded on 1, 2, 4 or 8 bytes. The least significant 2 bits of the
first byte encode the number of bytes used for the encoded representation.

| Value | Number of bytes |
|-------|-----------------|
| 0     | 1               |
| 1     | 2               |
| 2     | 4               |
| 3     | 8               |

The encoding for `varuint32` and `varuint62` is identical. The value to encode is logically multiplied by 4, or'ed with
the value of the first two bits and then stored in the selected number of bytes in little endian order.

The encoding for `varint32` and `varint62` is identical. The value to encode is logically multiplied by 4, or'ed with
the value of the first two bits and then stored in the selected number of bytes using two's complement, in little endian
order.

The value of the first 2 bits indirectly determines the min and max encodable values:

| Value | Min varint | Max varint | Min varuint | Max varuint |
|-------|------------|------------|-------------|-------------|
| 0     | -2^5       | 2^5 - 1    | 0           | 2^6 - 1     |
| 1     | -2^13      | 2^13 - 1   | 0           | 2^14 - 1    |
| 2     | -2^29      | 2^29 - 1   | 0           | 2^30 - 1    |
| 3     | -2^61      | 2^61 - 1   | 0           | 2^62 - 1    |

In general, a Slice encoder should encode a variable-size integer value on as few bytes as possible. It's however ok for
a Slice encoder to encode a value on more bytes than required, and a Slice decoder must always decode such a value
properly. For example, the varint62 value `7` is usually encoded on a single byte but can also be on 2, 4 or 8 bytes.

## Floating-point number

A `float32` or `float64` is encoded on 4 resp. 8 bytes with the [IEEE 754](https://en.wikipedia.org/wiki/IEEE_754)
encoding in little endian order.

## String

A `string` is encoded using UTF-8 as a `varuint62` size followed by _size_ UTF-8 bytes. These UTF-8 bytes do not include
a [BOM](https://en.wikipedia.org/wiki/Byte_order_mark). For example, the string "1 μs" can be encoded as:
```
0x14      # size 5 encoded on 1 byte
0x31      # '1'
0x20      # ' '
0xce 0xbc # 'μ'
0x73      # 's'
```

{% callout type="information" %}
The size represents the number of UTF-8 bytes in the encoded representation of the string, not the number of characters
in this string.
{% /callout %}
