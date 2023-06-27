---
title: Enum types
description: Learn how to define enumerations in Slice.
---

## Enumeration

An enum type holds a set of named constants, called enumerators, each with an associated value. It is similar to the
enum types found in languages like C# and C++.

The following example shows how to define an enum type named `Fruit` with three enumerators: `Apple`, `Pear`, and
`Orange`.

{% slice2 %}
```slice
enum Fruit : uint8 {
    Apple,
    Pear,
    Orange
}
```
{% /slice2 %}

{% slice1 %}
```slice
enum Fruit {
    Apple,
    Pear,
    Orange
}
```
{% /slice1 %}

{% slice2 %}
An enumeration must specify the valid range of values for its enumerators with an underlying type. In the previous
example, the `Fruit` enumeration uses `uint8` as its underlying type. The underlying type must be a
[fixed size integral type](primitive-types#fixed-size-integral-types) or a
[variable size integral type](primitive-types#variable-size-integral-types).
{% /slice2 %}

## Enumerator values

The default behavior of the Slice compiler is to assign values to the enumerators automatically. The first enumerator,
is assigned a value of `0`, and subsequent enumerators are assigned increasing values.

The following code example illustrates how you can explicitly assign values for the enumerators in your enumeration
type. In this example, the `Apple` enumerator is assigned a value of `1`, the `Pear` enumerator is assigned a value
of `5`, and the `Orange` enumerator is left without an explicitly assigned value.

{% slice2 %}
```slice
enum Fruit : uint8 {
    Apple = 1,
    Pear = 5,
    Orange
}
```
{% /slice2 %}

{% slice1 %}
```slice
enum Fruit {
    Apple = 1,
    Pear = 5,
    Orange
}
```
{% /slice1 %}

If you don't assign a value to an enumerator, the Slice compiler will assign a value by incrementing the previous
enumerator's value by one. In the previous Slice definition, the `Orange` enumerator will have a value of `6`.
