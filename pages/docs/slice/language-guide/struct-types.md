---
title: Struct types
description: Learn how to define and use structs in Slice.
---

## A named tuple

A struct is a constructed type that holds a list of [fields](parameters-and-fields). For example:

{% slice1 %}
```slice
enum StateAbbreviation { AL, AK, AZ, AR, AS ... WY }

compact struct PostalAddress {
    recipientFullName: string
    streetAddress1: string
    streetAddress2: string
    city: string
    state: StateAbbreviation
    zip: string
}
```

{% callout type="information" %}
All structs must be marked "compact" with Slice1. A compact struct cannot hold any [tagged field][tagged-fields].
{% /callout %}
{% /slice1 %}

{% slice2 %}
```slice
enum StateAbbreviation : uint8 { AL, AK, AZ, AR, AS ... WY }

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
{% /slice2 %}

## C# mapping

A Slice struct maps to a public C# record struct with the same name. For example:

{% slice1 %}
{% side-by-side alignment="top" %}
```slice
compact struct PostalAddress {
    recipientFullName: string
    streetAddress1: string
    streetAddress2: string
    city: string
    state: StateAbbreviation
    zip: string
}
```

```csharp
public partial record struct PostalAddress
{
    public string RecipientFullName;
    public string StreetAddress1;
    public string StreetAddress2;
    public string City;
    public StateAbbreviation State;
    public string Zip;

    // Primary constructor.
    public PostalAddress(
        string recipientFullName,
        string streetAddress1,
        string streetAddress2,
        string city,
        StateAbbreviation state,
        string zip)
    {
        ...
    }

    // Decoding constructor.
    public PostalAddress(ref SliceDecoder decoder)
    {
        ...
    }

    // Encodes this struct.
    public readonly void Encode(
        ref SliceEncoder encoder)
    {
        ...
    }
}
```
{% /side-by-side %}
{% /slice1 %}

{% slice2 %}
{% side-by-side alignment="top" %}
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
public partial record struct PostalAddress
{
    public string RecipientFullName;
    public string StreetAddress1;
    public string? StreetAddress2;
    public string? StreetAddress3; // tagged
    public string City;
    public StateAbbreviation State;
    public string Zip;

    // Primary constructor.
    public PostalAddress(
        string recipientFullName,
        string streetAddress1,
        string? streetAddress2,
        string? streetAddress3,
        string city,
        StateAbbreviation state,
        string zip)
    {
        ...
    }

    // Decoding constructor.
    public PostalAddress(ref SliceDecoder decoder)
    {
        ...
    }

    // Encodes this struct.
    public readonly void Encode(
        ref SliceEncoder encoder)
    {
        ...
    }
}
```
{% /side-by-side %}
{% /slice2 %}

The mapped C# record struct provides a primary constructor with parameters for all its fields, and also a decoding
constructor that constructs a new instance by decoding its fields from a
[`SliceDecoder`](csharp:IceRpc.Slice.SliceDecoder). The generated `Encode` method encodes the struct fields with a
[`SliceEncoder`](csharp:IceRpc.Slice.SliceEncoder).

[tagged-fields]: parameters-and-fields#tagged-parameters-and-fields
