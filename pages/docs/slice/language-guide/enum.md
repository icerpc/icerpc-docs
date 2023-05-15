---
title: Enumeration
description: Learn how to define enumerations in Slice.
---

## Slice enumeration types

A Slice enumeration type is a set of named constants, each with an associated value. It resembles the enumeration types
found in languages like C# and C++. To define an enumeration type, you use the `enum` keyword along with the names of
the enumerators.

The following code example shows how you will define an enumeration type named `Fruit` with three enumerators: `Apple`,
`Pear`, and `Orange`.

``` slice
enum Fruit {
    Apple,
    Pear,
    Orange
}
```

The default behavior of the Slice compiler is to assign values to the enumerators automatically. The first enumerator,
`Apple`, is assigned a value of `0`, and subsequent enumerators are assigned increasing values.

The next code snippet illustrates how you can explicitly specify values for the enumerators in your enumeration type. In
this example, the `Apple` enumerator is assigned a value of `1`, the `Pear` enumerator is assigned a value of `5`, and
the `Orange` enumerator is left without an explicitly assigned value.

``` slice
enum Fruit {
    Apple = 1,
    Pear = 5,
    Orange
}
```

It is important to note that when assigning values, you need to maintain an ascending order. If you don't assign a value
to an enumerator, the Slice compiler will assign a value by incrementing the previous enumerator's value. In the previous
code snippets, the `Orange` enumerator will have a value of `6`.

{% slice2 %}

## Enumerations underlying type

With Slice2 you can define an underlying type for your enumerations. The underlying type specify the valid range of values
for the enumerators, and how the enumerators will be encoded.

For example, you can define an enumerator with an underlying type of `uint8`:

``` slice
enum Fruit : uint8 {
    Apple,
    Pear,
    Orange
}
```

It is important to note that the choice of underlying type should align with your requirements and the expected range of values for the enumerators.

{% /slice2 %}
