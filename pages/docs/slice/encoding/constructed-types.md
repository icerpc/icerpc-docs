---
title: Constructed types
description: Learn how to encode structs, enums, exceptions and proxies with Slice.
---



{% slice1 %}
## Class

The class encoding is complex and stateful. Since a class instance can point to another class instance (or even itself)
and bring this instance into the encoded byte stream, the class encoding requires an indexing system and a scope, namely
the payload of a request or a response.

The class encoding is described in the
[Ice manual](https://doc.zeroc.com/ice/3.7/ice-protocol-and-encoding/ice-encoding/data-encoding-for-classes). Slice1
corresponds to encoding version 1.1 in the Ice manual.

IceRPC encodes classes in the compact format by default, just like Ice. You can change this format with the `format`
attribute. IceRPC can decode classes in any format.

During decoding, IceRPC considers all classes that use the sliced format to be fully
[preserved](https://doc.zeroc.com/ice/3.7/client-server-features/slicing-values-and-exceptions#id-.SlicingValuesandExceptionsv3.7-PreservingSlices).

{% callout type="information" %}
There is no attribute to turn off class slice preservation during decoding: it's always on.
{% /callout %}
{% /slice1 %}

## Enum

{% slice1 %}
An enumerator is encoded as its associated numeric value using the
[variable-length size](encoding-only-constructs#variable-length-size) encoding.

For example:
```slice
enum Fruit { Apple, Strawberry, Orange = 300 }
```

A `Strawberry` is encoded as `1` on 1 byte. An `Orange` is encoded as 255 (1 byte) followed by `300` encoded as an
int32 (5 bytes total).

The encoding is the same for checked and unchecked enums.
{% /slice1 %}

{% slice2 %}
An enumerator is encoded as its associated numeric value, using the encoding of the enumeration's underlying type.

For example:
```slice
enum Fruit : uint16 { Apple, Strawberry, Orange = 300 }
```

A `Strawberry` is encoded like a uint16 with value 1 (on 2 bytes). An `Orange` is encoded like a uint16 with value 300.

The encoding is the same for checked and unchecked enums.
{% /slice2 %}

## Exception

{% slice1 %}
An exception is encoded like a [class](#class) with the same fields. IceRPC always encodes exceptions in sliced format;
it can decode exceptions in any format.

Exceptions are not [preserved](https://doc.zeroc.com/ice/3.7/client-server-features/slicing-values-and-exceptions#id-.SlicingValuesandExceptionsv3.7-PreservingSlices)
during decoding: if IceRPC encounters a slice it doesn't know while decoding a sliced-format exception, this slice
is dropped.
{% /slice1 %}

{% slice2 %}
An exception is encoded exactly like a [struct](#struct) with the same fields.
{% /slice2 %}

## Proxy

A proxy is encoded as its [service address](#primitive-types#ServiceAddress).

{% callout type="information" %}
The name of the proxy's interface is not encoded at all. Only the proxy's untyped service address is encoded.
{% /callout %}

## Struct

{% slice1 %}
A compact struct is encoded as its fields, in definition order, without any framing.

{% callout type="information" %}
The name of the struct and the name of the struct's fields are not encoded at all. As a result, changing these names
does not break the "on-the-wire" contract.
{% /callout %}

_Example: simple compact struct_

```slice
encoding = 1

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
- a [bit sequence](encoding-only-constructs#bit-sequence) with N bits, where N is the number of non-tagged fields with
  optional types in the struct, followed by
- the non-tagged fields encoded in definition order, followed by
- the tagged fields

The bit sequence is empty (and occupies no byte) when none of the struct's fields has an optional type (ignoring tagged
fields).

Each non-tagged field is encoded as follows:
- if the field has a non-optional type, encode the field value as usual.
- otherwise:
    - if the field value is set, set the corresponding bit in the bit sequence and encode the field value as usual.
    - otherwise, make sure the corresponding bit in the bit sequence is unset and don't encode anything else for this
      field.

The tagged fields of a struct are encoded in tag order (not in definition order); the field with the lowest tag number
is encoded first. For each tagged field:
- if the field value is not set, don't encode anything
- otherwise encode this field as `[number][size][value]` where number is the tag number encoded as a varint32, value is
the encoded field value and size is a varuint62 with the number of bytes in value.

Finally, we mark the end of the tagged fields (and the end of the struct) with the "tag end marker", -1 encoded as a
`varint32`.

**Compact struct**

If a struct is marked `compact`, it cannot have any tagged field and its encoded representation does not include the tag
end marker.

The encoding of a regular (non-compact) struct always includes the tag end marker byte, even when it has no tagged
field. This is why a compact struct is slightly more compact than a regular struct.

{% callout type="information" %}
The name of the struct and the name of the struct's fields are not encoded at all. As a result, changing these names
does not break the "on-the-wire" contract.
{% /callout %}

_Example: simple compact struct_

```slice
compact struct Point { x: int32, y: int32 }
```

A point x = 5, y = 32 is encoded as follows:
```
0x05 0x00 0x00 0x00: x's value (5 on 4 bytes in little-endian order)
0x20 0x00 0x00 0x00: y's value (32 on 4 bytes in little-endian order)
```

_Example: compact struct with a bit sequence_
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

_Example: simple struct_

```slice
struct Point { x: int32, y: in32 }
```

A (non-compact) point x = 5, y = 32 is encoded as follows:
```
0x05 0x00 0x00 0x00: x's value (5 on 4 bytes in little-endian order)
0x20 0x00 0x00 0x00: y's value (32 on 4 bytes in little-endian order)
0xFC:                tag end marker (-1 varint32, encoded on 1 byte)
```

_Example: empty struct_

```slice
struct Empty {}
```

An instance of Empty is encoded as:
```
0xFC: tag end marker
```

_Example: struct with tagged fields_

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
