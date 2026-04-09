---
title: Sequence types
description: Learn how Ice sequences are mapped to C#
---

## Sequence fields

A field, an element in another sequence, or a value in a dictionary with a sequence type is mapped by default to an
`IList<T>`.

`T` is the mapped C# type for the element type of the Ice sequence. For example:

{% aside alignment="top" %}

```ice
sequence<string> StringSeq;
sequence<Value> ClassSeq;

struct SequenceExample
{
    StringSeq x;
    ClassSeq y;
}
```

```csharp
public partial record struct SequenceExample
{
    public required IList<string> X { get; set; }

    public required IList<IceClass?> Y { get; set; }
}
```

{% /aside %}

By default, when the generated code decodes a sequence, it creates an array that is transmitted to you (the
application) as an `IList<T>`. So if you need an array, you can safely cast this `IList<T>` to an array after decoding.

You can override this default mapping with the `"cs:generic"` metadata directive described below. `"cs:generic"` changes
the mapping to the specified C# type with one exception: `"cs:generic:List"` keeps `IList<T>` as the formal type.

## Sequence parameters and return values

A sequence parameter has one mapping when it's sent and a different mapping when it's received. This distinction between
incoming and outgoing values makes sending sequences more convenient and occasionally faster.

### Sequence of bool and numeric types

| Mapping for outgoing values | Default mapping for incoming values |
| --------------------------- | ----------------------------------- |
| `ReadOnlyMemory<T>`         | `T[]`                               |

You can override the default mapping with the `"cs:generic"` metadata directive; this gives you the C# type you
specified for incoming values, and `IEnumerable<T>` for outgoing values.

### All other sequences

| Mapping for outgoing values | Default mapping for incoming values |
| --------------------------- | ----------------------------------- |
| `IEnumerable<T>`            | `T[]`                               |

You can override the default mapping for incoming values with the `"cs:generic"` metadata directive; this gives you the
C# type you specified for incoming values. `"cs:generic"` doesn't change the mapping for outgoing values.

## cs:generic metadata

You can use `"cs:generic"` metadata directive to customize the mapping for your sequence. This directive accepts a
single argument:

- `List`
- `LinkedList`
- `Queue`
- `Stack`
- or your own type name

### Mapping to predefined generic containers

You can change the default mapping for sequences to use a generic container provided by C#. For example:

```ice
["cs:generic:List"] sequence<string> StringSeq;
["cs:generic:LinkedList"] sequence<Fruit> FruitSeq;
["cs:generic:Queue"] sequence<int> IntQueue;
["cs:generic:Stack"] sequence<double> DoubleStack;
```

The `"cs:generic:<type>"` metadata directive causes the Ice compiler to map the corresponding sequence to one of
the containers in the `System.Collections.Generic` namespace. For example, the `IntQueue` sequence maps to
`System.Collections.Generic.Queue<int>`.

Generic containers can be used for sequences of any element type except classes. For sequences of classes, only `List`
is supported. Metadata that specifies any other generic type is ignored with a warning:

```ice
class MyClass
{
    // ...
}

["cs:generic:List"]
sequence<MyClass> MyClassList; // OK

["cs:generic:LinkedList"]
sequence<MyClass> MyClassLinkedList; // Ignored
```

In this example, sequence type `MyClassList` maps to the generic container `System.Collections.Generic.List<MyClass>`,
but sequence type `MyClassLinkedList` uses the default mapping.

### Mapping to custom types

If the array mapping and the predefined containers are unsuitable for your application (for example, because you may
need a priority queue, which is not a standard C# container), you can implement your own custom containers and direct
the Ice compiler to map sequences to these custom containers. For example:

```ice
["cs:generic:MyTypes.PriorityQueue"] sequence<int> Queue;
```

This metadata directive causes the Ice `Queue` sequence to be mapped to the type `MyTypes.PriorityQueue`. You must
specify the fully-qualified name of your custom type following the `cs:generic:` prefix. This is because the generated
code prepends a `global::` qualifier to the type name you provide; for the preceding example, the generated code refers
to your custom type as `global::MyTypes.PriorityQueue<int>`.

Your custom type can have whatever interface you deem appropriate, but it must meet the following requirements:

- The custom type must implement `System.Collections.Generic.IEnumerable<T>`.
- The custom type must provide a `Count` property that returns the number of elements in the collection.
- The custom type must provide an `Add` method that appends an element to the end of the collection.

As an example, here is a minimal class (omitting implementation) that meets these criteria:

```csharp
public class PriorityQueue<T> : IEnumerable<T>
{
    public IEnumerator<T> GetEnumerator();

    public int Count { get; }

    public void Add(T element);

    // Other methods and fields here...
}
```
