---
title: Module
description: Learn about Slice modules.
---

## Module basics

A module is a naming scope for Slice types. It allows you to define and use Slice types with the same name, provided
they are in different scopes (modules).

For example:
```slice {% addEncoding=true %}
module BirdWatching

compact struct Crane { ... }
```

```slice {% addEncoding=true %}
module ConstructionEquipment

interface Crane { ... }
```
