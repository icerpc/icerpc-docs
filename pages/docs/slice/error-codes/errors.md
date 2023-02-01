---
title: Errors
toc: false
---

{% title /%}

{% callout type="critical" %}

TODO: This page contains placeholder content and needs to be replaced. Please remove this when you are done.

{% /callout %}

## Syntax

A general syntax error. This error is used when the parser encounters a syntax error that is not covered by a more
specific error.

{% divider /%}

## E001

The compresss attribute could not be applied. The only valid targets are interfaces and operations.

{% divider /%}

## E002

The deprecated attribute could not be applied. The only valid targets are X.

{% divider /%}

## E003

Used to indicate when a method must contain arguments.

{% divider /%}

## E004

The provided argument is not supported for the given method.

{% divider /%}

## E005

Dictionaries cannot use optional types as keys.

{% divider /%}

## E006

Structs must be compact to be used as a dictionary key type.

{% divider /%}

## E007

An unsupported type was used as a dictionary key type.

{% divider /%}

## E008

Struct contains a member that cannot be used as a dictionary key type.

{% divider /%}

## E009

Enums cannot have optional underlying types.

{% divider /%}

## E010

Enums must be contain at least one enumerator.

{% divider /%}

## E011

Enum underlying types must be integral types.

{% divider /%}

## E012

An identifier was redefined.

{% divider /%}

## E013

An identifier was used to shadow another identifier.

{% divider /%}

## E014

A duplicate tag value was found.

{% divider /%}

## E015

The required parameters of an operation did not precede the optional parameters.

{% divider /%}

## E016

A streamed parameter was not the last parameter in the operation.

{% divider /%}

## E017

Return tuples for an operation must contain at least two element.

{% divider /%}

## E018

Compact structs cannot contain tagged data members.

{% divider /%}

## E019

A tagged data member was not set to optional.

{% divider /%}

## E020

Cannot tag a class.

{% divider /%}

## E021

Cannot tag a member that contains a class.

{% divider /%}

## E022

Used to indicate when two types should match, but do not.

{% divider /%}

## E023

Used to indicate when two concrete types should match, but do not.

{% divider /%}

## E024

Compact structs cannot be empty.

{% divider /%}

## E025

A self-referential type alias has no concrete type.

{% divider /%}

## E026

An enumerator was found that was out of bounds of the underlying type of the parent enum.

{% divider /%}

## E027

A tag value was not in the expected range, 0 .. i32::MAX.

{% divider /%}

## E028

Enumerator values must be unique.

{% divider /%}

## E029

The provided kind with identifier is not supported in the specified encoding.

{% divider /%}

## E030

An unsupported type was used in the specified encoding.

{% divider /%}

## E031

Exceptions cannot be used as a data type with the specified encoding.

{% divider /%}

## E032

Optional are not supported in the specified encoding.

{% divider /%}

## E033

Streamed parameters are not supported with the specified encoding.

{% divider /%}

## E034

TODO: UnexpectedAttribute,

{% divider /%}

## E035

TODO: MissingRequiredArgument,

{% divider /%}

## E036

TODO: TooManyArguments,

{% divider /%}

## E037

TODO: MissingRequiredAttribute,

{% divider /%}

## E038

Multiple streamed parameters were used as parameters for an operation.

{% divider /%}

## E039

A compact ID was not in the expected range, 0 .. i32::MAX.

{% divider /%}

## E040

An integer literal was outside the parsable range of 0..i128::MAX.

{% divider /%}

## E041

An integer literal contained illegal characters for its base.

{% divider /%}

## E042

An invalid Slice encoding was used.

{% divider /%}

## E043

The user specified an encoding multiple times in a single Slice file.

{% divider /%}

## E044

A file scoped module contained submodules.

{% divider /%}

## E045

A non-Slice1 operation used the `AnyException` keyword.

{% divider /%}

## E046

A malformed or invalid Warning code was supplied to the ignore warnings attribute.

{% divider /%}

## E047

An self-referential type had an infinite size cycle.

{% divider /%}

## E048

Failed to resolve a type due to a cycle in its definition.

{% divider /%}

## E049

No element with the specified identifier was found.
