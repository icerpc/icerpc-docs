---
title: Constructed types
description: Learn how to encode structs, enums, exceptions and proxies with Slice.
---



## Enum

An enumerator is encoded as its associated numeric value, using the encoding of the enumeration's underlying type.

For example:
```slice
enum Fruit : uint16 { Apple, Strawberry, Orange = 5 }
```

A `Strawberry` is encoded like a uint16 with value 1 (on 2 bytes), while a `Orange` is encoded as 5.

The encoding is the same for checked and unchecked enums.

## Exception

An exception is encoded exactly like a non-compact [struct](#struct) with the same fields.

## Proxy

A proxy is encoded as a [string](#string) that holds the proxy's service address.

{% callout type="information" %}
The name of the proxy's interface is not encoded at all. Only the untyped service address is encoded.
{% /callout %}

## Struct

A struct is encoded as:
- a [bit sequence](encoding-only-constructs-slice2#bit-sequence) with N bits, where N is the number of non-tagged
fields with optional types in the structs, followed by
- the non-tagged fields encoded in definition order, followed by
- the tagged fields

The bit sequence is empty (and occupies no byte) when the struct has no non-tagged field with an optional type.

Each non-tagged field is encoded as follows:
- if the field has a non-optional type, encode the field value as usual.
- otherwise:
    - if the field value is set, set the corresponding bit in the bit sequence and encode the field value as usual.
    - otherwise, make sure the corresponding bit in the bit sequence is unset and don't encode anything else for this
      field.

{% callout type="information" %}
The name of the struct and the name of the struct's fields are not encoded at all. As a result, changing these names
does not break the "on-the-wire" contract.
{% /callout %}

The tagged fields of a struct are encoded in tag order (not in definition order); the field with the lowest tag is
encoded first. For each tagged field:
- if the field value is not set, don't encode anything
- otherwise encode this field as: `[tag][size][value]` where tag is the tag encoded as a `varint32`, value is the
encoded field value and size is a `varuint62` with the number of bytes in value.

Finally, we mark the end of the tagged fields (and of the struct) with the "tag end marker", -1 encoded as a `varint32`.

**Compact struct**

If a struct is marked `compact`, it can't have any tagged field and its encoded representation does not include the tag
end marker.

The encoding of a non-compact struct always includes the tag end marker byte, even it has no tagged field. This
is why a compact struct is slightly more compact than a non-compact struct.

_Example: simple compact struct_

```slice
compact struct Point { x: int32, y: int32 }
```

A point x = 5, y = 32 is encoded as follows:
```
0x05 0x00 0x00 0x00: x's value (5 on 4 bytes in little endian order)
0x20 0x00 0x00 0x00: y's value (32 on 4 bytes in little endian order)
```

_Example: compact struct with bit sequence_
```
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
0x2a:                age (42 encoded on a single byte)
```

_Example: simple non-compact struct_

```slice
struct Point { x: int32, y: in32 }
```

A (non-compact) point x = 5, y = 32 is encoded as follows:
```
0x05 0x00 0x00 0x00: x's value (5 on 4 bytes in little endian order)
0x20 0x00 0x00 0x00: y's value (32 on 4 bytes in little endian order)
0xfc:                tag end marker (-1 varint32, encoded on 1 byte)
```

_Example: empty struct_

```slice
struct Empty {}
```

An instance of Empty is encoded as:
```
0xfc: tag end marker
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
0x05 0x00 0x00 0x00: id (5 on 4 bytes, little endian)
-                    nothing for the name since it's not set
0x10:                age's tag (2 as a varint32 on 1 byte)
0x04:                age's value size (1 as a varuint62 on 1 byte)
0x2a:                age's encoded value on a single byte
0xfc:                tag end marker (-1 varint32, encoded on 1 byte)
```
