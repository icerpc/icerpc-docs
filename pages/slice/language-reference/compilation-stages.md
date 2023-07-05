---
title: Compilation stages
---

The Slice compiler consists of a number of stages that are executed in order.
Each stage takes the output of the previous stage as input and produces its own output.

An error at any stage will cause the compilation to be aborted.

The compilation stages are:

- [Input validation](#input-validation)
- [Preprocessing](#preprocessing)
- [Parsing](#parsing)
- [Patching](#patching)
- [Validation](#validation)
- [Code generation](#code-generation)

## Input validation

The input validation stage performs validation of the user specified source and reference files. This includes checking
if duplicate files were specified and reading both source and reference files into memory.

## Preprocessing

The next stage is preprocessing. The preprocessor is responsible for selectively including or excluding parts of the
input files based on preprocessor directives. More information about the Slice preprocessor can be found in the
[preprocessor](./preprocessor) section.

## Parsing

The parsing stage is responsible for parsing the preprocessed input files into an
[abstract syntax tree](https://en.wikipedia.org/wiki/Abstract_syntax_tree) (AST). The AST is a representation of the
Slice code in memory that is easier to work with than the raw input files.

Here, user defined types such as [structs](../language-guide/struct-types),
[interfaces](../language-guide/interface-types), and [enums](../language-guide/enum-types) are parsed and stored for
later stages in the AST.

Syntax errors occur when the parser encounters a construct that does not conform to the Slice [grammar](./grammar).
The parser will attempt to recover from any syntax errors and continue parsing the Slice file.
This allows the compiler to report multiple syntax errors in a single run.

At this stage, the AST contains all the elements of the Slice code, but it is not yet complete. While we know that the
input file is syntactically valid, we do not yet know if it is semantically valid.

## Patching

The patching stage is responsible for patching the AST. This is broken into multiple sub-stages:

1. __Attribute patching__

    At the beginning of this stage attributes are stored in the AST in their most generic form. An unknown attribute
    with a directive and list of arguments (if any were provided).

    Each Slice attribute (e.g. `[oneway]`, `[compress(...)]`, `[idempotent]`, etc.) in the AST is converted from the
    generic attribute into a more specific typed attribute.

    Errors will be emitted at this stage if invalid arguments were provided to an attribute.

2. __Type patching__

    The type patching phase is responsible for patching the AST to verify and resolve all type references. This includes
    resolving references to user defined types, built-in types, and type aliases.

3. __Encoding patching__

    Encoding patching involves computing the supported encodings for each type in the AST. The supported encodings are a
    set of encodings that the type supports intersected with the encoding specified by the Slice file.

    Errors will be emitted at this stage if a type does not support the encoding specified by the Slice file.

4. __Comment link patching__

    The comment link patching phase is responsible for patching the AST to resolve all comment links. Comment links are
    used to link documentation comments to the elements they document.

    Comment links are resolved by traversing the AST and looking for comment links. When a comment link is found, the
    AST is searched for an element with a matching name. If a matching element is found, the comment link is resolved
    and the comment is linked to the element.

5. __Language patching__

    While the previous stages are performed by the `slicec` library, the last phase is performed by the individual
    language compilers, such as `slicec-cs`. It's primary purpose is to patch attributes whose semantics are specific
    to a particular language, e.g. `[cs::identifier("Foo")]`.

## Validation

The validation stage is responsible for validating the AST. Like patching, this is broken into multiple sub-stages:

1. __Cycle validation__

    A cycle occurs when a type references itself either directly or indirectly. For example:

    ```slice
    struct A {
        A a;
    }
    ```

    This is an error because `A` references itself in field `a`.

    Classes are exempt from this rule and can reference themselves. While this is technically allowed, it is recommended
    to avoid doing this.

2. __Redefinition validation__

    A redefinition occurs when a type identifier is used more than once in the same scope, causing an ambiguity.
    For example:

    ```slice
    struct A {
        B b;
    }

    struct A {
        C c;
    }
    ```

    This is an error because `A` is defined twice.

3. __Slice validation__

    This stage of validation is responsible for validating the semantics of the Slice code.

    These checks include:

    - attribute usage validation
    - doc comment tag validation
    - type specific validation (e.g. checking that a compact struct has at least one field)
    - tag validation (e.g. checking that tagged fields and parameters are marked as optional)

    Errors will be emitted at this stage if the semantics of the Slice code are violated.

4. __Language validation__

    While the previous stages are performed by the `slicec` library, the last phase is performed by the individual
    language compilers, such as `slicec-cs`. It's primary purpose is to validate attributes whose semantics are specific
    to a particular language, e.g. `[cs::identifier("Foo")]`.

## Code generation

The final stage is code generation. At this point the AST is now complete and validated. The compiler will now generate
source code for the target language from the AST. The specifics of this stage are dependent on the target language.

For instance, `slicec-cs` will generate one C# file per Slice file. Each C# file will contain a single C# namespace
containing all the types defined in the Slice file.
