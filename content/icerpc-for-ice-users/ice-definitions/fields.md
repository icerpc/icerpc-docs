---
title: Fields
description: Learn how Ice fields are mapped to C#
---

An Ice field maps to a C# property with the same name converted to Pascal case. You can customize this C# name with the
`"cs:identifier"`[cs-identifier] metadata directive.

The type of the C# field is the mapped Ice type; this C# type is nullable for proxies and classes.

For example:

```ice
class Address { ... }

struct Person
{
    string name;
    Address address;
}
```

maps to:

```csharp
public record struct Person
{
    public required string Name { get; set; } // Ice string maps to C# string
    public Address? Address { get; set; }     // Ice Address maps to nullable C# Address
    ...
}
```

## Optional fields

An optional field maps to a C# field with the same name converted to Pascal case. The mapped field's type is nullable,
and the tag value is not mapped to C#.

For example:

```ice
class C
{
    optional(2) string alternateName;
    optional(5) int overrideCode;
    optional(1) Widget* favoriteWidgetProxy;
}
```

maps to:

```csharp
public partial class C : IceClass
{
    public string? AlternateName { get; set; }
    public int? OverrideCode { get; set; }
    public WidgetProxy? FavoriteWidgetProxy { get; set; }
    ...
}
```

Optional and non-optional proxies are mapped the same way, as illustrated above. As a result, you cannot distinguish
between an optional proxy field that is not set and an optional proxy field set to null.

## Required properties

A non-optional Ice field with type string, sequence, or dictionary, is mapped to a required property, unless this field
has a default value.

## Default values

Ice default values map to default values in C#. For example:

```ice
struct Location
{
    string name;
    Point point;
    bool display = true;
    string source = "GPS";
}
```

maps to:

```csharp
public record struct Location
{
    public required string Name { get; set; }
    public Point Point { get; set; }
    public bool Display { get; set; } = true;
    public string Source { get; set; } = "GPS";
    ...
}
```

[cs-identifier]: https://docs.zeroc.com/ice/3.8/csharp/slice-metadata-directives#SliceMetadataDirectives-cs:identifier:csharp-identifier
