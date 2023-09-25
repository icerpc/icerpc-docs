---
title: User-defined types
description: Learn how to encode structs, enums, and other user-defined types with Slice.
---

{% slice1 %}

## Class

The class encoding is complex and stateful. Since a class instance can point to another class instance (or even itself)
and bring this instance into the encoded byte stream, the class encoding requires an indexing system and a scope (the
buffer where all the class instances are encoded).

The class encoding is described in the [Ice manual][ice-manual-class-encoding] and is not reproduced here, except for
the encoding of tagged fields (see below).

{% callout type="note" %}
Slice1 corresponds to version 1.1 of the Ice encoding in the Ice manual.
{% /callout %}

When encoding operation arguments and return values, classes are encoded in the compact format by default, just like in
Ice. You can switch to the sliced format with the [`slicedFormat`][sliced-format-attribute] operation attribute.

During decoding, Slice considers all classes that use the sliced format to be fully [preserved][slice-preservation].

{% callout type="note" %}
There is no attribute to turn off class slice preservation during decoding: it's always on.
{% /callout %}

### Tagged field

The encoding of tagged fields ensures that when a decoder encounters a tagged field with a tag number it doesn't know,
it can skip this tagged field and keep decoding.

The encoding of a tagged field with a set (non-null) value depends on its tag number. When the tag number is less than
30, a tagged field is encoded as:

- a byte, with the tag type in the lowest 3 bits of this byte, and the tag number in the remaining 5 bits
- the tagged value

The encoding of the tagged value depends on the tag type and is described in the table below.

When the tag number is 30 or greater, a tagged field is encoded as:

- a byte, with the tag type in the lowest 3 bits of this byte, and 30 (0x1E) encoded in the remaining 5 bits
- the tag number encoded as a [variable-length size]
- the tagged value (see table below)

A leading byte with value 0xFF is reserved as the "tag end marker". The tag end marker is used to mark the end of a
slice within a class or exception.

The tag type depends on the type of the tagged field, and determines how the tagged value is encoded.

| Tag type name | Tag type value | Tagged value encoding                                                     | Applies to                                                                              |
| ------------- | -------------- | ------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| F1            | 0b000 (0)      | The value is encoded on 1 byte.                                           | bool, uint8                                                                             |
| F2            | 0b001 (1)      | The value is encoded on 2 bytes.                                          | int16                                                                                   |
| F4            | 0b010 (2)      | The value is encoded on 4 bytes.                                          | float32, int32                                                                          |
| F8            | 0b011 (3)      | The value is encoded on 8 bytes.                                          | float64, int64                                                                          |
| Size          | 0b100 (4)      | The value is encoded as a variable-length size.                           | enum                                                                                    |
| VSize         | 0b101 (5)      | A variable-length size followed by the value encoded on size bytes.       | string, fixed-size struct, sequence, or dictionary with fixed-size elements             |
| FSize         | 0b110 (6)      | An int32 size ("fixed size") followed by the value encoded on size bytes. | variable-size struct, custom type, sequence, or dictionary with variable-size elements  |
| Class         | 0b111 (7)      | Not encoded or decoded by Slice.                                          | N/A                                                                                     |

The VSize encoding is optimized when the tagged field type is a string or a sequence with elements of size 1: in this
case, the string or sequence's own variable-length size is used for the same purpose (knowing how many bytes to skip
during decoding when the decoder doesn't know the tag number).
{% /slice1 %}

## Enum

{% slice1 %}
An enumerator is encoded as its associated numeric value using the [variable-length size] encoding.

For example:

```slice {% addMode=true %}
enum Fruit { Apple, Strawberry, Orange = 300 }
```

A `Strawberry` is encoded as 1 on 1 byte. An `Orange` is encoded as 255 (1 byte) followed by 300 encoded as an
`int32` (5 bytes total).
{% /slice1 %}

{% slice2 %}
An enumerator is encoded as its associated numeric value, using the encoding of the enumeration's underlying type.

For example:

```slice
enum Fruit : uint16 { Apple, Strawberry, Orange = 300 }
```

A `Strawberry` is encoded like a `uint16` with value 1 (on 2 bytes). An `Orange` is encoded like a `uint16` with value
300.
{% /slice2 %}

The encoding is the same for checked and unchecked enums.

## Proxy

{% slice1 %}
A null proxy is encoded as the [null Ice identity](/icerpc-for-ice-users/rpc-core/ice-identity) (two empty strings).

A non-null proxy is encoded as the following `ProxyData` struct:

```slice {% addMode=true %}
compact struct ProxyData {
    identity: Identity
    facet: Sequence<string>        // an empty sequence or a 1-element sequence
    invocationMode: InvocationMode
    secure: bool
    protocolMajor: uint8           // 1 = ice, 2 = icerpc
    protocolMinor: uint8
    encodingMajor: uint8
    encodingMinor: uint8
    serverAddressList: Sequence<ServerAddressData>
    adapterId: string              // only present when serverAddressList is empty
}

compact struct Identity {
    name: string
    category: string
}

enum InvocationMode { Twoway, Oneway, BatchOneway, Datagram, BatchDatagram }

compact struct ServerAddressData {
    transportCode: int16 // the TransportCode encoded as an int16
    encapsulation: Encapsulation
}

unchecked enum TransportCode {
    Uri = 0
    Tcp = 1
    Ssl = 2
    Udp = 3
    WS = 4
    Wss = 5
    BT = 6
    Bts = 7
    IAP = 8
    IAps = 9
}
```

Encapsulations are described on the [ice protocol] page. The format of the encapsulation payload in a
`ServerAddressData` depends on its transport code.

With transport code `Uri` (0), the encapsulation payload is a URI string: the server address converted into a URI
string, including the protocol/scheme. `Uri` is a wildcard transport code since the actual transport is specified in the
URI string, or is left unspecified when the server address has no transport parameter.

Other transport codes identify specific transports, such as tcp, ssl, ws (for WebSocket), wss (WebSocket with TLS) etc.

Transport codes `Tcp` and `Ssl` share the same encapsulation payload format:

```slice {% addMode=true %}
compact struct TcpServerAddressBody {
    host: string
    port: int32      // the port number
    timeout: int32   // timeout parameter
    compress: bool   // z parameter
}
```

See [Endpoint] for additional information.
{% /slice1 %}

{% slice2 %}
A proxy is encoded as a URI [string]. This URI can be absolute or relative.
{% /slice2 %}

## Struct

{% slice1 %}
A compact struct is encoded as its fields, in definition order, without any framing.

{% callout type="note" %}
The name of the struct and the name of the struct's fields are not encoded at all. As a result, changing these names
does not break the "on-the-wire" contract.
{% /callout %}

#### Example: simple compact struct

```slice {% addMode=true %}
compact struct Point { x: int32, y: int32 }
```

A point x = 5, y = 32 is encoded as follows:

```
0x05 0x00 0x00 0x00: x's value (5 on 4 bytes in little-endian order)
0x20 0x00 0x00 0x00: y's value (32 on 4 bytes in little-endian order)
```

{% /slice1 %}

{% slice2 %}
A struct is encoded as:

- a [bit sequence][bit-sequence] with N bits, where N is the number of non-tagged fields with optional types in the
  struct, followed by
- the non-tagged fields encoded in definition order, followed by
- the tagged fields

The bit sequence is empty (and occupies no byte) when none of the struct's fields has an optional type (ignoring tagged
fields).

Each non-tagged field is encoded as follows:

- if the field has a non-optional type, the field value is encoded as usual.
- otherwise:
  - if the field value is set, the corresponding bit in the bit sequence is set and the field value is encoded as usual.
  - otherwise, the corresponding bit in the bit sequence is unset and nothing else is encoded for this field.

The tagged fields of a struct are encoded in tag order (not in definition order); the field with the lowest tag number
is encoded first. For each tagged field:

- if the field value is not set, nothing is encoded
- otherwise, this field is encoded as `[number][size][value]` where number is the tag number encoded as a varint32,
value is the encoded field value and size is a `varuint62` with the number of bytes in value.

Finally, the "tag end marker" is encoded to mark the end of the tagged fields (and the end of the struct). This tag end
marker is -1 encoded as a `varint32`.

### Compact struct

If a struct is marked `compact`, it cannot have any tagged field and its encoded representation does not include the tag
end marker.

The encoding of a regular (non-compact) struct always includes the tag end marker byte, even when it has no tagged
field. This is why a compact struct is slightly more compact than a regular struct.

{% callout type="note" %}
The name of the struct and the name of the struct's fields are not encoded at all. As a result, changing these names
does not break the "on-the-wire" contract.
{% /callout %}

#### Example: simple compact struct

```slice
compact struct Point { x: int32, y: int32 }
```

A point x = 5, y = 32 is encoded as follows:

```
0x05 0x00 0x00 0x00: x's value (5 on 4 bytes in little-endian order)
0x20 0x00 0x00 0x00: y's value (32 on 4 bytes in little-endian order)
```

#### Example: compact struct with a bit sequence

```slice
compact struct Contact {
  id: int32
  name: string?
  age: uint8?
}
```

The contact id = 5, name = not set, age = 42 is encoded as:

```
0b00000010:          bit sequence with only the bit at position 1 set
0x05 0x00 0x00 0x00: id (5)
-                    nothing for name since the bit at position 0 is not set
0x2A:                age (42 encoded on a single byte)
```

#### Example: simple struct

```slice
struct Point { x: int32, y: int32 }
```

A (non-compact) point x = 5, y = 32 is encoded as follows:

```
0x05 0x00 0x00 0x00: x's value (5 on 4 bytes in little-endian order)
0x20 0x00 0x00 0x00: y's value (32 on 4 bytes in little-endian order)
0xFC:                tag end marker (-1 varint32, encoded on 1 byte)
```

#### Example: empty struct

```slice
struct Empty {}
```

An instance of Empty is encoded as:

```
0xFC: tag end marker
```

#### Example: struct with tagged fields

```slice
struct Contact {
  id: int32
  tag(1) name: string?
  tag(2) age: uint8?
}
```

The contact id = 5, name = not set, age = 42 is encoded as:

```
-                    empty bit sequence since no non-tagged field has an optional type
0x05 0x00 0x00 0x00: id (5 on 4 bytes, little-endian)
-                    nothing for the name since it's not set
0x10:                age's tag (2 as a varint32 on 1 byte)
0x04:                age's value size (1 as a varuint62 on 1 byte)
0x2A:                age's encoded value on a single byte
0xFC:                tag end marker (-1 varint32, encoded on 1 byte)
```

{% /slice2 %}

[bit-sequence]: encoding-only-constructs#bit-sequence
[Endpoint]: /icerpc-for-ice-users/rpc-core/endpoint
[ice-manual-class-encoding]: https://doc.zeroc.com/ice/3.7/ice-protocol-and-encoding/ice-encoding/data-encoding-for-classes
[ice protocol]: /icerpc/ice-protocol/protocol-frames#encapsulation
[slice-preservation]: /slice1/language-guide/class-types#slice-preservation
[sliced-format-attribute]: /slice1/language-guide/operation#slicedformat-attribute
[string]: primitive-types#String
[variable-length size]: encoding-only-constructs#variable-length-size
