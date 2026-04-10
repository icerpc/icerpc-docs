---
title: Struct types
description: Learn how to define and use structs in Slice.
---

## Composite type

A struct is a user-defined type that holds a list of [fields](fields). For example:

```slice
enum StateAbbreviation : uint8 { AL, AK, AZ, AR, AS, WY }

struct PostalAddress {
    recipientFullName: string
    streetAddress1: string
    streetAddress2: string?
    city: string
    state: StateAbbreviation
    zip: string
}
```

## Tagged fields

The fields of a struct can be regular fields (like the fields shown earlier) or [tagged fields][tagged-fields].

## Compact struct

A compact struct is a struct that cannot have tagged fields--unlike a regular struct, it cannot be augmented without
breaking on the wire compatibility.

For example:

```slice
compact struct BytePair { first: uint8, second: uint8 }
```

The encoding of a compact struct is slightly more compact than the encoding of a regular struct: `compact` saves one
byte per instance.

## C# mapping

A Slice struct maps to an internal C# record struct with the same name. For example:

{% aside alignment="top" %}

```slice
struct PostalAddress {
    recipientFullName: string
    streetAddress1: string
    streetAddress2: string?
    tag(1) streetAddress3: string?
    city: string
    state: StateAbbreviation
    zip: string
}
```

```csharp
internal partial record struct PostalAddress
{
    internal required string RecipientFullName { get; set; }
    internal required string StreetAddress1 { get; set; }
    internal string? StreetAddress2 { get; set; }
    internal string? StreetAddress3 { get; set; }
    internal required string City { get; set; }
    internal StateAbbreviation State { get; set; }
    internal required string Zip { get; set; }

    // Primary constructor.
    [SetsRequiredMembers]
    internal PostalAddress(
        string recipientFullName,
        string streetAddress1,
        string? streetAddress2,
        string? streetAddress3,
        string city,
        StateAbbreviation state,
        string zip)
    {
        this.RecipientFullName = recipientFullName;
        this.StreetAddress1 = streetAddress1;
        this.StreetAddress2 = streetAddress2;
        this.StreetAddress3 = streetAddress3;
        this.City = city;
        this.State = state;
        this.Zip = zip;
    }

    // Decoding constructor.
    internal PostalAddress(ref SliceDecoder decoder)
    {
        ...
    }

    // Encodes this struct.
    internal readonly void Encode(ref SliceEncoder encoder)
    {
        ...
    }
}
```

{% /aside %}

The mapped C# record struct provides a primary constructor with parameters for all its fields, and also a decoding
constructor that constructs a new instance by decoding its fields from a [SliceDecoder]. The generated `Encode` method
encodes the struct fields with a [SliceEncoder].

### cs::readonly attribute

You can map a Slice struct to a readonly C# struct with the `cs::readonly` [attribute](attributes). This attribute does
not accept any argument. For example:

{% aside alignment="top" %}

```slice
[cs::readonly]
compact struct Point { x: int32, y: int32 }
```

```csharp
internal readonly partial record struct Point
{
    internal int X { get; init; }
    internal int Y { get; init; }

    ...
}
```

{% /aside %}

You can also apply `cs::readonly` to a struct field to map this field to a get-init property.

[tagged-fields]: fields#tagged-fields

[SliceEncoder]: csharp:ZeroC.Slice.SliceEncoder
[SliceDecoder]: csharp:ZeroC.Slice.SliceDecoder
