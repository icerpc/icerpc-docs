---
title: Preprocessor
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
undefined symbol. Likewise, it is safe to define, undefine, then define a symbol again.

It is recommended to use upper-case letters for preprocessor symbols, e.g. `#define DEBUG`. Like other Slice
identifiers, preprocessor symbols are case sensitive.

## Syntax

The preprocessor is not a full-blown programming language, but it supports a number of directives that can be used
to control the preprocessor's behavior. Preprocessor directives must be the first non-whitespace characters on a line
and may be be nested.

Preprocessor directives are:

- `#define <SYMBOL>` - Define a symbol
- `#undef <SYMBOL>` - Undefine a symbol
- `#if <SYMBOL>` - Open a conditional compilation if the given symbol is defined.
- `#else` - Close the previous conditional compilation and open a new one.
- `#elif <SYMBOL>` - Close the previous conditional compilation and open a new one if the given symbol is defined.
- `#endif` - Close the previous conditional compilation.

The `#if` and `#elif` statements support several logical operators and parentheses:

- `&&` - Logical AND
- `||` - Logical OR
- `!` - Logical NOT
- `(` and `)` - Parentheses to group expressions

## Defining symbols

Symbols can be defined two ways:

- By using the `#define` directive in a Slice file. This symbol will be defined for the remainder of the Slice file.

    ```slice
    #define ABC
    ```

- By using the `-D` command-line option of the Slice compiler. The symbol will be defined for all Slice files.

    ```shell
    slicec-cs -D FOO -D BAR  ...
    ```

### Pre-defined symbols

The only pre-defined symbol is `SLICEC_CS`. It is defined by the Slice compiler for C# and is used to indicate that
the Slice compiler for C# is being used.

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

    // Everything here will be ignored.
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
