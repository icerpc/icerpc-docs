---
title: Encoding-only constructs
description: Learn about helper constructs used to encode other constructs.
---

{% slice1 %}
## Variable-length size

A variable-length size is a non-negative integer encoded on 1 or 5 bytes. Its range is 0 to 2^31 - 1 inclusive. As its
name suggests, it is often used to represent a size.

A value between 0 and 254 can be encoded on 1 byte or 5 bytes. A value between 255 and 2^31 - 1 is always encoded using
5 bytes.

When encoding a value on a single byte, the byte holds the value as-is. With the 5-byte encoding, the first byte is set
to 255 and the remaining 4 bytes hold the value encoded as an [int32].

In general, a Slice encoder should encode a value on a single byte when this value is 254 or less. It's however ok for
a Slice encoder to encode a small value on 5 bytes; a Slice decoder must decode such a value properly. For example, `7`
is usually encoded on a single byte but can also be encoded on 5 bytes.
{% /slice1 %}

{% slice2 %}

## Bit sequence

A bit sequence represents N bits, where N is a known number.

These N bits are stored in (N / 8) bytes when N is a multiple of 8; otherwise, a bit sequence uses (N / 8) + 1 bytes.
The bits of the first byte correspond to positions 0 to 7 in the bit sequence, the bits of the second byte correspond to
positions 8 to 15 etc., until position N - 1. The remaining bits, if any, must be unset.

Bit sequences are used to encode fields, sequences, and other lists with optional types in a space-optimized fashion.

Each position in the bit sequence encodes whether or not the element in the list has a value or no value. When the bit
at position P is set in the bit sequence, the element at position P has a value; when the bit is unset, the element at
position P has no value.

When encoding a struct, the leading bit sequence is not used for non-optional types. For example:

```slice
compact struct Contact {
    id: string
    age: uint8?
    name: string
    email: string?
    country: string
}
```

Position 0 in the bit sequence corresponds to the age field, and position 1 corresponds to the email field. All the
other positions in the bit sequence associated with `Contact` are unused and must be unset.

## Segment

A segment is a `varuint62` size followed by size bytes, just like a `Sequence<uint8>`. The bytes that follow the size
are called the body of the segment.

{% /slice2 %}

[int32]: primitive-types#integral-types
