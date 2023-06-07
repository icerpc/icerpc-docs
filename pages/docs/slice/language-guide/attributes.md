---
title: Attributes
description: Learn how to define and use Slice attributes.
---

## Customize your definitions

A Slice attribute allows you to customize some aspect of your Slice definitions without changing the contract with the
peer.

For example, you can map a Slice struct to a read-only C# record struct with the `[cs::readonly]` attribute. The
addition of the `readonly` keyword to your C# struct has no effect whatsoever on the data transmitted over the wire.

Adding or removing an attribute to the Slice definitions of your client application has no effect on an unmodified
server application, and vice-versa.

An attribute is enclosed in square brackets just before the construct it applies to. For example:
```slice
[cs::readonly] // a struct attribute
compact struct FooFighter {
    sighting: Coordinates
}

[deprecated("Use Bar instead")] // an interface attribute
interface Foo {
    [oneway] doIt() // an operation attribute
}
```

You can also define a file-level attribute with double square brackets. A file-level attribute is a shortcut to apply
this attribute to all definitions in the file that accept this attribute. For example:
```slice

// The Slice compiler won't emit a warning when a Slice definition
// in this file references a deprecated type.
[[allow(Deprecated)]]

module SampleModule
...
```

## Shared attributes

The following attributes are available in all language mappings:

| Attribute                             | Applies to               | Description                                                                             |
|---------------------------------------|--------------------------|-----------------------------------------------------------------------------------------|
| [`allow`](#allow-attribute)           | Interfaces, operations, parameters, constructed types, fields, enumerators | Suppress warnings during compilation. |
| [`compress`][compress]                | Operations               | Request compression from the local compress interceptor or middleware.                  |
| [`deprecated`](#deprecated-attribute) | Interfaces, operations, constructed types, fields, enumerators | Mark as deprecated.                               |
| [`oneway`][oneway]                    | Operations               | Create one-way requests for this operation (client-side only).                          |
| [`slicedFormat`][sliced-format]       | Operations (Slice1 only) | Encode the operation arguments or return value in Sliced format.                        |

### allow attribute

The allow attribute tells the Slice compiler to not emit warnings in situations where it would normally emit warnings.
It accepts one or more of the following arguments:

| Argument            | Description                                                                                              |
|---------------------|----------------------------------------------------------------------------------------------------------|
| All                 | Do not emit any warning that can be suppressed.                                                          |
| BrokenDocLink       | Do not emit a warning when a doc-comment link references an unknown Slice construct.                     |
| Deprecated          | Do not emit a warning when referencing a deprecated type.                                                |
| IncorrectDocComment | Do not emit a warning for a doc-comment that is syntactically correct but contains a logic error.        |
| MalformedDocComment | Do not emit a warning for doc-comments that are syntactically incorrect (as per the doc-comment syntax). |

`allow` can be specified as a regular attribute and as a file-level attribute. For example:

```slice
[deprecated("Use Associate instead.")]
compact struct Employee {
    name: string
    phoneNumber: string
}

interface CompanyDirectory {
    [allow(Deprecated)]
    [deprecated("Call lookupAssociate instead.")]
    lookupEmployee(name: string) -> Employee

    lookupAssociate(name: string) -> Associate
}
```

### deprecated attribute

The deprecated attribute marks a Slice definition as deprecated, and accepts an optional string argument. It has two
separate purposes:
- make the Slice compiler emit a warning when some other Slice definition references a deprecated type
- when possible, generate a comparable deprecated attribute on the mapped construct

See [allow attribute](#allow-attribute) above for an example.

## C# attributes

The following attributes are specific to the C# mapping. They all start with the `cs::` suffix.

| Attribute                                    | Applies to                         | Description                                                      |
|----------------------------------------------|------------------------------------|------------------------------------------------------------------|
| [`cs::attribute`](#cs-attribute-attribute)   | Enum types, enumerators and fields | Add the specified C# attribute to the mapped C# enum, enum member or field. |
| [`cs::custom`][cs-custom]                    | Custom types                       | Specify the mapped C# type.                                      |
| [`cs::encodeReturn`][cs-encoded-return]      | Operations                         | Return an already encoded return value (server-side only).       |
| `cs::generic`                                | [Sequences][sequence-generic] and [dictionaries][dictionary-generic] | Customize the sequence and dictionary mapping. |
| [`cs::identifier`](#cs-identifier-attribute) | Interfaces, operations, parameters, constructed types, fields, enumerators | Change the name of the mapped C# identifier. |
| [`cs::internal`](#cs-internal-attribute)     | Interfaces, constructed types      | Map to an internal C# type instead of a public C# type. |
| [`cs::namespace`][cs-namespace]              | Modules                            | Change the name of the mapped C# namespace. |
| [`cs::readonly`][cs-readonly]                | Structs and struct fields          | Adds `readonly` to the mapped C# struct or field. |

### cs::attribute attribute

The `cs::attribute` accepts a string, the attribute you want to generate. For example:

{% slice1 %}
{% side-by-side alignment="top" %}
```slice
[cs::attribute("Flags")]
enum MultiHue {
    None = 0,
    Black = 1,
    Red = 2,
    Green = 4,
    Blue = 8
}
```

```csharp
[Flags]
public enum MultiHue : int
{
    None = 0,

    Black = 1,

    Red = 2,

    Green = 4,

    Blue = 8,
}
```
{% /side-by-side %}
{% /slice1 %}

{% slice2 %}
{% side-by-side alignment="top" %}
```slice
[cs::attribute("Flags")]
enum MultiHue : uint8 {
    None = 0,
    Black = 1,
    Red = 2,
    Green = 4,
    Blue = 8
}
```

```csharp
[Flags]
public enum MultiHue : byte
{
    None = 0,

    Black = 1,

    Red = 2,

    Green = 4,

    Blue = 8,
}
```
{% /side-by-side %}
{% /slice2 %}

### cs::identifier attribute

The `cs::identifier` attribute specifies the exact mapped C# identifier you want as its argument. The Slice compiler
does not adjust the case of this identifier, but adds prefixes and suffixes as needed.

For example:

{% side-by-side alignment="top" %}
```slice {% addEncoding=true %}
[cs::identifier("RemoteEnumerator")]
interface Enumerator {
    ...
}
```

```csharp
public partial interface IRemoteEnumerator
{
    ...
}

public readonly partial record struct RemoteEnumeratorProxy : IRemoteEnumerator, IProxy
{
    ...
}

public partial interface IRemoteEnumeratorService
{
    ...
}
```
{% /side-by-side %}

### cs::internal attribute

The `cs::internal` attribute maps a Slice type to one or more internal C# types. It does not accept any argument.

[cs-custom]: custom-types
[cs-encoded-return]: operation
[cs-namespace]: module
[cs-readonly]: struct-types
[compress]: operation
[dictionary-generic]: dictionary-types
[oneway]: operation
[sequence-generic]: sequence-types
[sliced-format]: operation
