---
title: Struct types
description: Learn how Ice structs are mapped to C#
---

An Ice struct maps to a partial record struct with the same name.

Consider the following Ice struct:

```ice
struct Point
{
    double x;
    double y;
}
```

The Ice compiler maps `Point` to C# as shown below:

```csharp
public partial record struct Point
{
    public double X { get; set; }
    public double Y { get; set; }

    /// <summary>Initializes a new instance of the <see cref="Point" /> struct.</summary>
    public Point(double X, double Y)
    {
        this.X = X;
        this.Y = Y;
    }

    /// <summary>Initializes a new instance of the <see cref="Point" /> struct from an IceDecoder.</summary>
    public Point(ref IceDecoder decoder)
    {
        this.X = decoder.DecodeDouble();
        this.Y = decoder.DecodeDouble();
    }

    /// <summary>Encodes the fields of this struct with an Ice encoder.</summary>
    public readonly void Encode(ref IceEncoder encoder)
    {
        encoder.EncodeDouble(this.X);
        encoder.EncodeDouble(this.Y);
    }
}
```

The mapped C# record struct provides a primary constructor with parameters for all its fields, and also a decoding
constructor that constructs a new instance by decoding its fields from an [IceDecoder]. The generated `Encode` method
encodes the struct fields with an [IceEncoder].

## cs:readonly metadata directive

You can map an Ice struct to a readonly C# struct with the `"cs:readonly"`[cs-readonly] metadata directive. For example:

{% aside alignment="top" %}

```ice
["cs:readonly"]
struct Point
{
    double x;
    double y;
}
```

```csharp
public readonly partial record struct Point
{
    public double X { get; init; }
    public double Y { get; init; }

    ...
}
```

{% /aside %}

[IceEncoder]: csharp:IceRpc.Ice.Codec.IceEncoder
[cs-readonly]: TODO
