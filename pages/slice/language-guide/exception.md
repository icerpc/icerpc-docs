---
title: Exception
description: Learn how to define and use exceptions in Slice.
---

## Custom error

The implementation of a Slice [operation](operation) can:
- succeed and return its normal return value,
- fail and return a generic error,
- or fail and return a custom error

In this last case, the custom error must be defined as a Slice exception and referenced in the
[exception specification][exception-specification] of the operation.

{% slice1 %}
Other than the `exception` keyword, the definition of an exception is syntactically identical to the definition of
a [class](class-types). For example:
{% side-by-side alignment="top" %}
```slice
class BaseError {
    errorCode: int32
}

class DerivedError : BaseError {
    measurement: float64
}

class TranslationError{
    errorCode: TranslationErrorCode
}

enum TranslationErrorCode { UnknownWord, IOFailure }
```

```slice
class BaseException {
    errorCode: int32
}

exception DerivedException : BaseException {
    measurement: float64
}

exception TranslationException {
    errorCode: TranslationErrorCode
}

enum TranslationErrorCode { UnknownWord, IOFailure }
```
{% /side-by-side %}

{% callout type="information" %}
The recommended naming convention is to give an `Exception` suffix to all Slice exceptions.
{% /callout %}
{% /slice1 %}

{% slice2 %}
Other than the `exception` keyword, the definition of an exception is syntactically identical to the definition of a
[struct](struct-types). For example:

{% side-by-side alignment="top" %}
```slice
struct EmptyError {}

struct TranslationError {
    errorCode: TranslationErrorCode
    tag(1) detectedLanguage: string?
}

enum TranslationErrorCode : uint8
{
    UnknownWord
    IOFailure
}
```

```slice
exception EmptyException {}

exception TranslationException {
    errorCode: TranslationErrorCode
    tag(1) detectedLanguage: string?
}

enum TranslationErrorCode : uint8
{
    UnknownWord
    IOFailure
}
```
{% /side-by-side %}

{% callout type="information" %}
The recommended naming convention is to give an `Exception` suffix to all Slice exceptions.
{% /callout %}

An exception is a constructed type; you can use it just like a struct with the same name. It carries fields just like
a struct does. For example:

```slice
interface TranslationLogger {
    logError(errorMessage: string, errorDetails: TranslationException)
}
```
{% /slice2 %}

{% slice1 %}
## Difference with classes

A class is a constructed type, while an exception is not: you cannot use an exception as the type for a field or a
parameter.

An exception is always encoded in the [sliced format][sliced-format] (the `slicedFormat` attribute has no effect on
the encoding of an exception). This way, when an application receives a derived exception it does not know, it can
always slice off the exception slices it doesn't understand and construct a base exception. This base exception does not
preserve the sliced-off slices unlike a base class constructed after slicing.
{% /slice1 %}

## C# mapping

{% slice1 %}
A Slice exception maps to a public C# class with the same name. If the exception doesn't derive from another exception,
the mapped class derives from [`SliceException`][slice-exception], the base class for all C# Slice exceptions.
{% /slice1 %}
{% slice2 %}
A Slice exception maps to a public C# class with the same name. This class derives from
[`SliceException`][slice-exception], the base class for all C# Slice exceptions.
{% /slice2 %}

For example:

{% side-by-side alignment="top" %}
```slice
exception TranslationException {
    errorCode: TranslationErrorCode
    tag(1) detectedLanguage: string?
}
```

```csharp
public partial class TranslationException : SliceException
{
    public TranslationErrorCode ErrorCode;
    public string? DetectedLanguage;

    // Primary constructor
    public TranslationException(
        TranslationErrorCode errorCode,
        string? detectedLanguage,
        string? message = null,
        System.Exception? innerException = null)
        : base(message, innerException)
    {
        ...
    }
}
```
{% /side-by-side %}

The mapped C# class provides a primary constructor with parameters for all its fields, plus an optional message and an
optional inner exception (like most exceptions in C#).

{% slice1 %}
Slice exception inheritance maps the C# class inheritance as you would expect:

{% side-by-side alignment="top" %}
```slice
exception BaseException {
    errorCode: int32
}

exception DerivedException : BaseException {
    measurement: float64
}
```

```csharp
public partial class BaseException : SliceException
{
    public int ErrorCode;

    // Primary constructor
    public BaseException(
        int errorCode,
        string? message = null,
        System.Exception? innerException = null)
        : base(message, innerException)
    {
        ...
    }
}

public partial class DerivedException : BaseException
{
    public double Measurement;

    // Primary constructor.
    public DerivedException(
        int errorCode,
        double measurement,
        string? message = null,
        System.Exception? innerException = null)
        : base(errorCode, message, innerException)
    {
        ...
    }
}
```
{% /side-by-side %}
{% /slice1 %}

### ConvertToUnhandled

When the generated code decodes an exception from a payload, it sets the exception's
[`ConvertToUnhandled`][convert-to-unhandled] property to `true`.

This way, when the implementation of an operation makes an invocation and this invocation throws an exception, by
default, this exception is not resent as-is but gets converted into a [DispatchException][dispatch-exception] with
status code [UnhandledException][unhandled-exception]. If you don't want this conversion, you need to catch the
exception and set `ConvertToUnhandled` to false:

```csharp
try
{
    ...make invocation...
}
catch (DispatchException exception)
{
    // Don't convert to unhandled exception.
    exception.ConvertToUnhandled = false;
    throw;
}
```

[convert-to-unhandled]: csharp:IceRpc.DispatchException#IceRpc_DispatchException_ConvertToUnhandled
[dispatch-exception]: csharp:IceRpc.DispatchException
[exception-specification]: operation#exception-specification
[slice-exception]: csharp:IceRpc.Slice.SliceException
[sliced-format]: class-types#slicing
[unhandled-exception]: csharp:IceRpc.StatusCodeIceRpc_StatusCode_UnhandledException
