---
title: Slice grammar
---

## Lexical grammar

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
sequence_keyword:   "Sequence";
dictionary_keyword: "Dictionary";

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

### Case sensitivity

Slice keywords and identifiers are case-sensitive. For example, `TimeOfDay` and `TIMEOFDAY` are
considered different identifiers.

### Using a keyword as an identifier

It is possible to use a Slice keyword as an identifier by prefixing the keyword with a backslash (`\`).

It's best to avoid using Slice keywords as identifiers.

## Syntactic grammar

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
    : Prelude module_keyword RelativeIdentifier
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
    | RelativeIdentifier
    | GlobalIdentifier
    ;

FileAttribute
    : double_left_brace Attribute double_right_brace
    ;

LocalAttribute
    : left_brace Attribute right_brace
    ;

Attribute
    : RelativeIdentifier (left_parenthesis CommaList<AttributeArgument> right_parenthesis)?
    ;

AttributeArgument
    : string_literal
    | identifier
    ;

RelativeIdentifier
    : identifier (double_colon identifier)*
    ;

GlobalIdentifier
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
