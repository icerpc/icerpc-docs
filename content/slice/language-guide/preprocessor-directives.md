---
title: Preprocessor directives
description: Learn about the Slice preprocessor.
---

The Slice compiler contains a [preprocessor] that can be used to [conditionally compile] parts of a Slice file.

## Defining symbols

The Slice preprocessor relies on symbols that you define and undefine. The Slice preprocessor is much simpler than a
C/C++ preprocessor; in particular, you cannot assign a value to a Slice preprocessing symbol.

```slice
#define DEBUG // defines symbol DEBUG
#undef DEBUG  // undefines symbol DEBUG
```

{% callout type="note" %}
By convention, symbols should use [SCREAMING_SNAKE_CASE] to distinguish them from other identifiers.
{% /callout %}

When defined, a symbol evaluates to `true`, and when not defined, it evaluates to `false`.

There is no difference between a symbol that hasn't been defined, and one that has been explicitly undefined.
Additionally, it is safe to define a symbol that is already defined, or to undefine a symbol that is undefined, though
doing so has no effect.

## Conditional compilation

Conditional compilation allows you to include or omit sections of your Slice file at compile time, based on a set of
boolean expressions.

It works just like a standard if-elif-else statement, but uses preprocessor directives:

```slice
#if <EXPRESSION_1>
    // this code is compiled when EXPRESSION_1 evaluates to true.
#elif <EXPRESSION_2>
    // this code is compiled when EXPRESSION_1 evaluates to false and EXPRESSION_2 evaluates to true.
#else
    // this code is compiled when both EXPRESSION_1 and EXPRESSION_2 evaluate to false.
#endif
```

You can also nest preprocessor directives. For example:

```slice
#if FOO
    //...
    #define BAR
    #if BAZ
        //...
    #else
        //...
    #endif
#endif
```

{% callout type="note" %}
Indentation is not required when nesting directives, but is recommended to improve readability.
{% /callout %}

The `#if` and `#elif` directives require a boolean expression that the preprocessor evaluates. These expressions consist
of symbols (which evaluate to `true` or `false`) and the following boolean operators:

- `!` - Logical NOT
- `&&` - Logical AND
- `||` - Logical OR
- `(` and `)` - Parentheses to group expressions

For example:

```slice
#if FOO && !(BAR || BAZ)
    //...
#elif BAR && BAZ
    //...
#endif
```

[conditionally compile]: https://en.wikipedia.org/wiki/Conditional_compilation
[preprocessor]: https://en.wikipedia.org/wiki/Preprocessor
[SCREAMING_SNAKE_CASE]: https://en.wikipedia.org/wiki/Snake_case
