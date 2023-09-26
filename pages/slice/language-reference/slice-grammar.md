---
title: Slice grammar
---

This page describes the grammatical rules, usage, and restrictions of the Slice language.

## Slice elements

### Slice files

The `SliceFile` grammar rule is the parser's entry point.
Once a file's contents have been [preprocessed], the resulting text is matched against this rule, in its entirety.

While the contents of a Slice file may reference definitions in other files, each file is parsed separately.
There is no notion of 'including' the contents of one file in another, and errors in one file do not affect the parsing of other files.

A slice file consists of any number of [file attributes][attribute] and at most one [mode statement][mode-statement].
These can appear in any order, but specifying more than one mode in a single file is forbidden.
This is followed by an optional [module declaration][module-declaration], followed by any number of Slice definitions.
It is illegal for a file to contain Slice definitions without a module declaration.

```ebnf {% showTitle=false %}
SliceFile
    : SliceFilePrelude Module? Definition*
    ;

SliceFilePrelude
    : EMPTY
    | SliceFilePrelude FileCompilationMode
    | SliceFilePrelude FileAttribute
    ;

Definition
    : Struct | Class | Exception | Interface | Enum | CustomType | TypeAlias
    ;
```

For additional information on Slice files, see the [Slice file][slice-file-guide] page.

### Mode declarations

Mode declarations consist of the `mode` keyword, followed by an equals sign, followed by an identifier.
That identifier must be a valid Slice compilation mode - either `Slice1` or `Slice2`.

```ebnf {% showTitle=false %}
FileCompilationMode
    : "mode" "=" Identifier
    ;
```

Mode declarations must come before any Slice definitions or [module declarations][module-declaration].
The compilation mode you select determines which Slice features are available to you
but has no effect on the parsing of, or validity of syntax within, your Slice file.
For example, even though classes are a Slice1-only feature, `class` is still a keyword within a Slice2 file,
and if you define a class, syntax errors in that class's definition will still be reported normally.

For additional information on modes, see the [compilation mode][compilation-mode-guide] page.

### Module declarations

Module declarations consist of the `module` keyword, followed by an [identifier].
[Local attributes][attribute] can be applied to a module in its prelude, but [doc comments][doc-comment] on modules are forbidden.

```ebnf {% showTitle=false %}
Module
    : Prelude "module" RelativeIdentifier
    ;
```

If the module's identifier is [unscoped][identifier], this declares a _top-level module_.
If the module's identifier is [scoped][identifier], this declares a _submodule_.

Submodules are modules that are logically contained within another module (called the _parent_).
Slice definitions within a submodule can reference types in parent modules without qualification.

```slice
module A // Declares a top-level module named `A`.
struct AStruct {}
```

```slice
module A::B // Declares a submodule named `B` that is contained within module `A`.
typealias T = AStruct // Don't need to qualify as `A::AStruct`.
```

All Slice definitions must be contained within modules - Slice definitions cannot exist at global scope.
If a Slice file contains no Slice definitions, it is legal to omit the module declaration.
Otherwise, if a Slice file contains any Slice definitions, a module declaration is required,
and any Slice definitions in the remainder of the file will be contained within the declared module.

Module declarations must come before any Slice definitions and must come after any [file attributes][attribute] or [mode declarations][mode-declaration].
There can be at most one module declaration per Slice file.

```ebnf {% showTitle=false %}
SliceFile
    : SliceFilePrelude Module? Definition*
    ;
```

It is legal for multiple Slice files to declare the same module.
Slice definitions defined in those files will be in the same module, even if they're in different Slice files.

For additional information on modules, see the [module][module-guide] page.

### Primitive types

Slice supports 17 primitive types. These types are always available - they're defined in any scope of any Slice file -
and can be referenced with their keywords:

```ebnf {% showTitle=false %}
Primitive
    : "bool"      | "int8"  | "uint8"  | "int16"    | "uint16"    | "int32"   | "uint32"  | "varint32"
    | "varuint32" | "int64" | "uint64" | "varint62" | "varuint62" | "float32" | "float64" | "string"
    | "AnyClass"
    ;
```

For additional information on primitive types, see the [primitive type][primitive-type-guide] page.

### Collection types

Slice supports 2 built-in collection types: sequences and dictionaries.
Both types can be referenced with their respective keywords: `Sequence` and `Dictionary`,

```ebnf {% showTitle=false %}
Sequence
    : "Sequence" "<" TypeRef ">"
    ;

Dictionary
    : "Dictionary" "<" TypeRef "," TypeRef ">"
    ;
```

Since they are are generic over the types of elements they contain, you must also specify their type arguments:

```slice
Sequence<bool>
Dictionary<uint8, string>
```

Since dictionary keys must be comparable, there are restrictions on which types can be used for them.
For additional information on sequences and dictionaries, see the [sequence][sequence-guide] and [dictionary][dictionary-guide] pages.

### Struct types

Struct definitions consist of the `struct` keyword, followed by an [identifier], and then the struct's body.
Struct bodies consist of a list of [fields][field] wrapped in a pair of braces. These fields may be optionally separated by commas.
Additionally, [local attributes][attribute] and a [doc-comment] may be applied to the struct in its prelude.

```ebnf {% showTitle=false %}
Struct
    : Prelude "compact"? "struct" Identifier "{" UndelimitedList<Field> "}"
    ;
```

Structs also support the `compact` modifier keyword.
A [compact struct][compact-struct-guide] cannot contain [tagged fields][tag].

For additional information on structs, see the [struct][struct-guide] page.

### Class types

Classes can only be defined or referenced in [`Slice1`][compilation-mode-guide] mode.
Classes can never be tagged when used as the type of a [field] or [parameter].

Class definitions consist of the `class` keyword, followed by an [identifier], optionally followed by a [compact ID][compact-id-guide], optionally followed by a base class, and then the class's body.
Compact IDs consist of a positive integer wrapped in a pair of parenthesis.
This integer must between `0` and `2,147,483,647` (the maximum value of a signed 32bit integer).
Base classes are specified by a single colon, followed by a class's (possibly scoped) identifier.
Class bodies consist of a list of [fields][field] wrapped in a pair of braces. These fields may be optionally separated by commas.
Additionally, [local attributes][attribute] and a [doc-comment] may be applied to the class in its prelude.

```ebnf {% showTitle=false %}
Class
    : Prelude "class" Identifier CompactId? (":" TypeRef)? "{" UndelimitedList<Field> "}"
    ;

CompactId
    : "(" SignedInteger ")"
    ;
```

For additional information on classes, see the [class][class-guide] page.

### Exceptions

Exceptions can only be defined or referenced in [`Slice1`][compilation-mode-guide] mode.
Exceptions cannot be used as types. They can only validly appear in the exception specification of [operations][operation].

Exception definitions consist of the `exception` keyword, followed by an [identifier], optionally followed by a base exception, and then the exception's body.
Base exceptions are specified by a single colon, followed by an exception's (possibly scoped) identifier.
Exception bodies consist of a list of [fields][field] wrapped in a pair of braces. These fields may be optionally separated by commas.
Additionally, [local attributes][attribute] and a [doc-comment] may be applied to the exception in its prelude.

```ebnf {% showTitle=false %}
Exception
    : Prelude "exception" Identifier (":" TypeRef)? "{" UndelimitedList<Field> "}"
    ;
```

For additional information on exceptions, see the [exception][exception-guide] page.

### Fields

Fields can only be declared within [structs][struct], [classes][class], and [exceptions][exception].
Field declarations consist of an [identifier], followed by a colon, and then a [type].
Optionally, a [tag] may be applied to the field, directly before its identifier, making this a [tagged field][tag].
Additionally, [local attributes][attribute] and a [doc-comment][doc-comment] may be applied to the field in its prelude.

```ebnf {% showTitle=false %}
Field
    : Prelude Tag? Identifier ":" TypeRef
    ;
```

For additional information on fields, see the [field][field-guide] page.

### Interfaces

Interface definitions consist of the `interface` keyword, followed by an [identifier], optionally followed by a list of base interfaces, and then the interface's body.
Base interfaces are specified by a single colon, followed by the (possibly scoped) identifiers of one or more interfaces, separated by commas.
Interface bodies consist of a set of [operations][operation] wrapped in a pair of braces.
Additionally, [local attributes][attribute] and a [doc-comment] may be applied to the class in its prelude.

```ebnf {% showTitle=false %}
Interface
    : Prelude "interface" Identifier (":" NonEmptyCommaList<TypeRef>)? "{" Operation* "}"
    ;
```

If you are using an RPC framework, every interface definition also defines a _proxy type_.
This proxy type shares the same name and scope as its corresponding interface and can be used as a type.

```slice
interface Foo { // Defines an interface named `Foo`.
    op() -> Foo // Returns a proxy named `Foo`.
}
```

It is illegal to use an interface as a type without an RPC framework.

For additional information on interfaces and proxies, see the [interface][interface-guide] and [proxy][proxy-guide] pages.

### Operations

An operation consists of an [identifier], followed be a list of [parameters][parameter], optionally followed by a return type, optionally followed by an [exception specification][exception-specification-guide].
Operations support the `idempotent` modifier keyword. For information about its effects, see the [idempotent][idempotent-guide] section.
Additionally, [local attributes][attribute] and a [doc-comment] may be applied to the operation in its prelude.

```ebnf {% showTitle=false %}
Operation
    : Prelude "idempotent"? Identifier "(" UndelimitedList<Parameter> ")" ReturnType? ExceptionSpecification?
    ;
```

There are two syntaxes for specifying a return type, depending on the number of elements you're returning.
A single return type can be specified by an arrow, followed by an optional [tag], followed by an optional [`stream`][stream-guide] keyword, and then a [type].
The syntax of a single return type is identical to a [parameter], but without an identifier or colon separator.
Multiple return parameters can be specified as a tuple. This consists of an arrow, followed by a list of [parameters][parameter] wrapped in parenthesis.
It is illegal for a return tuple to contain less than 2 elements. 

```ebnf {% showTitle=false %}
ReturnType
    : "->" Tag? "stream"? TypeRef
    | "->" "(" UndelimitedList<Parameter> ")"
    ;
```
Parameter lists may be optionally separated by commas. This applies to both operation parameters and return parameters.

There are two syntaxes for [exception specifications][exception-specification-guide], depending on the number of [exceptions][exception] being specified.
A single exception can be specified with the `throws` keyword, followed by the (possibly scoped) identifier of an exception.
Multiple exceptions can be specified as a tuple. This consists of the `throws` keyword, followed by the (possibly scoped) identifiers of one or more exceptions, separated by commas.
Exception specifications can only declared in [`Slice1`][compilation-mode-guide] mode.

```ebnf {% showTitle=false %}
ExceptionSpecification
    : "throws" TypeRef
    | "throws" "(" NonEmptyCommaList<TypeRef> ")"
    ;
```

For additional information on operations, see the [operation][operation-guide] pages.

### Parameters

The syntax for parameters is identical to the syntax for [fields][field], but with added support for the `stream` modifier keyword.

Parameters consist of an [identifier], followed by a colon, and then a [type].
Optionally, a [tag] may be applied to the parameter, directly before its identifier, making this a [tagged parameter][tag].
Additionally, [local attributes][attribute] and a [doc-comment] may be applied to the field in its prelude.

```ebnf {% showTitle=false %}
Parameter
    : Prelude Tag? Identifier ":" "stream"? TypeRef
    ;
```

Parameters also support the [`stream`][streamed-parameters-guide] modifier keyword, which may be applied to the parameter's type.
Streamed parameters are only supported in [`Slice2`][compilation-mode-guide] mode, and within a list of parameters,
at most one may be streamed and it must be the last parameter in that list.

For additional information on parameters, see the [parameter][parameter-guide] pages.

### Enum types

Enum definitions consist of the `enum` keyword, followed by an [identifier], optionally followed by an [underlying type][type], and then the enum's body.
Underlying types are specified by a single colon, followed by a type.
Underlying types must be integral and non-optional. Enums have a default underlying type of [varint32][primitive] if none is specified.
Enum bodies consist of a list of [enumerators][enumerator] wrapped in a pair of braces. These enumerators may be optionally separated by commas.
Additionally, [local attributes][attribute] and a [doc-comment] may be applied to the enum in its prelude.

```ebnf {% showTitle=false %}
Enum
    : Prelude "unchecked"? "enum" Identifier (":" TypeRef)? "{" UndelimitedList<Enumerator> "}"
    ;
```

Enums also support the `unchecked` modifier keyword.
An [unchecked-enum][unchecked-enum-guide] can be empty. An enum without this modifier must have at least one enumerator.

For additional information on enums, see the [enum][enum-guide] page.

### Enumerators

Enumerators can only be defined within [enums][enum].
Enumerator definitions consist of an [identifier], optionally followed by an enumerator value.
Enumerator values consist of an equals sign, followed by a (possibly signed) [integer].
Additionally, [local attributes][attribute] and a [doc-comment] may be applied to the enumerator in its prelude.

```ebnf {% showTitle=false %}
Enumerator
    : Prelude Identifier ("=" SignedInteger)?
    ;
```

The enum that an enumerator is defined within determines the allowed values.
An enumerator's value must be within the bounds of the enum's underling type.

For additional information on enumerators, see the [enumerator][enum-guide] page.

### Custom types

Custom type definitions consist of the `custom` keyword, followed by an [identifier].
Additionally, [local attributes][attribute] and a [doc-comment] may be applied to the custom type in its prelude.

```ebnf {% showTitle=false %}
CustomType
    : Prelude "custom" Identifier
    ;
```

For a custom type to be mappable, it must have a `[x::type]` attribute applied to it, where `x` is the mapping language's prefix.

For additional information on custom types, see the [custom type][custom-type-guide] page.

### Type aliases

Type alias definitions consist of the `typealias` keyword, followed by an [identifier], followed by an equals sign, and then a [type].
Additionally, [local attributes][attribute] and a [doc-comment] may be applied to the type alias in its prelude.

```ebnf {% showTitle=false %}
TypeAlias
    : Prelude "typealias" Identifier "=" TypeRef
    ;
```

Type aliases can be used anywhere a type can be used, and behave identically to their underlying type.
It is legal for type aliases to alias other type aliases.

For additional information on type aliases, see the [type alias][type-alias-guide] page.

### Type references

Type references consist of any number of [type attributes][attribute], followed a type, optionally followed by a question mark.

Built-in types like [primitives][primitive], [sequences][sequence], and [dictionaries][dictionary] can be referenced by their keywords.
User defined types can be referenced by their (possibly scoped) [identifiers][identifier].

```ebnf {% showTitle=false %}
TypeRef
    : LocalAttribute* TypeRefDefinition "?"?
    ;

TypeRefDefinition
    : Primitive | Sequence | Dictionary | RelativeIdentifier | GlobalIdentifier
    ;
```

### Tags

Tags consist of the `tag` keyword, followed by a positive integer wrapped in a pair of parenthesis.
This integer must between `0` and `2,147,483,647` (the maximum value of a signed 32bit integer).
Tags can only be applied to [fields][field] and [parameters][parameter], and only if the type of that field/parameter:
- is optional (it ends with `?` symbol)
- is not a class, and does not use classes internally

```ebnf {% showTitle=false %}
Tag
    : "tag" "(" SignedInteger ")"
    ;
```

### Identifiers

Slice supports three forms of identifiers:
- An unscoped identifier. These consist of a letter, followed by any number of letters, digits, or underscores.
- A relatively scoped identifier. These consist of one or more unscoped identifiers, separated by `::` tokens.
- A globally scoped identifier. These consist of a `::` token, followed by a relatively scoped identifier.

```ebnf {% showTitle=false %}
Identifier
    : identifier
    ;

RelativeIdentifier
    : identifier ("::" identifier)*
    ;

GlobalIdentifier
    : ("::" identifier)+
    ;
```

Examples of valid identifiers:

```slice
// Examples of unscoped identifiers
foo9
b_a_r
BAZ

// Examples of relatively scoped identifiers
foo9
foo9::b_a_r::BAZ

// Examples of globally scoped identifiers
::foo9
::foo9::b_a_r::BAZ
```

All Slice [keywords] satisfy the definition of an unscoped identifier.
Hence the lexer always gives priority to producing keyword tokens, even when it could produce an identifier token.
To use a keyword as an identifier, you can escape the keyword by prefixing it with a backslash.
For scoped identifiers, each individual identifier must be escaped this way.
It is legal to escape an identifier that is not a keyword, though doing so has no effect.

```slice
struct   // The struct keyword
\struct  // An unscoped identifier
\foo     // An unscoped identifier

::\struct::\module // A globally scoped identifier
```

### Integer literals

Slice supports three forms of integer literals:
- A decimal literal for base-10 numbers. These consist of one or more digits between `0` and `9`.
- A hexadecimal literal for base-16 numbers. These start with the prefix `0x`, followed by one or more digits between `0` and `9` or letters between `a` and `f`. Hexadecimal literals are not case-sensitive.
- A binary literal for base-2 numbers. These start with the prefix `0b`, followed by one or more digits that are either `0` or `1`.

Additionally, underscores can appear between any two characters of an integer literal.
These underscores carry no semantic meaning and are discarded by the parser.

Examples of valid integer literals:

```slice
123
0xFF
0b1010

335_445_996
0x_ab_cd_ef  // Same as 0xabcded
0b0_______1  // Same as 0b01

0x_0b1101  // hexadecimal literal of value 725249

// All have a value of 0
0
0_00_0
0b000
0x0
```

{% callout type="note" %}
Note that `-` signs are counted as separate tokens, and not as part of an integer literal.
{% /callout %}

The Slice grammar has 2 separate rules for unsigned and (possibly) signed integers.
Slice does not support using a `+` sign to indicate an integer is positive, since all integers are positive by default.

```ebnf {% showTitle=false %}
Integer
    : integer_literal
    ;

SignedInteger
    : Integer
    | "-" Integer
    ;
```

### String literals

String literals consist of any number of UTF8 characters, wrapped in a pair of double quotes.
Any characters within a string literal are treated as opaque text by the parser.

Slice supports escaping special characters within string literals.
This allows you to include unprintable characters or literal double quote characters in your string.
Characters can be escaped by prefixing them with a backslash.
To write a literal backslash, you must escape it with another backslash: `\\`.

The parser resolves any escaped characters, removing the `\` escape character where present.
Apart from this, no additional processing is performed on string literals.

Examples of valid string literals:

```slice
""
"hello world"
"the variable \"foo\" doesn't exist"
"a backslash: '\\'"
```

String literals can only appear as arguments to an [attribute].

### Attributes

An attribute consists of a directive, optionally followed by attribute arguments.

A directive is syntactically equivalent to a [scoped identifier][identifier], but instead of specifying namespaces, the presence of scopes limits when the attribute is applicable.
When no scopes are specified, the attribute is always applied, but when scopes are present, it is applied conditionally.
For example, `deprecated` is always applied, but `cs::type` will only be applied when compiling to C#.

Attribute arguments consist of any number of arguments wrapped in a pair of parenthesis, separated by commas.
Arguments may be either a [string literal][string] or an [unscoped identifier][identifier].

```ebnf {% showTitle=false %}
Attribute
    : RelativeIdentifier ("(" CommaList<AttributeArgument> ")")?
    ;

AttributeArgument
    : string_literal | identifier
    ;
```

Each attribute accepts/requires a different number of arguments.
For a list of attributes and additional information on them, see the [attribute] page.

Attributes cannot appear on their own, they must always be applied to something.
To apply an attribute to a Slice file, it must be wrapped in double brackets and appear at the top of the file (before any definitions or declarations).
To apply an attribute to a Slice definition or declaration, it must be wrapped in single brackets and appear directly before the definition/declaration.

```ebnf {% showTitle=false %}
FileAttribute
    : "[[" Attribute "]]"
    ;

LocalAttribute
    : "[" Attribute "]"
    ;
```

## Lexical grammar

This section describes how Unicode characters combine to form the tokens used in the syntactic grammar.

{% callout type="note" %}
While it is modeled as a context-free grammar, there is one case where the lexer's behavior is context dependent:
when lexing the inside of an attribute (any characters between a pair of `[` and `]` or `[[` and `]]` tokens)
the lexer will not produce keyword tokens. Keywords will be treated as identifiers, as if they were prefixed with a backslash.
{% /callout %}

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

## Syntactic grammar

This section describes how lexical tokens combine to form elements of the Slice language.

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

[slice-file]: #slice-files
[module-declaration]: #module-declarations
[mode-declaration]: #mode-declarations
[primitive]: #primitive-types
[sequence]: #collection-types
[dictionary]: #collection-types
[struct]: #struct-types
[class]: #class-types
[exception]: #exception
[field]: #fields
[operation]: #operations
[parameter]: #parameters
[enum]: #enum-types
[enumerator]: #enumerators
[tag]: #tag
[identifier]: #identifiers
[attribute]: #attributes
[type]: #type-references
[integer]: #integer-literals
[string]: #string-literals

[slice-file-guide]: /slice/basics/slice-files
[compilation-mode-guide]: /slice/language-guide/compilation-mode
[module-guide]: slice/language-guide/module
[primitive-type-guide]: /slice/language-guide/primitive-types
[sequence-guide]: /slice/language-guide/sequence-types
[dictionary-guide]: /slice/language-guide/dictionary-types
[struct-guide]: /slice/language-guide/struct-types
[compact-struct-guide]: /slice/language-guide/struct-types#compact-struct
[class-guide]: /slice1/language-guide/class-types
[compact-id-guide]: /slice/language-guide/class-types#compact-type-ids
[exception-guide]: /slice/language-guide/exception
[field-guide]: /slice/language-guide/fields
[interface-guide]: /slice/language-guide/interface
[proxy-guide]: /slice/language-guide/proxy-types
[operation-guide]: /slice/language-guide/operation
[exception-specification-guide]: /slice/language-guide/operation#exception-specification
[idempotent-guide]: /slice/language-guide/operation#idempotent-operation
[parameter-guide]: /slice/language-guide/parameters
[enum-guide]: /slice/language-guide/enum-types
[unchecked-enum-guide]: /slice/language-guide/enum-types#unchecked-enumeration
[custom-type-guide]: /slice/language-guide/custom-types
[type-alias-guide]: /slice/language-guide/type-alias
