---
title: Module
description: Learn about Slice modules.
---

## Module basics

A module is a naming scope for Slice types. It allows you to define and reference different Slice types with the same
name, provided they are in different scopes (modules).

Slice uses `::` as its [scope resolution operator][scope-resolution-operator].

For example:

```slice {% title="AnimalKingdom.slice" addMode=true %}
module AnimalKingdom

compact struct Lion { ... } // in module AnimalKingdom
```

```slice {% title="Game.slice" addMode=true %}
module Game

interface Lion {
    getModel() -> AnimalKingdom::Lion
}
```

You can split the definitions within the same module into multiple Slice files.

## Sub-module

A module can have sub-modules, sub-sub-modules etc. at any depth. Each level is separated by `::`. For example:

```slice {% addMode=true %}
module Res::Vacation

// definitions in the Vacation sub-module...

```

## C# mapping

A Slice module is mapped to a C# namespace with the same name converted to Pascal case.

You can customize this mapping with the `cs::namespace` [attribute](attributes) and remap the module to the specified
namespace. This attribute accepts a single string argument: the name of the C# namespace.

For example:

{% side-by-side alignment="top" %}

```slice {% addMode=true %}
[cs::namespace("Reservation.Bundles")]
module Res::Vacation
...
```

```csharp
namespace Reservation.Bundles;
...
```

{% /side-by-side %}

[scope-resolution-operator]: https://en.wikipedia.org/wiki/Scope_resolution_operator
