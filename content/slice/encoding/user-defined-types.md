---
title: User-defined types
description: Learn how to encode structs, enums, and other user-defined types with Slice.
---
## Enum

### Enum with underlying type

An enumerator is encoded as its associated numeric value, using the encoding of the enumeration's underlying type.

For example:

```slice
enum Fruit : uint16 { Apple, Strawberry, Orange = 300 }
```

A `Strawberry` is encoded like a `uint16` with value 1 (on 2 bytes). An `Orange` is encoded like a `uint16` with value
300.

The encoding is the same for checked and unchecked enums.

### Enum with fields

An enumerator is encoded as:

- a `varint32` holding its discriminant value
- for an unchecked enum, a `varuint62` holding the size of the encoded fields
- a struct holding the fields of this enumerator

The trailing struct is a compact struct when the enum itself is compact. Conversely, if the enum is not compact then the
trailing struct is also not compact and its encoding always ends with the tag end marker byte.

For example, with the following Slice enum:

```slice
enum Shape { Circle(radius: int32), Dot }
```

Circle is encoded as:

- the discriminant value (0) on 1 byte
- the radius on 4 bytes
- the tag end marker on 1 byte

If an enumerator in a compact enum has no fields, only the discriminant value is encoded, since there are no fields to
encode.

## Struct
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

[bit-sequence]: encoding-only-constructs#bit-sequence
