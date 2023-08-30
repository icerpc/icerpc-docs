---
title: Documentation comments
---

Slice comments that start with `///` are documentation (doc) comments. Slice doc comments can be attached to all Slice
elements except parameter declarations, module declarations, and mode statements.

## Lexical grammar

```ebnf {% showTitle=false %}
identifier: LETTER ALPHANUMERIC*;
text: CHARACTER+;

newline: "\n";

// Tag keywords
param_keyword:   "@param";
returns_keyword: "@returns";
throws_keyword:  "@throws";
see_keyword:     "@see";
link_keyword:    "@link";

// Symbols
left_brace:   "{";
right_brace:  "}";
colon:        ":";
double_colon: "::";
```

## Syntactic grammar

```ebnf {% showTitle=false %}
DocComment
    : Overview?
    | DocComment ParamBlock
    | DocComment ReturnsBlock
    | DocComment ThrowsBlock
    | DocComment SeeBlock
    ;

Overview
    : MessageLines
    ;

ParamBlock
    : param_keyword identifier Section
    ;

ReturnsBlock
    : returns_keyword identifier? Section
    ;

ThrowsBlock
    : throws_keyword identifier Section
    ;

SeeBlock
    : see_keyword ScopedIdentifier newline
    ;

InlineLink
    : link_keyword ScopedIdentifier
    ;

Section
    : (colon Message?)? newline MessageLines?
    ;

MessageLines
    : (Message? newline)+
    ;

Message
    : MessageComponent+
    ;

MessageComponent
    : text
    | left_brace InlineLink right_brace
    ;

ScopedIdentifier
    : double_colon? identifier (double_colon identifier)*
    ;
```
