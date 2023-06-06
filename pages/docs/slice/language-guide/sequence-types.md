---
title: Sequence types
description: Learn how to define and use sequences in Slice.
---

## Unbounded list

A sequence is a constructed type that represents a list of elements. The number of elements in each sequence is known at
runtime but is not specified when you define the sequence type.

You use a sequence type inline, without giving it a name, for example as the type for a parameter or field:

```slice {% addEncoding=true %}
module VisitorCenter

interface Greeter {
    greet(name: string) -> string
    allPreviousGreetings() -> sequence<string>
}
```

The order of the elements in the sequence is maintained when this sequence is transmitted over the wire.

The element type of a sequence can be any Slice type. For example:

{% slice1 %}
```slice
compact struct SequenceExample {
    x: sequence<sequence<string>>
    y: sequence<AnyClass?>
}
```
{% /slice1 %}
{% slice2 %}
```slice
struct SequenceExample {
    x: sequence<sequence<string>>
    y: sequence<int32?>
}
```
{% /slice2 %}

## C# mapping

### Sequence fields

A field, an element in another sequence, or a value in a dictionary with type `sequence<T>` is mapped to an `IList<T>`.

The type of the `IList` elements is the mapped C# type for the Slice element type. For example:

{% slice1 %}
{% side-by-side alignment="top" %}
```slice
compact struct SequenceExample {
    x: sequence<sequence<string>>
    y: sequence<AnyClass?>
}
```

```csharp
public partial record struct SequenceExample
{
    public IList<IList<string>> X;

    public IList<SliceClass?> Y;
}
```
{% /side-by-side %}
{% /slice1 %}

{% slice2 %}
{% side-by-side alignment="top" %}
```slice
struct SequenceExample {
    x: sequence<sequence<string>>
    y: sequence<int32?>
}
```

```csharp
public partial record struct SequenceExample
{
    public IList<IList<string>> X;

    public IList<int?> Y;
}
```
{% /side-by-side %}
{% /slice2 %}

By default, when the generated code decodes a sequence, it creates an array that is transmitted to you (the
application) as an `IList<T>`. So if you need an array, you can safely cast this `IList<T>` to an array after decoding.

### Sequence parameters

A sequence parameter has one mapping when it's sent and a different mapping when it's received. This distinction between
incoming and outgoing values makes sending sequences more convenient and occasionally faster.

#### Sequence of bool or fixed-size numeric type

| Mapping for outgoing values | Default mapping for incoming values |
|-----------------------------|-------------------------------------|
| `ReadOnlyMemory<T>`         | `T[]`                               |

{% slice2 %}
{% callout type="information" %}
This mapping also applies to Slice enums whose underlying type is fixed-size.
{% /callout %}
{% /slice2 %}

#### All other sequences

| Mapping for outgoing values | Default mapping for incoming values |
|-----------------------------|-------------------------------------|
| `IEnumerable<T>`            | `T[]`                               |
