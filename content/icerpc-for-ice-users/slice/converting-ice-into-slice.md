---
title: Converting .ice into .slice
description: Learn how to convert .ice definitions into .slice definitions.
---

## Use-case

You need to convert existing Slice definitions into new Slice definitions when you want to use IceRPC to build a
client or server application that interoperates with your existing Ice applications.

This page shows how to convert each construct in your .ice file into the equivalent construct in your new .slice
file. This equivalent construct is naturally encoded the same way—otherwise, there would be no interop.

All the .slice files used for interop with Ice must use the Slice1 compilation mode:

```slice
mode = Slice1
```

{% callout type="note" %}
Ice will soon provide an `ice2slice` tool to automate this conversion.
{% /callout %}

## Limitations

A few definitions in .ice files have no equivalent in the .slice syntax and as a result cannot be converted:

- local Slice\
  The .slice syntax does not support local definitions.
- constants\
  You cannot define constants in .slice files.
- optional fields and parameters whose type is a class or references a class.
- default values for numeric and string fields in classes, exceptions, and structs.
- operations on classes (deprecated in Ice 3.7)
- interface parameters and fields passed "by value" (deprecated in Ice 3.7)

## Class

{% side-by-side alignment="top" %}

```ice {% title=".ice syntax" %}
class Vehicle
{
    string color;
}

class Bicycle extends Vehicle
{
    int speedCount;
    optional(1) bool rented;
}
```

```slice {% title="Same classes with the .slice syntax" %}
class Vehicle {
    color: string
}

class Bicycle : Vehicle {
    speedCount: int32
    tag(1) rented: bool?
}
```

{% /side-by-side %}

## Dictionary

{% side-by-side alignment="top" %}

```ice {% title=".ice syntax" %}
dictionary<string, int> StringIntDict;
```

```slice {% title="Same dictionary with the .slice syntax" %}
typealias StringIntDict = Dictionary<string, int32>
```

{% /side-by-side %}

## Enum

{% side-by-side alignment="top" %}

```ice {% title=".ice syntax" %}
enum Fruit
{
    Apple,
    Orange,
    Strawberry = 3,
    Pineapple
}
```

```slice {% title="Same enum with the .slice syntax" %}
enum Fruit {
    Apple
    Orange
    Strawberry = 3
    Pineapple
}
```

{% /side-by-side %}

A .slice enum can be checked (the default) or unchecked (with the unchecked keyword), while the "check-ness" of a .ice
enum is language-mapping dependent. When the generated code decodes a numeric value into an enumerator, and the enum has
no enumerator with this numeric value, the decoding fails with a checked enum and succeeds with an unchecked enum.

## Exception

{% side-by-side alignment="top" %}

```ice {% title=".ice syntax" %}
exception SyntaxException
{
    string message;
}

exception InvalidIdentifierException
    extends SyntaxException
{
    string badIdentifier;
}
```

```slice {% title="Same exceptions with the .slice syntax" %}
exception SyntaxException {
    message: string
}

exception InvalidIdentifierException
    : SyntaxException {
    badIdentifier: string
}
```

{% /side-by-side %}

## Exception specification

With the .ice syntax, an operation lists the Slice-defined exceptions it's allowed to throw in its exception
specification. For example:

```ice {% title=".ice syntax" %}
void op(string s) throws ArgumentException, InvalidStateException, NotAvailableException;
```

The allowable exceptions include any exception derived from `ArgumentException`, `InvalidStateException` and
`NotAvailableException`. If this list is empty (no `throws`), the operation is not allowed to throw any Slice-defined
exception.

With the .slice syntax, an operation can also throw one or more exceptions. The only difference is a list of two or more
exceptions must be in parenthesis:

```slice {% title="Same operation with the .slice syntax" %}
op(s: string) throws (ArgumentException, InvalidStateException, NotAvailableException)
```

Another difference between Ice and IceRPC is where the exception specifications are checked:

- with Ice, the generated code enforces exception specifications only when decoding responses
- with the IceRPC + Slice integration, the generated code enforces exception specifications during encoding and also
during decoding.

## Interface

{% side-by-side alignment="top" %}

```ice {% title=".ice syntax" %}
interface ChessPiece
{
    void move(Position newPosition)
        throws ChessException;
}

interface Pawn extends ChessPiece
{
    // The returned proxy can't be null; however,
    // the .ice syntax does not provide a way to
    // express this constraint.
    ChessPiece* promote(Kind newKind)
        throws ChessException;
}
```

```slice {% title="Same interfaces with the .slice syntax" %}
interface ChessPiece {
    move(newPosition: Position) throws ChessException
}

interface Pawn : ChessPiece {
    // The returned chess piece proxy is non-optional.
    promote(newKind: Kind) -> ChessPiece
        throws ChessException
}
```

{% /side-by-side %}

## Module

{% side-by-side alignment="top" %}

```ice {% title=".ice syntax" %}
module BoardGame
{
    module Checkers {}

    module Chess {}
}
```

```slice {% title="Same modules with the .slice syntax" %}
// Each .slice file must have exactly one module.
module BoardGame::Checkers

// Must be in a different file.
module BoardGame::Chess
```

{% /side-by-side %}

## Optional

The `optional` keyword in .ice files is replaced by the `tag` keyword in .slice files and the type of a tagged parameter
or field must be marked optional (with a `?` suffix) in .slice files.

{% side-by-side alignment="top" %}

```ice {% title=".ice syntax" %}
interface Widget
{
    void spin(optional(1) int speed);
}

class Person
{
    string name;
    optional(1) string email;
}
```

```slice {% title="Same definitions with the .slice syntax" %}
interface Widget {
    spin(tag(1) speed: int32?)
}

class Person {
    name: string
    tag(1) email: string?
}
```

{% /side-by-side %}

## Out parameters

With the .ice syntax, the return type of an operation can be split between a return type and out parameters, whereas
with the .slice syntax, an operation has only "in" parameters but can return a tuple.

When converting .ice definitions into .slice definitions, keep in mind that Ice encodes out parameters _before_ the
return type.

{% side-by-side alignment="top" %}

```ice {% title=".ice syntax" %}
interface Sample
{
    bool op(
        string input,
        out string output1,
        out int output2)
}
```

```slice {% title="Same interface with the .slice syntax" %}
interface Sample {
    // The .ice return type is at the end of the
    // return tuple.
    op(input: string) ->
        (output1: string,
         output2: int32,
         return: bool)
}
```

{% /side-by-side %}

{% callout type="note" %}
The names of the parameters and return type elements are not encoded; as a result, you can change them freely without
breaking on-the-wire compatibility.
{% /callout %}

## Primitive types

| .ice syntax | .slice syntax                           |
| ----------- | --------------------------------------- |
| bool        | bool                                    |
| byte        | uint8                                   |
| double      | float64                                 |
| float       | float32                                 |
| int         | int32                                   |
| long        | int64                                   |
| short       | int16                                   |
| string      | string                                  |
| Object      | AnyClass?                               |
| Object*     | Ice::Object? or IceRpc::ServiceAddress? |
| Value       | AnyClass?                               |

With the .ice syntax, `Object`, `Object*` and `Value` always represent nullable parameters or fields. With the .slice
syntax, the corresponding `AnyClass`, `Ice::Object` or `IceRpc::ServiceAddress` can be optional (with a ? suffix) or
non-optional (without a ? suffix).

## Sequence

{% side-by-side alignment="top" %}

```ice {% title=".ice syntax" %}
sequence<string> StringSeq;
```

```slice {% title="Same sequence with the .slice syntax" %}
typealias StringSeq = Sequence<string>
```

{% /side-by-side %}

## Struct

{% side-by-side alignment="top" %}

```ice {% title=".ice syntax" %}
struct Position
{
    int x;
    int y;
}
```

```slice {% title="Same struct with the .slice syntax" %}
compact struct Position {
    x: int32
    y: int32
}
```

{% /side-by-side %}

With the .slice syntax and the Slice1 compilation mode, all structs must be compact.
