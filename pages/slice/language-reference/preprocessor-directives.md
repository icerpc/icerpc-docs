---
title: Preprocessor directives
---

The preprocessor only operates on lines beginning with a `#` character (ignoring any leading whitespace). These lines
are called _preprocessor directives_.

## Lexical grammar

Lines which do not match a preprocessor directive are mapped to `source_block` tokens in the lexical grammar.
The contents of these `source_block` tokens are passed as input to the main grammar.

```ebnf {% showTitle=false %}
// These are opaque strings that exist outside of the preprocessor directive grammar.
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

## Syntactic grammar {% #preprocessor-syntactic-grammar %}

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
