---
title: Lexical Rules
description: Learn about the lexical rules of Slice
---

## Comments

Slice definitions can contain two types comments:

- [Doc comments](/docs/slice/language-guide/doc-comments): begin with `///` and extend to the end of the line. They are used by the compiler to
  generate documentation in the mapped language.
- Non-doc comments: begin with `//` and extend to the end of the line. They are ignored by the compiler.

```slice

// This is a non-doc comment
module Store

/// This is a doc comment
interface Customer  {
    // ...
}

```

## Identifiers

Identifiers consist of a sequence of one or more ASCII alphanumeric characters (`a-zA-Z0-9`) and underscores (`_`) .
The first character can not be a number. Identifiers are used to name Slice types such as structs, fields, enums, etc.

## Case Sensitivity

Slice keywords and identifiers are case-sensitive. For example, `TimeOfDay` and `TIMEOFDAY` are
considered different identifiers within a naming scope.

## Identifiers That Are Programming Language Keywords

You can define Slice identifiers that are keywords in C#. For example, `switch` is a
perfectly good Slice identifier but is a C# keyword. The `slicec-cs` compiler performs keyword escaping by
prefixing the keyword with an `@` character. Thus `switch` is mapped to `@switch` in C#.

The rules for dealing with keywords can result in hard-to-read source code. To make life easier for yourself and others,
try to avoid Slice identifiers that are implementation language keywords.

## Escaping Slice Identifiers

It is possible to use a Slice keyword as an identifier by prefixing the keyword with a backslash, for example:

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

As mentioned in the previous section, it's best to avoid using Slice keywords as identifiers.
