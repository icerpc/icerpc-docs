---
title: Preprocessor directives
description: Learn about the Slice preprocessor.
---

The Slice compiler contains a [preprocessor] that can be used to [conditionally compile] parts of a Slice file.

## Defining symbols

A _symbol_ is a boolean variable that can be used by the preprocessor.
But, instead of directly assigning values to them (like you would in C/C++), symbols can only ever be defined or undefined:

```slice
#define FOO // defines a symbol named `FOO`.
#undef FOO  // undefines a symbol named `FOO`.
```

{% callout type="note" %}
By convention, symbols should use [SCREAMING_SNAKE_CASE] to distinguish them from other identifiers.
{% /callout %}

A symbol is considered `true` if it is defined, and `false` if it is undefined.
There is no difference between a symbol that hasn't been defined, and one that has been explicitly undefined.
Additionally, it is safe to define a symbol that is already defined, or to undefine a symbol that is undefined, though doing so has no effect.

## Conditional compilation

Conditional compilation allows you to include or omit sections of your Slice file at compile time, based on a set of boolean expressions.

It works just like a standard if-elif-else statement, but uses preprocessor directives:

```slice
#if <EXPRESSION_1>
    // code in between these will only be compiled if EXPRESSION_1 is `true`.
#elif <EXPRESSION_2>
    // code in between these will only be compiled if EXPRESSION_1 is `false` and EXPRESSION_2 is `true`.
#else
    // code in between these will only be compiled if both EXPRESSION_1 and EXPRESSION_2 are `false`.
#endif
```

Whereas normally, only a single section of a conditional statement will be executed, only a single block of this conditional compilation section will be compiled.
Each block can contain anything inside them - Slice definitions, preprocessor directives, and even other conditional compilation blocks:

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
#if FOO && !(BAR || BAZ)
    //...
#elif BAR && BAZ
    //...
#endif
```

[preprocessor]: https://en.wikipedia.org/wiki/Preprocessor
[conditionally compile]: https://en.wikipedia.org/wiki/Conditional_compilation
[SCREAMING_SNAKE_CASE]: https://en.wikipedia.org/wiki/Snake_case
