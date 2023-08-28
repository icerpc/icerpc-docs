---
title: Preprocessor directives
---

The preprocessor is line-based, meaning it operates on source code one line at a time.
Only lines beginning with a `#` character (ignoring any leading whitespace) are resolved by the preprocessor. These lines are called _preprocessor directives_.
All preprocessor directives will of been removed from the source code when preprocessing is completed.

Preprocessor directives can not span multiple lines. Newline characters always mark the end of a directive.
Because of this, multi-line comments cannot start on the same line as a preprocessor directive, only single-line comments are supported on the same line as a preprocessor directive.

## Symbols

The preprocessor operates on each Slice file independently. This means whether or not a symbol is defined in one file has no effect on any other file.

Additionally, the scope of any symbol is its Slice file, ie. if you define a symbol it stays defined for the remainder of its Slice file (unless explicitly undefined). Whether or not it's nested inside other preprocessor directives makes no difference:

```slice
#if !FOO
    #define BAR // `BAR` is defined for the rest of the Slice file, not just in this block.
#endif
```

Like other Slice identifiers, preprocessor symbols are case sensitive:

```slice
#define foo
#if FOO
    // This section is excluded from compilation since `FOO` is undefined.
#endif
```

While not encouraged, Slice keywords can be used in preprocessor directives without escaping, as they aren't treated as keywords in these contexts.

## Grammar

The following 2 sections provide a formal specification for the grammar of preprocessor directives. For an explanation on how to read these specifications, click [here](../language-reference#grammar-notation).

### Lexical grammar

```ebnf {% showTitle=false %}
// These are opaque strings that exist outside of the preprocessor directive grammar.
// They correspond to lines not beginning with a `#` character.
source_block;

identifier: LETTER ALPHANUMERIC*;

// Directive keywords
define_keyword:    "#" "define";
undefined_keyword: "#" "undef";
if_keyword:        "#" "if";
elif_keyword:      "#" "elif";
else_keyword:      "#" "else";
endif_keyword:     "#" "endif";

directive_end: "\n";

// Operators
not: "!";
and: "&&";
or:  "||";

// Brackets
left_parenthesis:  "(";
right_parenthesis: ")";
```

### Syntactic grammar

```ebnf {% showTitle=false %}
SliceFile
    : Main*
    ;

BlockContent
    : Main*
    ;

Main
    : source_block
    | DefineDirective
    | UndefineDirective
    | ConditionalStatement
    ;

DefineDirective
    : define_keyword identifier directive_end
    ;

UndefineDirective
    : undefine_keyword identifier directive_end
    ;

IfDirective
    : if_keyword Expression directive_end
    ;

ElifDirective
    : elif_keyword Expression directive_end
    ;

ElseDirective
    : else_keyword directive_end
    ;

EndifDirective
    : endif_keyword directive_end
    ;

ConditionalStatement
    : (IfDirective BlockContent) (ElifDirective BlockContent)* (ElseDirective <BlockContent>)? EndifDirective
    ;

Expression
    : Term
    | not Term
    | Expression and Term
    | Expression or Term
    ;

Term
    : identifier
    | left_parenthesis Expression right_parenthesis
    ;
```
