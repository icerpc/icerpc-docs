---
title: Preprocessor directives
description: Learn about the Slice preprocessor.
---

The Slice compiler contains a [preprocessor](https://en.wikipedia.org/wiki/Preprocessor) that can be used to [conditionally compile](https://en.wikipedia.org/wiki/Conditional_compilation) parts of a Slice file.

## Defining Symbols

A _symbol_ is a boolean variable that can be used by the preprocessor.
But, instead of directly assigning values to them (like you would in C/C++), symbols can only ever be _defined_ or _undefined_:

```slice
#define FOO // defines a symbol named `FOO`.
#undef FOO  // undefines a symbol named `FOO`.
```

{% callout type="note" %}
By convention, symbols should use [SCREAMING_SNAKE_CASE](https://en.wikipedia.org/wiki/Snake_case) to distinguish them from other identifiers.
{% /callout %}

A symbol is considered `true` if it is defined, and `false` if it is undefined.
There is no difference between a symbol that hasn't been defined, and one that has been explicitly undefined.
Additionally, it is safe to define a symbol that is already defined, or to undefine a symbol that is undefined, though doing so has no effect.

## Conditional Compilation

Conditional compilation allows sections of a Slice file to be conditionally included or excluded from compilation, based on a set of boolean expressions.

The preprocessor provides 4 directives for controlling this, that use a syntax similar to conditional blocks:

```slice
#if <EXPRESSION_1>
    // code in between these will only be compiled if EXPRESSION_1 is `true`.
#elif <EXPRESSION_2>
    // code in between these will only be compiled if EXPRESSION_1 is `false` and EXPRESSION_2 is `true`.
#else
    // code in between these will only be compiled if both EXPRESSION_1 and EXPRESSION_2 are `false`.
#endif
```

The `#if` and `#endif` directives are required for conditional compilation and respectively mark the start/end of the block. You can have 0 or more `#elif` directives, and either 0 or 1 `#else` directives. They must appear in the above specified order.

At most one section from the block will be included in compilation.
The preprocessor checks the expressions in order, and will include the section under the first directive who's expression evaluates to `true`.
If none of the expressions evaluate to `true` and an `#else` section is present, the `#else` section is included. Otherwise all sections are excluded.

These directives can be arbitrarily nested inside one another:

```slice
#if FOO
    //...
    #if BAR
        //...
    #else
        //...
    #endif
#endif
```
{% callout type="note" %}
Indentation is not required to nest directives, but is recommended to improve readability.
{% /callout %}

The `#if` and `#elif` directives require a boolean expression that the preprocessor can check during compilation. These expressions can consist of symbols (which the preprocessor will transform into boolean values) and the following boolean operators:
- `!` - Logical NOT
- `&&` - Logical AND
- `||` - Logical OR
- `(` and `)` - Parentheses to group expressions

```slice
#if SLICEC_CS && !(MAC_OS || UNIX)
    // Only included when running `slicec-cs` on platforms that are not MacOS or Unix.
#elif SLICEC_RS && WINDOWS
    // Only included when running `slicec-rs` on windows platforms.
#endif
```
