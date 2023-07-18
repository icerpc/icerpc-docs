---
title: Encoding-only constructs
description: Learn about helper constructs used to encode other constructs.
---

{% slice1 %}

## Tag record

A tag record represents the encoding of a tagged field. The goal of the tag record encoding is to allow a Slice decoder
that doesn't know a tag number to skip the encoded bytes and keep decoding.

The encoding of a tag record depends on its tag number. When the tag number is less than 30, a tag record is encoded as:

- a byte, with the tag type in the lowest 3 bits of this byte, and the tag number in the remaining 5 bits
- the tagged value; its encoding depends on the tag type (see below)

When the tag number is 30 or greater, a tag record is encoded as:

- a byte, with the tag type in the lowest 3 bits of this byte, and 30 (0x1E) encoded in the remaining 5 bits
- the tag number encoded as a [variable-length size](#variable-length-size)
- the tagged value; its encoding depends on the tag type (see below)

A leading byte with value 0xFF is reserved as the "tag end marker". The tag end marker is used to mark the end of a
slice within a class or exception.

The tag type is encoded on 3 bits and depends on the type of the tagged element, and determines how the tagged value is
encoded.

| Tag type name | Tag type value | Tagged value encoding                                                     | Applies to                                                                             |
| ------------- | -------------- | ------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------|
| F1            | 0              | The value is encoded on 1 byte.                                           | bool, uint8                                                                            |
| F2            | 1              | The value is encoded on 2 bytes.                                          | int16                                                                                  |
| F4            | 2              | The value is encoded on 4 bytes.                                          | float32, int32                                                                         |
| F8            | 3              | The value is encoded on 8 bytes.                                          | float64, int64                                                                         |
| Size          | 4              | The value is encoded as a variable-length size.                           | enum                                                                                   |
| VSize         | 5              | A variable-length size followed by the value encoded on size bytes.       | string, fixed-size struct, sequence or dictionary with fixed-size elements             |
| FSize         | 6              | An int32 size ("fixed size") followed by the value encoded on size bytes. | variable-size struct, sequence or dictionary with variable-size elements, custom types |
| Class         | 7              | Not encoded or decoded by Slice.                                          | N/A                                                                                    |

The VSize encoding is optimized when the tagged element type is a string or a sequence with elements of size 1: in this
case, we don't encode the variable-length size as we can use the string or sequence's own variable-length size for the
same purpose (know how many bytes to skip during decoding when we don't know the tag number).

## Variable-length size

A variable-length size is a non-negative integer encoded on 1 or 5 bytes. Its range is 0 to 2^31 - 1 inclusive. As its
name suggests, it is often used to represent a size.

A value between 0 and 254 can be encoded on 1 byte or 5 bytes. A value between 255 and 2^31 - 1 is always encoded using
5 bytes.

When encoding on a single byte, the byte holds the value as-is. With the 5-byte encoding, the first byte is set to 255
and the remaining 4 bytes hold the value encoded as an int32.

In general, a Slice encoder should encode a value on a single byte when this value is 254 or less. It's however ok for
a Slice encoder to encode a small value on 5 bytes; a Slice decoder must decode such a value properly. For example, `7`
is usually encoded on a single byte but can also be encoded on 5 bytes.
{% /slice1 %}

{% slice2 %}

## Bit sequence

A bit sequence represents N bits, where N is a known number.

These N bits are stored in (N / 8) bytes when N is a multiple of 8; otherwise, a bit sequence uses (N / 8) + 1 bytes.
The bits of the first byte correspond to positions 0 to 7 in the bit sequence, the bits of the second byte correspond to
positions 8 to 15 etc., until we reach position N - 1. The remaining bits, if any, must be unset.

Bit sequences are used to encode fields, sequences and other lists with optional types in a space-optimized fashion. We
encode the "has a value / "has no value" information in a bit sequence, before the elements of the list.

Each position in the bit sequence encodes whether or not the element in the list has a value or no value. When the bit
at position P is set in the bit sequence, the element at position P has a value; when the bit is unset, the element at
position P has no value.

When we use a bit sequence to encode a struct, we ignore fields with non-optional types. For example:

```slice
compact struct Contact {
    id: string
    age: uint8?
    name: string
    email: string?
    country: string
}
```

Position 0 corresponds to the age field, and position 1 corresponds to the email field. All the other positions in the
bit sequence associated with `Contact` are unused and must be unset.

## Segment

A segment is a `varuint62` size followed by size bytes, just like a `sequence<uint8>`. The bytes that follow the size
are called the body of the segment.

{% /slice2 %}
