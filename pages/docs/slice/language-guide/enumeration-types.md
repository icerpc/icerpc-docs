---
title: Enumeration
description: Learn how to define enumerations in Slice.
---

## Enumeration types

A Slice enumeration type is a set of named constants, each with an associated value. It resembles the enumeration types
found in languages like C# and C++.

The following example shows how to define an enumeration type named `Fruit` with three enumerators: `Apple`,
`Pear`, and `Orange`.

{% slice2 %}
```slice {% addEncoding=true %}
enum Fruit : int32 {
    Apple,
    Pear,
    Orange
}
```
{% /slice2 %}

{% slice1 %}
```slice {% addEncoding=true %}
enum Fruit {
    Apple,
    Pear,
    Orange
}
```
{% /slice1 %}

{% slice2 %}
With Slice2 you have to define an underlying type for your enumerations, in the previous example the `Fruit` enumeration
uses `int32` as its underlying type. The underlying type specifies the valid range of values for the enumerators. The
underlying type must be a [fixed size integral type](./primitive-types#fixed-size-integral-types) or a
[variable size integral type](./primitive-types#variable-size-integral-types).

The choice of underlying type should align with the expected range of values for the enumerators.
{% /slice2 %}

## Enumerator explicit values

The default behavior of the Slice compiler is to assign values to the enumerators automatically. The first enumerator,
is assigned a value of `0`, and subsequent enumerators are assigned increasing values.

The following code example illustrates how you can explicitly assign values for the enumerators in your enumeration
type. In this example, the `Apple` enumerator is assigned a value of `1`, the `Pear` enumerator is assigned a value
of `5`, and the `Orange` enumerator is left without an explicitly assigned value.

{% slice2 %}
```slice {% addEncoding=true %}
enum Fruit : int32 {
    Apple = 1,
    Pear = 5,
    Orange
}
```
{% /slice2 %}

{% slice1 %}
```slice {% addEncoding=true %}
enum Fruit {
    Apple = 1,
    Pear = 5,
    Orange
}
```
{% /slice1 %}

If you don't assign a value to an enumerator, the Slice compiler will assign a value by incrementing the previous
enumerator's value by one. In the previous Slice definition, the `Orange` enumerator will have a value of `6`.
