---
title: Dictionary types
description: Learn how to define and use dictionaries in Slice.
---

## Associative array

A dictionary is a built-in generic type that represents an associative array. All the keys of this associative array
have the same Slice type, and all the values have the same Slice type.

A dictionary is like a sequence of key-value pairs with the following constraints:

- each key is unique
- the type of the key is a string, bool, integral type, enum type, custom type, or a compact struct with key-compatible
  fields

You can construct a dictionary type inline, without giving it a name, for example to specify the type of a parameter or
field:

```slice {% addMode=true %}
module VisitorCenter

interface Greeter {
    greet(name: string) -> string
    allPreviousGreetings() -> Dictionary<string, string>
}
```

In this example, `Dictionary<string, string>` is a constructed type.

You can use any Slice type for the value-type of your dictionary. For example:

{% slice1 %}

```slice
compact struct DictionaryExample {
    x: Dictionary<int32, Dictionary<string, float64>> // dictionary of dictionaries
    y: Dictionary<string, AnyClass?>
}
```

{% /slice1 %}
{% slice2 %}

```slice
struct DictionaryExample {
    x: Dictionary<int32, Dictionary<string, float64>> // dictionary of dictionaries
    y: Dictionary<string, float64?>
}
```

{% /slice2 %}

## C# mapping

### Dictionary fields

A field, an element in a sequence, or a value in another dictionary with type `Dictionary<K, V>` is mapped to an
`IDictionary<TKey, TValue>`.

`TKey` resp. `TValue` is the mapped C# type for the Slice key type resp. value type. For example:

{% slice1 %}
{% side-by-side alignment="top" %}

```slice
compact struct DictionaryExample {
    x: Dictionary<int32, Dictionary<string, float64>>
    y: Dictionary<string, AnyClass?>
}
```

```csharp
public partial record struct DictionaryExample
{
    public IDictionary<int, IDictionary<string, double>> X;

    public IDictionary<string, SliceClass?> Y;
}
```

{% /side-by-side %}
{% /slice1 %}

{% slice2 %}
{% side-by-side alignment="top" %}

```slice
struct DictionaryExample {
    x: Dictionary<int32, Dictionary<string, float64>>
    y: Dictionary<string, float64?>
}
```

```csharp
public partial record struct DictionaryExample
{
    public IDictionary<int32, IDictionary<string, double>> X;

    public IDictionary<string, double?> Y;
}
```

{% /side-by-side %}
{% /slice2 %}

By default, when the generated code decodes a dictionary, it creates a C# `Dictionary<TKey, TValue>` that is transmitted
to you (the application) as an `IDictionary<TKey, TValue>`. You can safely cast this `IDictionary<TKey, TValue>` to a
`Dictionary<TKey, TValue>` after decoding.

You can override this default with the [`cs::type` attribute](#cs::type-attribute). This attribute only changes
the type that the generated code uses during decoding to fill-in the field: the C# field type itself remains an
`IDictionary<TKey, TValue>`.

### Dictionary parameters

A dictionary parameter has one mapping when it's sent and a different mapping when it's received. This distinction
between incoming and outgoing values makes sending dictionaries more convenient and occasionally faster.

| Mapping for outgoing values               | Default mapping for incoming values |
| ----------------------------------------- | ----------------------------------- |
| `IEnumerable<KeyValuePair<TKey, TValue>>` | `Dictionary<TKey, TValue>`          |

You can override the default mapping for incoming values with the [`cs::type` attribute](#cs::type-attribute);
this gives you the C# type you specified for incoming values. `cs::type` doesn't change the mapping for
outgoing values.

### cs::type attribute

You can use the `cs::type` [attribute](attributes#c#-attributes) to customize the mapping of your dictionary. This attribute
accepts a single string argument: the name of a type similar to `Dictionary<TKey, TValue>`.

More specifically, this type must provide a capacity constructor (with an `int` parameter). It must also implement
`IDictionary<TKey, TValue>` when `cs::type` is applied to a field; it must implement
`ICollection<KeyValuePair<TKey, TValue>>` when `cs::type` is applied to a parameter. For example:

{% side-by-side alignment="top" %}

```slice
interface Greeter {
    // List<KeyValuePair<TKey, TValue>> implements
    // ICollection<KeyValuePair<TKey, TValue>>;
    // it also provides a capacity constructor.
    allPreviousGreetings() ->
        [cs::type("List<KeyValuePair<string, string>>")] Dictionary<string, string>
}
```

```csharp
public partial interface IGreeter
{
    Task<List<KeyValuePair<string, string>>> AllPreviousGreetingsAsync(
        IFeatureCollection? features = null,
        CancellationToken cancellationToken = default);
}

public partial interface IGreeterService
{
    ValueTask<IEnumerable<KeyValuePair<string, string>>> AllPreviousGreetingsAsync(
        IFeatureCollection features,
        CancellationToken cancellationToken);
}
```

{% /side-by-side %}
