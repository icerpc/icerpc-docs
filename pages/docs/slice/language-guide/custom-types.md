---
title: Custom types
description: Understand how to extend the Slice type system with custom types.
---

## Extending Slice

You can easily add new types to Slice with the `custom` keyword. For example, you could define a new 128-bit integer
type as follows:

```slice {% addEncoding=true %}
module Compute

custom BigInt // a signed 128-bit int
```

Later on, you can use `BigInt` as a parameter type or field type just like any other type.

Naturally, Slice cannot guess how to map `BigInt` to a type in your favorite programming language, or how to
encode/decode a `BigInt` to/from a byte representation. You have to provide this information for every language mappings
where you use this type.

## C# mapping

When you define a custom type in C#, you must specify the mapped C# type with the `cs::custom` attribute. For example:

```slice {% addEncoding=true %}
module Compute

[cs::custom("Int128")] // maps WellKnownTypes::BigInt to System.Int128
custom BigInt
```

You also need to provide C# methods that the generated code can use to encode and decode this custom type. The name
of these methods is derived from the name of the Slice custom type. With our `BigInt` custom type, the generated code
calls:

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

{% slice1 %}
If you use this custom type as an optional (with a `?` suffix) outside of a tag context, you also need to supply methods
to encode/decode a nullable value of this type. With our example:

```csharp
namespace Compute; // like above

public static class BigIntSliceDecoderExtensions
{
    public static Int128 DecodeBigInt(this ref SliceDecoder decoder) { ... your implementation ... }

    public static Int128? DecodeNullableBigInt(this ref SliceDecoder decoder) { ... your implementation ... }
}

public static class BigIntSliceEncoderExtensions
{
    public static void EncodeBigInt(this ref SliceEncoder encoder, Int128 value) { ... your implementation ... }

    public static void EncodeNullableBigInt(this ref SliceEncoder encoder, Int128? value)
    {
        ... your implementation ...
    }
}
```
{% /slice1 %}

{% callout type="information" %}
A more logical name for this custom type would be `Int128`. We picked `BigInt` to make it clear where the Slice
identifier is used in the classes and methods that encode/decode this custom type in C#.
{% /callout %}
