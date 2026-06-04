---
title: Dictionaries
description: Learn how Ice dictionaries are mapped to C#
---

## Dictionary fields

A field, an element in a sequence, or a value in another dictionary with a dictionary type is mapped to an
`IDictionary<TKey, TValue>`.

`TKey` resp. `TValue` is the mapped C# type for the Ice key type resp. value type. For example:

```ice
dictionary<string, double> StringDoubleDict;
dictionary<int, StringDoubleDict> DictOfDict;
dictionary<string, Value> StringValueDict;

struct DictionaryExample
{
    DictOfDict x;
    StringValueDict y;
}
```

maps to:

```csharp
public partial record struct DictionaryExample
{
    public required IDictionary<int, IDictionary<string, double>> X { get; set; }

    public required IDictionary<string, IceClass?> Y { get; set; }
}
```

By default, when the generated code decodes a dictionary, it creates a C# `Dictionary<TKey, TValue>` that is transmitted
to you (the application) as an `IDictionary<TKey, TValue>`. You can safely cast this `IDictionary<TKey, TValue>` to a
`Dictionary<TKey, TValue>` after decoding.

You can override this default with the `"cs:generic"` metadata directive described below. This directive only changes
the type that the generated code uses during decoding to fill-in the field: the C# field type itself remains an
`IDictionary<TKey, TValue>`.

## Dictionary parameters and return values

A dictionary parameter has one mapping when it's sent and a different mapping when it's received. This distinction
between incoming and outgoing values makes sending dictionaries more convenient and occasionally faster.

| Mapping for outgoing values               | Default mapping for incoming values |
| ----------------------------------------- | ----------------------------------- |
| `IEnumerable<KeyValuePair<TKey, TValue>>` | `Dictionary<TKey, TValue>`          |

You can override the default mapping for incoming values with the `"cs:generic"` metadata directive (see below). This
gives you the C# type you specified for incoming values. `"cs:generic"` doesn't change the mapping for outgoing values.

## cs:generic metadata

You can use the `"cs:generic"` metadata directive to customize the mapping of your dictionary. This attribute
accepts a single string argument: "SortedDictionary" or "SortedList".

For example:

```ice
["cs:generic:SortedDictionary"]
dictionary<long, Employee> EmployeeMap;
```
