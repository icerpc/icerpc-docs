---
title: Integer Types
description: Learn about the integral types in Slice.
breadcrumbs:
  - name: Home
    href: /
  - name: Slice
    href: /docs/slice
---

{% title /%}

## Signed Integer Types

{% side-by-side weighted="left"%}

`int8`

Lorem ipsum dolor sit amet, consectetur adipiscing elit.

{% divider margin="my-3"/%}

`int16`

Lorem ipsum dolor sit amet, consectetur adipiscing elit.

{% divider margin="my-3"/%}

`int32`

Lorem ipsum dolor sit amet, consectetur adipiscing elit.

{% divider margin="my-3"/%}

`int64`

Lorem ipsum dolor sit amet, consectetur adipiscing elit.

```slice
module Integers;

struct IntegerTypes
{
    a: int8;
    b: int16;
    c: int32;
    d: int64;
}
```

{% /side-by-side %}

## Unsigned Integer Types

{% side-by-side weighted="left"%}

`uint8`

Lorem ipsum dolor sit amet, consectetur adipiscing elit.

{% divider margin="my-3"/%}

`uint16`

Lorem ipsum dolor sit amet, consectetur adipiscing elit.

{% divider margin="my-3"/%}

`uint32`

Lorem ipsum dolor sit amet, consectetur adipiscing elit.

{% divider margin="my-3"/%}

`uint64`

Lorem ipsum dolor sit amet, consectetur adipiscing elit.

```slice
module Integers;

struct UnsignedIntegerTypes
{
    a: uint8;
    b: uint16;
    c: uint32;
    d: uint64;
}
```

{% /side-by-side %}

## Variable Size Integer Types

{% side-by-side weighted="left"%}

`varint32`

Lorem ipsum dolor sit amet, consectetur adipiscing elit.

{% divider margin="my-3"/%}

`varuint32`

Lorem ipsum dolor sit amet, consectetur adipiscing elit.

{% divider margin="my-3"/%}

`varint62`

Lorem ipsum dolor sit amet, consectetur adipiscing elit.

{% divider margin="my-3"/%}

`varint62`

Lorem ipsum dolor sit amet, consectetur adipiscing elit.

```slice
module Integers;

struct VariableSizedIntegerTypes
{
    a: varint32;
    b: varuint32;
    c: varint62;
    d: varuint62;
}
```

{% /side-by-side %}
