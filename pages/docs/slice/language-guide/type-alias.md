---
title: Type alias
description: Understand how to create an alias for a Slice type.
---

## New name for an existing type

You can use a `typealias` to give a new name to an existing type or typealias. For example:

```slice {% addEncoding=true %}
// Greeting is now another name for string
typealias Greeting = string
```

It is common to create a typealias to shorten a type with one or more attributes. For example:

```slice
typealias StringList = [cs::generic("List")] sequence<string>
```

## C# mapping

A typealias is not mapped to anything in C#. The Slice compiler generates code as if the typealias was replaced by its
underlying type (including [attributes](attributes), if any).
