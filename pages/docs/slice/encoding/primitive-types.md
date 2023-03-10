---
title: Primitive types
description: Learn how primitive types are encoded with Slice.
---

## Bool

A `bool` is encoded on a single byte, where 0 means `false` and 1 means `true`. Other values are invalid.

## Fixed-size integer

{% slice1 %}
| Type  | Encoded on N bytes |
| ----- | ------------------ |
| uint8 | 1                  |
| int16 | 2                  |
| int32 | 4                  |
| int64 | 8                  |
{% /slice1 %}

{% slice2 %}
| Type          | Encoded on N bytes |
| ------------- | ------------------ |
| int8, uint8   | 1                  |
| int16, uint16 | 2                  |
| int32, uint32 | 4                  |
| int64, uint64 | 8                  |
{% /slice2 %}

The encoding of all signed integers uses [two's complement](https://en.wikipedia.org/wiki/Two%27s_complement), the
standard representation for signed integers.

## Floating-point number

A `float32` or `float64` is encoded on 4 resp. 8 bytes using the binary32 resp. binary64 formats specified by
[IEEE 754](https://en.wikipedia.org/wiki/IEEE_754).

## ServiceAddress

{% slice1 %}
The encoding of a service address with Slice1 is somewhat complex because Ice does not use URIs to represent service
addresses (called proxies in Ice) or server addresses (called endpoints in Ice).

Please refer to the
[Ice manual](https://doc.zeroc.com/ice/3.7/ice-protocol-and-encoding/ice-encoding/data-encoding-for-proxies) for a
description of this encoding. Slice1 corresponds to encoding version 1.1 in the Ice manual.

IceRPC represents an Ice identity as a URI-compatible percent-escaped path. An identity-path can have 1 or 2 path
segments. For example:
```
/foo         # Ice identity with name = foo, category = empty
/foo/bar     # Ice identity with name = bar, category = foo
/foo%20      # Ice identity with name = "foo ", category = empty
/            # null Ice identity (often invalid)
/foo/bar/baz # path can't be converted into an Ice identity (too many slashes)
```

Furthermore:
- the Ice object adapter identifier corresponds to the value of the `adapter-id` parameter.
- the icerpc protocol is encoded as protocol version 2.0.
- IceRPC introduces a new transport code (called endpoint type in Ice), `Uri`, with value 0.
- when the protocol version is not 1.0 (i.e. the service address protocol is not `ice`), the only valid transport code
is `Uri`.

A transport using transport code Uri encodes its server addresses as URI strings--IceRPC's native format.

TODO: it would make sense to move this information (and add much more to it) to the "IceRPC for Ice developers" section,
and include a link to this section.
{% /slice1 %}

{% slice2 %}
A service address is encoded as a URI [string](#String).
{% /slice2 %}

## String

{% slice1 %}
A `string` is encoded using UTF-8 as a [variable-length size](encoding-only-constructs#variable-length-size) followed
by size UTF-8 bytes. These UTF-8 bytes don't include a [BOM](https://en.wikipedia.org/wiki/Byte_order_mark). For
example, the string "1 μs" is usually encoded as:
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
A `string` is encoded using UTF-8 as a `varuint62` size followed by size UTF-8 bytes. These UTF-8 bytes don't include
a [BOM](https://en.wikipedia.org/wiki/Byte_order_mark). For example, the string "1 μs" is usually encoded as:
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
## Variable-size integer

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
