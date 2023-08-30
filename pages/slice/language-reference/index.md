---
title: Language reference
---

<!-- cspell:words ANTLR NAUR -->

The language reference contains a technical reference for the Slice language.

Slice consists of three sub-languages:

- A core Slice language for defining types and contracts
- A preprocessing language for conditional compilation
- A language for describing definitions with doc-comments

Each of these sub-languages are in turn specified by a set of two [context-free grammars](https://en.wikipedia.org/wiki/Context-free_grammar):

- _Lexical grammars_ specify how Unicode characters are combined to form basic tokens and
- _syntactic grammars_ specify how tokens produced by the lexical grammar are combined to form full expressions.

Context-free grammars consist of a set of _symbols_ and _productions_.
Symbols are abstract elements of the language that can represent anything from single characters to entire expressions.
Productions are sets of rules that specify how symbols can be combined to produce other symbols.

## Grammar notation

This language reference defines grammars through their productions. These productions are written using ANTLR's
version of [Extended Backus-Naur Form](https://en.wikipedia.org/wiki/Extended_Backus%E2%80%93Naur_form#EBNF).

Productions start with the symbol they produce, followed by a colon.
This is then followed by a set of rules separated by vertical bars, and finally a semicolon to finish the production.
For productions with multiple rules, each rule is matched independently of any others.
Additionally, the order of rules is arbitrary and doesn't imply any level of precedence.

Rules are defined by a sequence of one or more symbols. For a rule to match, all its symbols must match, in the order
they're specified.By default a symbol is matched a single time, but this is modified by the following characters:

- `?` : match this symbol 0 or 1 times
- `*` : match this symbol 0 or more times
- `+` : match this symbol 1 or more times

Additionally, symbols can be grouped into sub-rules using parenthesis: `(symbol1+ symbol2)?`.
These sub-rules function the same as rules: their contents must be matched fully, and in order.

## Symbol conventions

Symbols produced by lexical grammars are written in `snake_case` and symbols produced by syntactic grammars are
written in `PascalCase`.

We define several convenience symbols that exist only to improve readability and do not necessarily appear within
actual implementations. These convenience tokens are written in `SCREAMING_SNAKE_CASE` and are defined by the
following regular expressions:

```ebnf {% showTitle=false %}
LETTER: "[a-zA-Z]";
DIGIT:  "[0-9]";
ALPHANUMERIC: "[_a-zA-Z0-9]";

CHARACTER: "[^\n]";

NON_DOUBLE_QUOTE_CHARACTER:  "[^\n\"]";
NON_FORWARD_SLASH_CHARACTER: "[^\n\/]";
```

Additionally, some rules consist of zero symbols, meaning that they match exactly nothing.
For the sake of readability, we explicitly state that they match `EMPTY`.
It is important to note that `EMPTY` is **not** a symbol, but a placeholder for the absence of symbols.
