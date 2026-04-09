---
title: Enum types
description: Learn how Ice enumerations are mapped to C#
---

An Ice enumeration maps to a public C# enumeration with the same name, and each Ice enumerator maps to the C# enumerator
with the same name. For example:

{% aside alignment="top" %}

```ice
enum Fruit { Apple, Pear, Orange }
```

```csharp
enum Fruit { Apple, Pear, Orange }
```

{% /aside %}

## Extension methods

The Ice compiler generates extension methods to encode and decode instances of each enum:

- Encode*Name* to encode an enum instance
- Decode*Name* to decode an enum instance

With our `Fruit` example, we get:

```csharp
public static class FruitIceEncoderExtensions
{
    public static void EncodeFruit(this ref IceEncoder encoder, Fruit value) => ...
}

public static class FruitIceDecoderExtensions
{
    public static Fruit DecodeFruit(this ref IceDecoder decoder) => ...
}
```

The Ice compiler also generates an extension method As*Name* to convert an int value into an enumerator.

With our Fruit example:

```csharp
public static class FruitIntExtensions
{
    public static Fruit AsFruit(this int value) => ...
}
```

This conversion fails and throws [InvalidDataException] when the value does not correspond to any enumerator of the
Fruit enumeration.

## cs:attribute metadata directive

The `"cs:attribute"`[cs-attribute] metadata directive adds the specified C# attribute to the mapped C# enum. You
can use it to add the [FlagsAttribute] to the mapped C# enum. For example:

{% aside alignment="top" %}

```ice
["cs:attribute:Flags"]
enum MultiHue
{
    None = 0,
    Black = 1,
    Red = 2,
    Green = 4,
    Blue = 8
}
```

```csharp
[Flags]
public enum MultiHue
{
    None = 0,
    Black = 1,
    Red = 2,
    Green = 4,
    Blue = 8,
}
```

{% /aside %}

The `Flags` attribute is moderately useful with IceRPC since the decoding code only allows values that match known
enumerators. For example, you won't be able to decode `6` for `Red` and `Green` since `6` doesn't correspond to any
enumerator.

[cs-attribute]: https://docs.zeroc.com/ice/3.8/csharp/slice-metadata-directives#SliceMetadataDirectives-cs:attribute
[FlagsAttribute]: https://learn.microsoft.com/en-us/dotnet/api/system.flagsattribute
