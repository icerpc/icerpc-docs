---
title: Warnings
toc: false
---

{% title /%}

## W001

The user supplied either a reference or source file more than once.

## W002

The user-supplied doc comment indicated that the operation should contain a parameter that it does not have.

Erroneous code example:

```slice
module Foo;

interface I {
    /// @param x
    op() -> int32;
}

```

## W003

The user-supplied doc comment indicated that the operation should return a value, but the operation does not.

Erroneous code example:

```slice
module Foo;

interface I {
    /// @returns bool
    op();
}

```

## W004

The user-supplied doc comment indicated that the entity should throw, but the entity does not support throwing.

{% callout %}
FOo
Markdoc is open-source—check out its [source](http://github.com/markdoc/markdoc) to see how it works.
{% /callout %}
Erroneous code example:

```slice
module Foo;

/// @throws When something goes wrong.
struct S {};
```

## W005

The user-supplied doc comment link referenced an entity that does not exist.

Erroneous code example:

```slice
module Foo;

/// @see X Message about thing.
interface I {};
```

## W006

The user-supplied doc comment tag is invalid.

Erroneous code example:

```slice
module Foo;

/// @invalid
interface I {};
```

## W007

The code references a Slice entity that is deprecated.

Erroneous code example:

```slice
module Foo;

/// @deprecated
struct S {};

interface I {
    op() -> S; // Usage of deprecated entity.
}
```

## W008

The user applied an attribute on a type that will result in no changes.

Erroneous code example:

```slice
module Foo;

[cs::identifier(\"Foo\")]
typealias S = int32;
```
