---
title: Sequence types
description: Learn how to define and use sequences in Slice.
---

## Unbounded list

A sequence is a built-in generic type that represents a list of elements with the same type. The number of elements in
each sequence is known at runtime but is not specified when you define the sequence type.

You can construct a sequence type inline, without giving it a name, for example to specify the type of a parameter or
field:

```slice {% addMode=true %}
module VisitorCenter

interface Greeter {
    greet(name: string) -> string
    allPreviousGreetings() -> Sequence<string>
}
```

A built-in generic type with type arguments, such as a `Sequence<string>`, is called a constructed type.

The order of the elements in the sequence is maintained when this sequence is transmitted over the wire.

The element type of a sequence can be any Slice type. For example:

{% slice1 %}

```slice
compact struct SequenceExample {
    x: Sequence<Sequence<string>>
    y: Sequence<AnyClass?>
}
```

{% /slice1 %}
{% slice2 %}

```slice
struct SequenceExample {
    x: Sequence<Sequence<string>>
    y: Sequence<int32?>
}
```

{% /slice2 %}

## C# mapping

### Sequence fields

A field, an element in another sequence, or a value in a dictionary with type `Sequence<T>` is mapped to an `IList<T>`.

The type of the `IList` elements is the mapped C# type for the Slice element type. For example:

{% slice1 %}
{% aside alignment="top" %}

```slice
compact struct SequenceExample {
    x: Sequence<Sequence<string>>
    y: Sequence<AnyClass?>
}
```

```csharp
public partial record struct SequenceExample
{
    public IList<IList<string>> X;

    public IList<SliceClass?> Y;
}
```

{% /aside %}
{% /slice1 %}

{% slice2 %}
{% aside alignment="top" %}

```slice
struct SequenceExample {
    x: Sequence<Sequence<string>>
    y: Sequence<int32?>
}
```

```csharp
public partial record struct SequenceExample
{
    public IList<IList<string>> X;

    public IList<int?> Y;
}
```

{% /aside %}
{% /slice2 %}

By default, when the generated code decodes a sequence, it creates an array that is transmitted to you (the
application) as an `IList<T>`. So if you need an array, you can safely cast this `IList<T>` to an array after decoding.

You can override this default with the [`cs::type` attribute](#cs::type-attribute). This attribute only changes
the type that the generated code uses during decoding to fill-in the field: the C# field type itself remains an
`IList<T>`.

### Sequence parameters

A sequence parameter has one mapping when it's sent and a different mapping when it's received. This distinction between
incoming and outgoing values makes sending sequences more convenient and occasionally faster.

#### Sequence of bool or fixed-size numeric type

| Mapping for outgoing values | Default mapping for incoming values |
| --------------------------- | ----------------------------------- |
| `ReadOnlyMemory<T>`         | `T[]`                               |

{% slice2 %}
{% callout type="note" %}
This mapping also applies to Slice enums whose underlying type is fixed-size.
{% /callout %}
{% /slice2 %}

You can override the default mapping with the [`cs::type` attribute](#cs::type-attribute); this gives you the C#
type you specified for incoming values, and `IEnumerable<T>` for outgoing values.

#### All other sequences

| Mapping for outgoing values | Default mapping for incoming values |
| --------------------------- | ----------------------------------- |
| `IEnumerable<T>`            | `T[]`                               |

You can override the default mapping for incoming values with the [`cs::type` attribute](#cs::type-attribute);
this gives you the C# type you specified for incoming values. `cs::type` doesn't change the mapping for outgoing values
here.

### cs::type attribute

You can use the `cs::type` [attribute](attributes#c#-attributes) to customize the mapping of your sequence. This
attribute accepts a single string argument: the name of a type similar to `List<int>`.

More specifically, this type must:

- provide a constructor that accepts an `IEnumerable<T>` or a `T[]` when T is a bool or a fixed-size integral type
- provide a capacity constructor (with an `int` parameter) otherwise

This type must implement `IList<T>` when `cs::type` is applied to a field; it must implement `ICollection<T>` when
`cs::type` is applied to a parameter.

For example:

{% aside alignment="top" %}

```slice
interface WidgetCatalog {
    // HashSet<T> implements ICollection<T> and has
    // a capacity constructor.
    getWidgets(prefix: string) ->
        [cs::type("HashSet<Widget>")] Sequence<Widget>
}

compact struct Widget { ... }
```

```csharp
public partial interface IWidgetCatalog
{
    Task<HashSet<Widget>> GetWidgetsAsync(
        string prefix,
        IFeatureCollection? features = null,
        CancellationToken cancellationToken = default);
}

public partial interface IWidgetCatalogService
{
    ValueTask<IEnumerable<Widget>> GetWidgetsAsync(
        string prefix,
        IFeatureCollection features,
        CancellationToken cancellationToken);
}
```

{% /aside %}
