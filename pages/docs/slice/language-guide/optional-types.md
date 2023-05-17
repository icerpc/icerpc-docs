---
title: Optional types
description: Learn how to express "may have no value" in Slice.
---

## Basics

{% slice1 %}
With Slice1, classes, proxies and custom types can have both mandatory (must have a value) and optional (may not have a
value) semantics.

For example, let's take a custom `Uri` type and a `Widget` interface. You can make such a type optional by giving it
a `?` suffix:

| Parameter type | Semantics                         |
|----------------|-----------------------------------|
| `Uri`          | A URI; must have a value.         |
| `Widget`       | A widget proxy; must have a value.|
| `Uri?`         | A URI or not set.                 |
| `Widget?`      | A widget proxy or not set.        |
|

This `?` type suffix is also required when you tag a parameter, return type or field. With tags, all types must carry
this suffix. For example:
```slice
encoding = Slice1

interface Widget {
    spin(tag(1) speed: int32?) // the speed can be missing.
}
```
{% /slice1 %}

{% slice2 %}
Any Slice type can be made optional by giving this type a `?` suffix. For example:

```slice
interface Test {
    opA(x: bool, y: string)
    opB(x: bool?, y: string?) // ? after type name
}
```

For `opA`, the parameter `x` is either true or false, while `y` is a string--perhaps an empty string, but not a "null
string".
For `opB`, the parameter `x` can be true, false or not set, while `y` is a string or not set at all.
{% /slice2 %}

## Not set or unknown?

In some cases, you may wonder if an argument is not set or not known to the sender. For example:

```slice
interface Widget {
    spin(tag(1) speed: int32?)
}
```

When you implement `spin`, you cannot distinguish between these 2 situations:
 - the caller knows about speed but chose to not specify a value
 - the caller does not know about speed at all

In both cases, you get a "not set" speed.

## C# mapping

The Slice `?` maps to `?` in C#. For example, an optional Slice int32 (`int32?`) is mapped to an nullable int in C#
(`int?`), and the Slice concept of "not set" maps to `null` in C#.
