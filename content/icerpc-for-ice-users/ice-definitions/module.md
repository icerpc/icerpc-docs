---
title: Module
description: Learn how Ice modules are mapped to C#
---

An Ice module maps to a C# namespace with the same name converted to Pascal case.

The mapping preserves the nesting of the Ice definitions. For example:

{% aside alignment="top" %}

```ice
module M1::M2
{
    // ...
}

// ...

// Reopen M1
module M1
{
    // ...
}
```

```csharp
namespace M1.M2
{
    // ...
}

// ...

// Reopen M1
namespace M1
{
    // ...
}
```

{% /aside %}

## Custom mapping

The metadata directive [`"cs:identifier"`][cs-identifier] allows you to map a module to a C# namespace or sub-namespace
of your choice. For example:

```ice
// module Time becomes namespace Remote.Clock in C#.
["cs:identifier:Remote.Clock"]
module Time
{
    // ...
}
```

You can only use `"cs:identifier"` on a module with a simple name: this metadata directive is not compatible with the
nested module syntax.

[cs-identifier]: https://docs.zeroc.com/ice/3.8/csharp/slice-metadata-directives#SliceMetadataDirectives-cs:identifier:csharp-identifier
