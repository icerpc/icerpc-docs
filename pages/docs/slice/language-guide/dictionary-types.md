---
title: Dictionary types
description: Learn how to define and use dictionaries in Slice.
---

## Associative array

A dictionary is a constructed type that represents an associative array. A dictionary is like a sequence of key-value
pairs with the following constraints:
- each key is unique
- the type of the key is a string, bool, integral type, enum type, custom type or a compact struct with key-compatible
fields

You use a dictionary type inline, without giving it a name, for example as the type for a parameter or field:

```slice {% addEncoding=true %}
module VisitorCenter

interface Greeter {
    greet(name: string) -> string
    allPreviousGreetings() -> dictionary<string, string>
}
```

You can use any Slice type for the values of your dictionary. For example:

{% slice1 %}
```slice
compact struct DictionaryExample {
    x: dictionary<int32, dictionary<string, float64>> // dictionary of dictionaries
    y: dictionary<string, AnyClass?>
}
```
{% /slice1 %}
{% slice2 %}
```slice
struct DictionaryExample {
    x: dictionary<int32, dictionary<string, float64>> // dictionary of dictionaries
    y: dictionary<string, float64?>
}
```
{% /slice2 %}

## C# mapping

### Dictionary fields

A field, an element in a sequence, or a value in another dictionary with type `dictionary<K, V>` is mapped to an
`IDictionary<TKey, TValue>`.

The type of the `IDictionary` key resp. value is the mapped C# type for the Slice key type resp. value type.
For example:

{% slice1 %}
{% side-by-side alignment="top" %}
```slice
compact struct DictionaryExample {
    x: dictionary<int32, dictionary<string, float64>>
    y: dictionary<string, AnyClass?>
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
    x: dictionary<int32, dictionary<string, float64>>
    y: dictionary<string, float64?>
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

By default, when the generated code decodes a dictionary, it creates a C# `Dictionary` that is transmitted to you (the
application) as an `IDictionary<TKey, TValue>`. You can safely cast this `IDictionary<TKey, TValue>` to a
`Dictionary<TKey, TValue>` after decoding.

### Dictionary parameters

A dictionary parameter has one mapping when it's sent and a different mapping when it's received. This distinction
between incoming and outgoing values makes sending dictionaries more convenient and occasionally faster.

| Mapping for outgoing values               | Default mapping for incoming values |
|-------------------------------------------|-------------------------------------|
| `IEnumerable<KeyValuePair<TKey, TValue>>` | `Dictionary<TKey, TValue>`          |
