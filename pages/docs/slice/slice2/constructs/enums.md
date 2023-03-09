---
title: Enums
description: A data type consisting of a set of named values called enumerators
---



{% callout type="critical" %}

TODO: This page contains placeholder content and needs to be replaced. Please remove this when you are done.

{% /callout %}

## Enums

Enums are a data type consisting of a set of named values called enumerators. The enumerators are defined in the enum
declaration. The enumerators are scoped to the enum type and can be accessed using the enum type name followed by the
enumerator name.

```slice
enum Color
{
    Red,
    Green,
    Blue
};
```

### Enumerators

### Backing Type

The backing type of an enum is the type of the constant expression used to initialize the enum. If no constant expression
is specified, the default value of the backing type is used. The backing type of an enum can be specified explicitly using
the `: type` syntax.

```slice
enum Color : uint8
{
    Red = 1,
    Green = 2,
    Blue = 3
};
```

### Encoding
