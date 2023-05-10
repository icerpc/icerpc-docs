---
title: Operation
description: Learn how to define operations in Slice.
---

## Operation basics

WIP

An operation describes a RPC, with:
 - a name (the operation name). This name is critical since it communicates to the remote service the agreed-upon format
 for the request and response payloads. With Slice, this agreed-upon format uses a Slice encoding (Slice1 or Slice2).
 - the parameters to encode into the request payload
 - the return type to encode into the response payload
 - optionally, the exception(s) that can be encoded into the response payload

You can only define an operation within an [interface](interface).

For example:

```slice {% addEncoding=true %}
module Babel

interface Translator {
    // Auto-detects the language of message and translates it.
    translate(message: string) -> (translatedMessage: string, detectedLanguage: string) throws TranslationException
}

enum TranslationError {
    UnknownLanguage
    LoadError
}

exception TranslationException {
    error: TranslationError
}
```

## Operation parameters

TBD

## Operation return type

TBD

## Exception specification

The return type of an operation (if any) can be followed by an exception specification.
{% slice1 %}
This exception specification consists of `throws` followed by an exception name or `AnyException`. When `throws`
includes an exception name, it means the response can carry this exception or a derived exception. `throws AnyException`
means the response can carry any Slice-defined exception. If there is no exception specification, a response with status
code ApplicationError is not expected to carry a Slice-defined exception.
{% /slice1 %}
{% slice2 %}
This exception specification consists of `throws` followed by an exception name, which means the response can carry this
exception. If there is no exception specification, a response with status code ApplicationError is not expected to carry
a Slice-defined exception.
{% /slice2 %}

## Idempotent operation

An operation can be marked as idempotent, which means calling this operation several times with the same arguments is
semantically equivalent to calling this operation once.

For example:

```slice
idempotent setTemperature(newValue: float64) throws ThermostatException
```

Setting the temperature over-and-over to the same value is like setting it once.

The idempotent keyword ensures that both the caller and the implementation of the service have compatible understandings
of the idempotent-ness of this operation. If the caller believes an operation is idempotent, the service implementation
must see and treat this operation as idempotent.

## Oneway operation

An operation with no return value or exception specification can be marked as one-way with the `oneway` attribute. For
example:

```slice
[oneway] logError(errorCode: int32, errorMessage: string)
```

A one-way operation succeeds as soon as the request is sent successfully.

## C# mapping

TBD
