---
title: Encoding-only constructs
description: Learn about helper constructs used for the encoding of other constructs.
---

{% title /%}

TODO: slice2-only

## Bit sequence

A bit sequence represents N bits, where N is a known number.

These N bits are stored in (N / 8) bytes when N is a multiple of 8; otherwise, a bit sequence uses (N / 8) + 1 bytes.
The bits of the first byte correspond to positions 0 to 7 in the bit sequence, the bits of the second byte correspond to
positions 8 to 15 etc., until we reach position N - 1. The remaining bits, if any, must be unset.

Bit sequences are used to encode field, parameter and other lists with optional types in a space-optimized fashion. We
encode the "has a value / "has no value" information in a bit sequence, before the elements of the list.

Each position in the bit sequence encodes whether or not the element in the list has a value or no value. When the bit
at position P is set in the bit sequence, the element at position P has a value; when the bit is unset, the element at
position P has no value.

The element list can appear discontinuous. For example:
```
compact struct Contact {
    id: string
    age: uint8?
    name: string
    email: string?
    country: string
}
```

The bit sequence associated with `Contact` looks only at fields with an optional type. So position 0 corresponds to the
age field, and position 1 corresponds to the email field. All the other positions in the bit sequence are unused and
must be unset.

## Segment

A segment is a `varuint62` size followed by size bytes, just like a `sequence<uint8>`.
