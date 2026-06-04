---
title: Classes
description: Learn how Ice classes are mapped to C#
---

An Ice class maps to a public C# class with the same name. If the Ice class has no base class, the mapped class
derives from [IceClass], the base class for all C# Ice classes.

For example:

{% aside alignment="top" %}

```ice
class CarPart
{
    string id;
    int revision;
    optional(1) double shippingWeight;
}
```

```csharp
public partial class CarPart : IceClass
{
    public required string Id { get; set; }
    public int Revision { get; set; }
    public double? ShippingWeight { get; set; }

    // Parameterless constructor
    public CarPart()
    {
    }

    // Primary constructor
    [SetsRequiredMembers]
    public CarPart(
        string id,
        int revision,
        double? shippingWeight)
    {
        this.Id = id;
        this.Revision = revision;
        this.ShippingWeight = shippingWeight;
    }
}
```

{% /aside %}

The mapped C# class provides a parameterless constructor and a primary constructor which sets all the fields.

Ice class inheritance maps to C# class inheritance as you would expect:

{% aside alignment="top" %}

```ice
class RearBumper extends CarPart
{
    Color color;
}
```

```csharp
public partial class RearBumper : CarPart
{
    public Color Color { get; set; }

    // Parameterless constructor
    public RearBumper()
    {
    }

    // Primary constructor
    [SetsRequiredMembers]
    public RearBumper(
        string id,
        int revision,
        double? shippingWeight,
        Color color)
        : base(id, revision, shippingWeight)
    {
        this.Color = color;
    }
}
```

{% /aside %}

[IceClass]: csharp:IceRpc.Ice.IceClass
