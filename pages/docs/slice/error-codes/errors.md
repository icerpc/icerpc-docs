---
title: Errors
toc: false
---

{% title /%}

## Syntax

A general syntax error. This error is used when the parser encounters a syntax error that is not covered by a more
specific error.

## E001

The compresss attribute could not be applied. The only valid targets are interfaces and operations.

## E002

The deprecated attribute could not be applied. The only valid targets are X.

## E003

Used to indicate when a method must contain arguments.

## E004

The provided argument is not supported for the given method.

## E005

Dictionaries cannot use optional types as keys.

## E006

Structs must be compact to be used as a dictionary key type.

## E007

An unsupported type was used as a dictionary key type.

## E008

Struct contains a member that cannot be used as a dictionary key type.

## E009

Enums cannot have optional underlying types.

## E010

Enums must be contain at least one enumerator.

## E011

Enum underlying types must be integral types.

## E012

An identifier was redefined.

## E013

An identifier was used to shadow another identifier.

## E014

A duplicate tag value was found.

## E015

The required parameters of an operation did not precede the optional parameters.

## E016

A streamed parameter was not the last parameter in the operation.

## E017

Return tuples for an operation must contain at least two element.

## E018

Compact structs cannot contain tagged data members.

## E019

A tagged data member was not set to optional.

## E020

Cannot tag a class.

## E021

Cannot tag a member that contains a class.

## E022

Used to indicate when two types should match, but do not.

## E023

Used to indicate when two concrete types should match, but do not.

## E024

Compact structs cannot be empty.

## E025

A self-referential type alias has no concrete type.

## E026

An enumerator was found that was out of bounds of the underlying type of the parent enum.

## E027

A tag value was not in the expected range, 0 .. i32::MAX.

## E028

Enumerator values must be unique.

## E029

The provided kind with identifier is not supported in the specified encoding.

## E030

An unsupported type was used in the specified encoding.

## E031

Exceptions cannot be used as a data type with the specified encoding.

## E032

Optional are not supported in the specified encoding.

## E033

Streamed parameters are not supported with the specified encoding.

## E034

TODO: UnexpectedAttribute,

## E035

TODO: MissingRequiredArgument,

## E036

TODO: TooManyArguments,

## E037

TODO: MissingRequiredAttribute,

## E038

Multiple streamed parameters were used as parameters for an operation.

## E039

A compact ID was not in the expected range, 0 .. i32::MAX.

## E040

An integer literal was outside the parsable range of 0..i128::MAX.

## E041

An integer literal contained illegal characters for its base.

## E042

An invalid Slice encoding was used.

## E043

The user specified an encoding multiple times in a single Slice file.

## E044

A file scoped module contained submodules.

## E045

A non-Slice1 operation used the `AnyException` keyword.

## E046

A malformed or invalid Warning code was supplied to the ignore warnings attribute.

## E047

An self-referential type had an infinite size cycle.

## E048

Failed to resolve a type due to a cycle in its definition.

## E049

No element with the specified identifier was found.
