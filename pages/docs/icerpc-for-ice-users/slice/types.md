---
title: Types
description: Understand how to convert types in the .ice syntax to the new .slice syntax.
---

## Class

{% side-by-side %}
```slice {% title=".ice syntax" %}
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
encoding = Slice1

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

{% side-by-side %}
```slice {% title=".ice syntax" %}
dictionary<string, int> StringIntDict;
```

```slice {% title="Same dictionary with the .slice syntax" %}
encoding = Slice1

typealias StringIntDict = dictionary<string, int32>
```
{% /side-by-side %}

## Enum

{% side-by-side %}
```slice {% title=".ice syntax" %}
enum Fruit
{
    Apple,
    Orange,
    Strawberry = 3,
    Pineapple
}
```

```slice {% title="Same enum with the .slice syntax" %}
encoding = Slice1

enum Fruit {
    Apple
    Orange
    Strawberry = 3
    Pineapple
}
```
{% /side-by-side %}

A .slice enum can be checked (the default) or unchecked (with the unchecked keyword), while the "check-ness" of a .ice
enum is language-mapping dependent. When the Slice engine decodes a numeric value into an enumerator, and the enum has
no enumerator with this numeric value, the decoding fails with a checked enum and succeeds with an unchecked enum.

## Exception

{% side-by-side %}
```slice {% title=".ice syntax" %}
exception SyntaxException
{
    string message;
}

exception InvalidIdentifierException extends SyntaxException
{
    string badIdentifier;
}
```

```slice {% title="Same exceptions with the .slice syntax" %}
encoding = Slice1

exception SyntaxException {
    message: string
}

exception InvalidIdentifierException : SyntaxException {
    badIdentifier: string
}
```
{% /side-by-side %}

## Interface

{% side-by-side %}
```slice {% title=".ice syntax" %}
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
encoding = Slice1

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

## Primitive types

| .ice syntax | .slice syntax   |
|-------------|-----------------|
| byte        | uint8           |
| double      | float64         |
| float       | float32         |
| int         | int32           |
| long        | int64           |
| short       | int16           |
| string      | string          |
| Object      | AnyClass?       |
| Object*     | ServiceAddress? |
| Value       | AnyClass?       |

With the .ice syntax, Object, Object* and Value always represent nullable parameters or fields. With the .slice syntax,
the corresponding AnyClass or ServiceAddress can be optional (with a ? suffix) or non-optional (without a ? suffix).

## Sequence

{% side-by-side %}
```slice {% title=".ice syntax" %}
sequence<string> StringSeq;
```

```slice {% title="Same sequence with the .slice syntax" %}
encoding = Slice1

typealias StringSeq = sequence<string>
```
{% /side-by-side %}

## Struct

{% side-by-side %}
```slice {% title=".ice syntax" %}
struct Coordinate
{
    int x;
    int y;
}
```

```slice {% title="Same struct with the .slice syntax" %}
encoding = Slice1

compact struct Coordinate {
    x: int32
    y: int32
}
```
{% /side-by-side %}

With the .slice syntax, all Slice1-encoding structs must be compact.
