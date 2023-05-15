---
title: Enumeration
description: Learn how to define enumerations in Slice.
---

## Slice enumeration types

A Slice enumeration type is a set of named constants, each with an associated value. It resembles the enumeration types
found in languages like C# and C++. To define an enumeration type, you use the `enum` keyword followed by the names of
the enumerators.

The following example shows how you will define an enumeration type named `Fruit` with three enumerators: `Apple`,
`Pear`, and `Orange`.

```slice {% addEncoding=true %}
enum Fruit {
    Apple,
    Pear,
    Orange
}
```

The default behavior of the Slice compiler is to assign values to the enumerators automatically. The first enumerator,
`Apple`, is assigned a value of `0`, and subsequent enumerators are assigned increasing values.

The following code example illustrates how you can explicitly specify values for the enumerators in your enumeration
type. In this example, the `Apple` enumerator is assigned a value of `1`, the `Pear` enumerator is assigned a value
of `5`, and the `Orange` enumerator is left without an explicitly assigned value.

```slice {% addEncoding=true %}
enum Fruit {
    Apple = 1,
    Pear = 5,
    Orange
}
```

If you don't assign a value to an enumerator, the Slice compiler will assign a value by incrementing the previous
enumerator's value by one. In the previous Slice definition, the `Orange` enumerator will have a value of `6`.

## Enumerations underlying type

{% slice2 %}

With Slice2 you can define an underlying type for your enumerations. The underlying type specifies the valid range of
values for the enumerators, and  determines how the enumerators are encoded.

For example, you can define an enumerator with an underlying type of `uint8`:

```slice {% addEncoding=true %}
enum Fruit : uint8 {
    Apple,
    Pear,
    Orange
}
```

The choice of underlying type should align with the expected range of values for the enumerators. Changing the
underlying type of an enumeration type affects its encoding representation and it is therefore a breaking change.

{% /slice2 %}

{% slice1 %}

With Slice1 enumerations always use an `int` as its underlying type, and the values are encoded as a [size](size-encoding).

{% /slice1 %}
