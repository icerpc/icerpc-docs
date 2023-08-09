---
title: Grammar specification
---

<!-- cspell:words ANTLR NAUR -->

This page describes the grammar of the Slice language.

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

The following sections define grammars through their productions.
These productions are written using ANTLR's version of [Extended Backus-Naur Form](https://en.wikipedia.org/wiki/Extended_Backus%E2%80%93Naur_form#EBNF).

Productions start with the symbol they produce, followed by a colon.
This is then followed by a set of rules separated by vertical bars, and finally a semicolon to finish the production.
For productions with multiple rules, each rule is matched independently of any others.
Additionally, the order of rules is arbitrary and doesn't imply any level of precedence.

Rules are defined by a sequence of one or more symbols. For a rule to match, all its symbols must match, in the order they're specified.
By default a symbol is matched a single time, but this is modified by the following characters:

- `?` : match this symbol 0 or 1 times
- `*` : match this symbol 0 or more times
- `+` : match this symbol 1 or more times

Additionally, symbols can be grouped into sub-rules using parenthesis: `(symbol1+ symbol2)?`.
These sub-rules function the same as rules: their contents must be matched fully, and in order.

## Symbol conventions

Symbols produced by lexical grammars are written in `snake_case` and symbols produced by syntactic grammars are written in `PascalCase`.

This specification defines and references a set of 'convenience' symbols that exist only to simplify the specification and do not necessarily appear within actual implementations.
These convenience tokens are written in `SCREAMING_SNAKE_CASE` and are defined by the following regular expressions:

```ebnf {% showTitle=false %}
LETTER: "[a-zA-Z]";
DIGIT:  "[0-9]";
ALPHANUMERIC: "[_a-zA-Z0-9]";

CHARACTER: "[^\n]";

NON_DOUBLE_QUOTE_CHARACTER:  "[^\n\"]";
NON_FORWARD_SLASH_CHARACTER: "[^\n\/]";
```

Additionally, some rules consist of zero symbols, meaning that they match exactly nothing.
For the sake of readability, this specification explicitly states that they match `EMPTY`.
It is important to note that `EMPTY` is **not** a symbol, but a placeholder for the absence of symbols.

## Core language

### Lexical grammar {% #core-lexical-grammar %}

This lexical grammar is not strictly context-free due to the following behavior:

When a compliant lexer has seen a '[' character and hasn't encountered a ']' since the '[',
it must prioritize producing `identifier` symbols over other symbols.
This allows attribute directives and arguments to accept strings that would normally produce keyword tokens.
While context dependent, this behavior is still unambiguous, since keywords cannot validly appear in attributes.

```ebnf {% showTitle=false %}
identifier: "\\"? LETTER ALPHANUMERIC*;

integer_literal: DIGIT ALPHANUMERIC*;

string_literal: "\"" (NON_DOUBLE_QUOTE_CHARACTER | ("\\" CHARACTER))* "\"";

doc_comment: "///" (NON_FORWARD_SLASH_CHARACTER CHARACTER*)? "\n";

// Definition keywords
module_keyword:     "module";
struct_keyword:     "struct";
exception_keyword:  "exception";
class_keyword:      "class";
interface_keyword:  "interface";
enum_keyword:       "enum";
custom_keyword:     "custom";
type_alias_keyword: "typealias";

// Collection Keywords
sequence_keyword:   "sequence";
dictionary_keyword: "dictionary";

// Primitive type keywords
bool_keyword:      "bool";
int8_keyword:      "int8";
uint8_keyword:     "uint8";
int16_keyword:     "int16";
uint16_keyword:    "uint16";
int32_keyword:     "int32";
uint32_keyword:    "uint32";
varint32_keyword:  "varint32";
varuint32_keyword: "varuint32";
int64_keyword:     "int64";
uint64_keyword:    "uint64";
varint62_keyword:  "varint62";
varuint62_keyword: "varuint62";
float32_keyword:   "float32";
float64_keyword:   "float64";
string_keyword:    "string";
any_class_keyword: "AnyClass";

// Other keywords
compact_keyword:       "compact";
idempotent_keyword:    "idempotent";
mode_keyword:          "mode";
stream_keyword:        "stream";
tag_keyword:           "tag";
throws_keyword:        "throws";
unchecked_keyword:     "unchecked";

// Brackets
left_parenthesis:     "(";
right_parenthesis:    ")";
left_bracket:         "[";
right_bracket:        "]";
double_left_bracket:  "[[";
double_right_bracket: "]]";
left_brace:           "{";
right_brace:          "}";
left_chevron:         "<";
right_chevron:        ">";

// Symbols
comma:         ",";
colon:         ":";
double_colon:  "::";
equals:        "=";
question_mark: "?";
arrow:         "->";
minus:         "-";
```

### Syntactic grammar {% #core-syntactic-grammar %}

```ebnf {% showTitle=false %}
SliceFile
    : SliceFilePrelude Module? Definition*
    ;

SliceFilePrelude
    : EMPTY
    | SliceFilePrelude FileCompilationMode
    | SliceFilePrelude FileAttribute
    ;

FileCompilationMode
    : mode_keyword equals identifier
    ;

Module
    : Prelude module_keyword RelativelyScopedIdentifier
    ;

Definition
    : Struct
    | Exception
    | Class
    | Interface
    | Enum
    | CustomType
    | TypeAlias
    ;

Struct
    : Prelude compact_keyword? struct_keyword identifier left_brace UndelimitedList<Field> right_brace
    ;

Exception
    : Prelude exception_keyword identifier (colon TypeRef)? left_brace UndelimitedList<Field> right_brace
    ;

Class
    : Prelude class_keyword identifier CompactId? (colon TypeRef)? left_brace UndelimitedList<Field> right_brace
    ;

Field
    : Prelude Tag? identifier colon TypeRef
    ;

Interface
    : Prelude interface_keyword identifier (colon NonEmptyCommaList<TypeRef>)? left_brace Operation* right_brace
    ;

Operation
    : Prelude idempotent_keyword? identifier left_parenthesis UndelimitedList<Parameter> right_parenthesis (arrow ReturnType)? ExceptionSpecification?
    ;

Parameter
    : Prelude Tag? identifier colon stream_keyword? TypeRef
    ;

ReturnType
    : Tag? stream_keyword? TypeRef
    | left_parenthesis UndelimitedList<Parameter> right_parenthesis
    ;

ExceptionSpecification
    : throws_keyword TypeRef
    | throws_keyword left_parenthesis NonEmptyCommaList<TypeRef> right_parenthesis
    ;

Enum
    : Prelude unchecked_keyword? enum_keyword identifier (colon TypeRef)? left_brace UndelimitedList<Enumerator> right_brace
    ;

Enumerator
    : Prelude identifier (equals SignedInteger)?
    ;

CustomType
    : Prelude custom_keyword identifier
    ;

TypeAlias
    : Prelude type_alias_keyword identifier equals TypeRef
    ;

Sequence
    : sequence_keyword left_chevron TypeRef right_chevron
    ;

Dictionary
    : dictionary_keyword left_chevron TypeRef comma TypeRef right_chevron
    ;

Primitive
    : bool_keyword
    | int8_keyword
    | uint8_keyword
    | int16_keyword
    | uint16_keyword
    | int32_keyword
    | uint32_keyword
    | varint32_keyword
    | varuint32_keyword
    | int64_keyword
    | uint64_keyword
    | varint62_keyword
    | varuint62_keyword
    | float32_keyword
    | float64_keyword
    | string_keyword
    | any_class_keyword
    ;

TypeRef
    : LocalAttribute* TypeRefDefinition question_mark?
    ;

TypeRefDefinition
    : Primitive
    | Sequence
    | Dictionary
    | RelativelyScopedIdentifier
    | GloballyScopedIdentifier
    ;

FileAttribute
    : double_left_brace Attribute double_right_brace
    ;

LocalAttribute
    : left_brace Attribute right_brace
    ;

Attribute
    : RelativelyScopedIdentifier (left_parenthesis CommaList<AttributeArgument> right_parenthesis)?
    ;

AttributeArgument
    : string_literal
    | identifier
    ;

RelativelyScopedIdentifier
    : identifier (double_colon identifier)*
    ;

GloballyScopedIdentifier
    : (double_colon identifier)+
    ;

Integer
    : integer_literal
    ;

SignedInteger
    : Integer
    | minus Integer
    ;

Tag
    : tag_keyword left_parenthesis SignedInteger right_parenthesis
    ;

CompactId
    : left_parenthesis SignedInteger right_parenthesis
    ;

Prelude
    : EMPTY
    | Prelude doc_comment
    | Prelude LocalAttribute
    ;

// A comma separated list of 1 or more elements, with an optional trailing comma.
NonEmptyCommaList<T>
    : T (comma T)* comma?
    ;

// A comma separated list of 0 or more elements, with an optional trailing comma.
CommaList<T>
    : NonEmptyCommaList<T>
    | EMPTY
    ;

// A list of 0 or more elements with no required separators.
// A single comma can optionally be placed after each element (including a trailing comma),
// but these are ignored by the compiler and only for user-readability.
UndelimitedList<T>
    : (T comma?)*
    ;
```

## Preprocessor directives

The preprocessor only operates on lines beginning with a '#' character (ignoring any leading whitespace). Lines that
don't meet this criteria are mapped to `source_block` tokens in the lexical grammar. If there are multiple consecutive
lines like this, they are concatenated into a single `source_block` token for ease of processing. The contents of these
`source_block` tokens are passed as input to the [core language grammar](#core-language) described above.

### Lexical grammar {% #preprocessor-lexical-grammar %}

```ebnf {% showTitle=false %}
// These are opaque strings that exist outside the grammar of preprocessor directives.
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

### Syntactic grammar {% #preprocessor-syntactic-grammar %}

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

## Documentation comments

### Lexical grammar {% #doc-comments-lexical-grammar %}

TODO add a diagram for explaining how a comment lexer transitions between modes,
since it's lexical grammar also has some context dependency.

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

### Syntactic grammar {% #doc-comments-syntactic-grammar %}

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
