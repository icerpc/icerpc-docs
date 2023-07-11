---
title: Lexical rules
description: Learn about the lexical rules of Slice
---

## Comments

Slice definitions can contain several types of comments:

- [Doc comments](/slice2/language-guide/doc-comments): Begins with exactly `///` and extends to the end of the line.
  They are used by the compiler to generate documentation in the mapped language.
- Non-doc line comments: Begins with `//` and extends to the end of the line. They are ignored by the compiler.
- Non-doc block comments: Begins with `/*`, ends with `*/`, and can span multiple lines. They are ignored by the compiler.

A comment that begins with more than three slashes is treated as a non-doc comment.

```slice

// This is a non-doc comment
module Store

/// This is a doc comment
interface Customer  {
    // ...
}

/*
 * This is a non-doc block comment
 */
struct Order {
    // ...
}
```

## Identifiers

Identifiers consist of a sequence of one or more ASCII alphanumeric characters (`a-zA-Z0-9`) and underscores (`_`).
The first character can not be a number. Identifiers are used to name Slice definitions such as structs, fields, enums, etc.

## Case sensitivity

Slice keywords and identifiers are case-sensitive. For example, `TimeOfDay` and `TIMEOFDAY` are
considered different identifiers.

## Using a keyword as an identifier

It is possible to use a Slice keyword as an identifier by prefixing the keyword with a backslash; for example:

```slice
struct dictionary {     // Error!
    // ...
}

struct \dictionary {    // OK
    // ...
}

struct \foo {           // Legal, same as "struct foo"
    // ...
}
```

It's best to avoid using Slice keywords as identifiers.
