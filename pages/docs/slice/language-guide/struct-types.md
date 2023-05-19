---
title: Struct types
description: Learn how to define and use structs in Slice.
---

## A named tuple

A struct is a constructed data type that holds a list of fields. A struct has always at least one field. Each field
consists of a name (the field's name) followed by a colon and the field's type. For example:

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
All structs must be marked "compact" with Slice1.
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
{% /slice2 %}

The fields of a struct can be separated by commas or whitespace. For example:

{% slice1 %}
```slice
compact struct Point { x: int32, y: int32 }
```
{% /slice1 %}
{% slice2 %}
```slice
struct Point { x: int32, y: int32 }
```
{% /slice2 %}

{% slice2 %}
## Tagged fields

The fields of a struct can be regular fields (like the fields shown earlier) or tagged fields. A tagged field has a tag
number and an optional type, for example:

```slice
struct PostalAddress {
    recipientFullName: string
    streetAddress1: string
    streetAddress2: string?
    tag(1) streetAddress3: string? // must use optional type (with `?`)
    tag(2) poBox: int32?
    city: string
    state: StateAbbreviation
    zip: string
}
```

{% callout type="information" %}
A tag number is a positive integer, such as 0, 1, 77. The scope of a tag number is the enclosing struct.
{% /callout %}

A regular field is a mandatory field: it's always encoded by the sender and decoded by the recipient. If the sender and
recipient don't agree on the struct definition--their Slice definitions are not the same--the decoding of the enclosing
payload will fail.

On the other hand, a tagged field tolerates mismatches. The sender can send a tagged field that the recipient doesn't
know about (it will be ignored), and the recipient can expect a tagged field that the sender doesn't know (the recipient
will get a "not set" value).

{% callout type="information" %}
You can add and remove tagged fields over time while maintaining on the wire compatibility for your struct. The only
constraint is you can never change the type associated with a tag number. If the type associated with tag 7 is a string,
it must always remain a string; if you were to reuse tag 7 with another type, you would break on the wire compatibility
with applications that expect tag 7 fields to be encoded as strings.
{% /callout %}

## Compact struct

A compact struct is a struct that cannot have tagged fields--unlike a regular struct, it cannot be extended without
breaking on the wire compatibility.

The encoding of a compact struct is slightly more compact than the encoding of a regular struct: `compact` saves one
byte per instance.
{% /slice2 %}

## C# mapping

A Slice struct maps to a public C# record struct with the same name, and each Slice field maps to a public C# field with
the same name (converted to Pascal case).

{% slice2 %}
Regular fields and tagged fields are mapped the same way: you can't tell if a field is tagged or not by looking at the
API of the generated record struct.
{% /slice2 %}

For example:

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
compact struct PostalAddress {
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
constructor that  constructs a new instance by decoding its fields from a
[`SliceDecoder`](csharp:IceRpc.Slice.SliceDecoder). The generated `Encode` method encodes the struct fields with a
[`SliceEncoder`](csharp:IceRpc.Slice.SliceEncoder).
