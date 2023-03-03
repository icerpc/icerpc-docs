---
title: Struct
description: Learn how to encode a struct with Slice.
---

{% title /%}

## Compact struct

A compact struct is encoded as a [bit sequence](../bit-sequence) with N bits, where N is the number of fields with
optional types in the compact struct, followed by the encoded fields in definition order.

The bit sequence is empty (and occupies no byte) when the compact struct has no field with an optional type.

Each field is encoded as follows:
- if the field has a non-optional type, encode the field value as usual.
- otherwise:
    - if the field value is set, set the corresponding bit in the bit sequence and encode the field value as usual.
    - otherwise, make sure the corresponding bit in the bit sequence is unset and don't encode anything else for this
      field.

{% callout type="information" %}
The name of the compact struct and the name of the struct's fields is not encoded at all. As a result, changing these
names does not break the "on-the-wire" contract.
{% /callout %}

_Example 1_

```slice
compact struct Point { x: int32, y: int32 }
```

A point x = 5, y = 32 is encoded as follows:
```
0x05 0x00 0x00 0x00: x's value (5 on 4 bytes in little endian order)
0x20 0x00 0x00 0x00: y's value (32 on 4 bytes in little endian order)
```

_Example 2_
```
compact struct Contact {
  id: int32
  name: string?
  age: uint8?
}
```

The contact id = 5, name = not set, age = 42 is encoded as:
```
0x02:                bit sequence with only the bit at position 1 set
0x05 0x00 0x00 0x00: id (5)
-                    nothing for name since the bit sequence's bit at position 0 is not set
0x2a               : age (42 encoded on a single byte)
```

## Struct

A regular (non-compact) struct is encoded like a compact struct with all the struct's non-tagged fields, in the same
order, followed by the encoded tagged fields.

Unlike a compact struct, a struct can have no field at all or only tagged fields. In this case, the struct is encoded
as its tagged fields.

The tagged fields of a struct are encoded in tag order (not in definition order), with the field with the lowest tag
encoded first. For each tagged field:
- if the field value is not set, don't encode anything
- if the field value is set, encode this field as: `[tag][size][value]` where tag is the tag encoded as a `varint32`,
value is the encoded field value and size is a `varuint62` with the number of bytes in value.

Finally, mark the end of the tagged fields (and the struct) with the "tag end marker", -1 encoded as a `varint32`.

The tag end marker is always included, even if the struct does not define any tagged field.

_Example 1_

```slice
struct Point { x: int32, y: in32 }
```

A (non-compact) point x = 5, y = 32 is encoded as follows:
```
0x05 0x00 0x00 0x00: x's value (5 on 4 bytes in little endian order)
0x20 0x00 0x00 0x00: y's value (32 on 4 bytes in little endian order)
0xfc:                tag end marker (-1 varint32, encoded on 1 byte)
```

_Example 2_

```slice
struct AllOptional {}
```

An instance of AllOptional is encoded as:
```
0xfc: tag end marker
```

_Example 3_

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
0x10               : age's tag (2 as a varint32 on 1 byte)
0x04               : age's value size (1 as a varuint62 on 1 byte)
0x2a               : age's encoded value on a single byte
0xfc:              : tag end marker (-1 varint32, encoded on 1 byte)
```
