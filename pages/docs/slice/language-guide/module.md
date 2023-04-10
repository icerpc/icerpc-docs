---
title: Module
description: Learn about Slice modules.
---

## Module basics

A module is a naming scope for Slice types. It allows you to define and reference different Slice types with the same
name, provided they are in different scopes (modules).

For example:
```slice {% title="AnimalKingdom.slice" addEncoding=true %}
module AnimalKingdom

compact struct Lion { ... } // in module AnimalKingdom
```

```slice {% title="Game.slice" addEncoding=true %}
module Game

interface Lion {
    getModel() -> AnimalKingdom::Lion
}
```

You can split the definitions within the same module into multiple Slice files.

##  Sub-module

A module can have sub-modules, sub-sub-modules etc. at any depth. Each level is separated by `::`. For example:
```slice {% addEncoding=true %}
module Res::Vacation

// definitions in the Vacation sub-module...

```

## C# mapping

A Slice module is mapped to a C# namespace with the same name. The C# definitions in the mapped namespace can end up
in one or multiple assemblies.

You can customize this mapping with the `cs::namespace` attribute and remap the module to the specified namespace.
For example:

{% side-by-side alignment="top" %}
```slice {% addEncoding=true %}
[cs::namespace("Reservation.Bundles")]
module Res::Vacation
...
```

```csharp
namespace Reservation.Bundles;
...
```
{% /side-by-side %}
