---
title: Bit sequence
description: Learn how to encode a field or parameter with an optional type.
---

{% title /%}

A bit sequence represents N bits (where N is a known number) stored in (N / 8) bytes when (N % 8) is 0, and otherwise
stored in (N / 8 + 1) bytes. A bit sequence is empty when N is 0.

The bits of the first byte correspond to positions 0 to 7 in the bit sequence, the bits of the second byte correspond to
positions 8 to 15 etc., until we reach position N - 1. The remaining bits, if any, must be unset.

Bit sequences are used to encode field and parameter lists with optional types in a space-optimized fashion. We encode
the "has a value / "has no value" information in a bit sequence, before the elements of the list.

Each position in the bit sequence encodes whether or not the field or parameter has a value or no value. When the bit is
set in the bit sequence, the corresponding field or parameter has a value; when the bit is unset, the corresponding
field or parameter has no value.
