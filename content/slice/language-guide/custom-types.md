---
title: Custom types
description: Understand how to extend the Slice type system with custom types.
---

## Extending Slice

A custom type is a user-defined type that is totally custom because you decide how it's mapped in each programming
language. You also need to provide helper methods that encode/decode this type.

For example, you could define a new 128-bit integer type as follows:

```slice
module Compute

custom BigInt // a signed 128-bit int
```

Later on, you can use `BigInt` as a parameter type or field type just like any other type.

## C# mapping

When you use a custom type from another Slice definition, you must specify the mapped C# type with the
`cs::type` [attribute](attributes#c#-attributes); otherwise, the code generations fails. The attribute accepts a single
string argument: the name of the mapped C# type.

For example:

```slice
module Compute

[cs::type("Int128")] // maps Compute::BigInt to System.Int128
custom BigInt
```

You also need to provide C# methods that the generated code can use to encode and decode this custom type. The name
of these methods is derived from the name of the Slice custom type mapped to C# (this mapping can be itself customized
with [`cs::identifier`][cs-identifier]). With our `BigInt` custom type, the generated code calls:

```csharp
namespace Compute; // must be in the mapped C# namespace

// You must provide these two classes; the generated code call these methods.

public static class BigIntSliceDecoderExtensions
{
    public static Int128 DecodeBigInt(this ref SliceDecoder decoder) { ... your implementation ... }
}

public static class BigIntSliceEncoderExtensions
{
    public static void EncodeBigInt(this ref SliceEncoder encoder, Int128 value) { ... your implementation ... }
}
```

{% callout type="note" %}
A more logical name for this custom type would be `Int128`. We picked `BigInt` to make it clear where the Slice
identifier is used in the classes and methods that encode/decode this custom type.
{% /callout %}

[cs-identifier]: attributes#cs::identifier-attribute
