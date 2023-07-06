---
title: Preprocessor directives
description: Learn about the Slice preprocessor.
---

The Slice compiler contains a [preprocessor](https://en.wikipedia.org/wiki/Preprocessor) that processes Slice files
before they're parsed. The preprocessor is line-based, which means that it operates on the source
code one line at a time.

## Symbols

Preprocessor symbols are [identifiers](./lexical-rules#identifiers) that can be defined and undefined by the
preprocessor. Unlike C/C++, preprocessor symbols can not be assigned a value. Instead, preprocessor symbols are either
defined or undefined.

If a symbol has not been defined, then it is considered undefined. There is no difference between a symbol that has not
been defined and a symbol that has been explicitly undefined. It is safe to define an already defined symbol or undefine an
undefined symbol.

It is recommended to use [SCREAMING_SNAKE_CASE](https://en.wikipedia.org/wiki/Snake_case) for preprocessor symbols,
e.g. `#define DEBUG`. Like other Slice
identifiers, preprocessor symbols are case sensitive.

## Syntax

The preprocessor is not a full-blown programming language, but it supports a number of directives that can be used
to control the preprocessor's behavior. Preprocessor directives must be the first non-whitespace characters on a line,
can not span multiple lines, and may be nested inside other preprocessor directives.

Preprocessor directives are:

- `#define <SYMBOL>` - Define a symbol.
- `#undef <SYMBOL>` - Undefine a symbol.
- `#if <SYMBOL>` - Open a conditional block if the given symbol is defined.
- `#elif <SYMBOL>` - Close the previous conditional block and open a new one if the given symbol is defined.
- `#else` - Close the previous conditional block and open a new one.
- `#endif` - Close the previous conditional block.

The `#if` and `#elif` statements support several logical operators and parentheses:

- `&&` - Logical AND
- `||` - Logical OR
- `!` - Logical NOT
- `(` and `)` - Parentheses to group expressions

## Defining symbols

A symbol can be defined by using the `#define` directive in a Slice file. The symbol will be defined for the
remainder of the Slice file.

```slice
#define ABC
```

### Predefined symbols

Slice does not define any symbols by default. However, an individual Slice language compiler may wish to define
symbols to indicate the target language.

## Examples

Conditional compilation:
```slice
// Define symbol FOO
#define FOO

// Undefine symbol BAR
#undef BAR

#if FOO
    // Everything here will be compiled.
    // ...
#elif BAR
    // Everything here will be ignored.
    // ...
#else
    // Everything here will be ignored.
    // ...
#endif
```

Nested conditional compilation:

```slice
#define FOO
#define BAR

#if FOO
    #if BAR
        // Everything here will be compiled.
        // ...
    #endif

     // Undefine BAR
    #undef BAR
    #if BAR
        // Everything here will be ignored.
        // ...
    #endif
    // ...
#endif

```

Logical operators and parentheses:

```slice

#define FOO
#define BAR
#undef BAZ

#if (FOO || BAZ) && BAR
    // Everything here will be compiled.
    // ...
#endif

#if !BAZ
    // Everything here will be compiled.
    // ...
#endif

```
