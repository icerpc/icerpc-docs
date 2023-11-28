---
title: Exception
description: Learn how to define and use exceptions in Slice.
---

{% slice2 %}
Exceptions are not supported with Slice2.
{% /slice2 %}

{% slice1 %}
## Operation failure

The implementation of a Slice [operation] can:
- succeed and return an instance of the operation's return type,
- fail and return a generic error, or
- fail and return an exception defined in Slice

In this last case, the exception or one of its base exceptions must be listed in the
[exception specification][exception-specification] of the operation.

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
```

```slice
exception BaseException {
    errorCode: int32
}

exception DerivedException : BaseException {
    measurement: float64
}
```
{% /side-by-side %}

{% callout type="note" %}
The recommended naming convention is to give an `Exception` suffix to all Slice exceptions.
{% /callout %}

## Difference with classes

A class is a type, while an exception is not: you cannot use an exception as the type of a field.

An exception is always encoded in the [sliced format][sliced-format] (the `slicedFormat` attribute has no effect on
the encoding of an exception). This way, when an application receives a derived exception it does not know, it can
always slice off the exception slices it doesn't recognize and construct a base exception. This base exception does not
preserve the sliced-off slices unlike a base class constructed after slicing.

## C# mapping {% icerpcSlice=true %}

A Slice exception maps to a public C# class with the same name. If the exception doesn't derive from another exception,
the mapped class derives from [SliceException], the base class for all C# Slice exceptions.

For example:

{% side-by-side alignment="top" %}
```slice
exception TranslationException {
    errorCode: TranslationErrorCode
    tag(1) detectedLanguage: string?
}
```

```csharp
public partial class TranslationException
    : SliceException
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

Slice exception inheritance maps to C# class inheritance:

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

### ConvertToInternalError

When the generated code decodes an exception from a payload, it sets the exception's
[ConvertToInternalError][convert-to-internal-error] property to `true`.

This way, when the implementation of an operation makes an invocation and this invocation throws an exception, by
default, this exception is not re-sent as-is but gets converted into a response with status code
[InternalError]. If you don't want this conversion, you need to catch the exception and set
`ConvertToInternalError` to `false`:

```csharp
try
{
    ...make invocation...
}
catch (DispatchException exception)
{
    // Don't convert to internal error.
    exception.ConvertToInternalError = false;
    throw;
}
```

[convert-to-internal-error]: csharp:IceRpc.DispatchException#IceRpc_DispatchException_ConvertToInternalError
[exception-specification]: operation#exception-specification
[sliced-format]: class-types#slicing

[SliceException]: csharp:ZeroC.Slice.SliceException
[InternalError]: csharp:IceRpc.StatusCode#IceRpc_StatusCode_InternalError

{% /slice1 %}
