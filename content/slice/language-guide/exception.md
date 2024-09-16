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
{% aside alignment="top" %}

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

{% /aside %}

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

{% aside alignment="top" %}

```slice
exception TranslationException {
    errorCode: TranslationErrorCode
    tag(1) detectedLanguage: string?
}
```

```csharp
public partial class TranslationException :
    SliceException
{
    public TranslationErrorCode ErrorCode { get; set; }
    public string? DetectedLanguage { get; set; }

    // Parameterless constructor
    public TranslationException()
    {
    }

    // Primary constructor
    public TranslationException(
        TranslationErrorCode errorCode,
        string? detectedLanguage)
    {
        this.ErrorCode = errorCode;
        this.DetectedLanguage = detectedLanguage;
    }

    // Secondary constructor
    public TranslationException(
        TranslationErrorCode errorCode)
    {
        this.ErrorCode = errorCode;
    }
}
```

{% /aside %}

The mapped C# class provides a parameterless constructor and a primary constructor which sets all the fields. If any
field has an optional type, the mapped class also provides a secondary constructor with a parameter for each
non-nullable C# field.

Slice exception inheritance maps to C# class inheritance:

{% aside alignment="top" %}

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
    public int ErrorCode { get; set; }

    public BaseException()
    {
    }

    public BaseException(int errorCode)
    {
        this.ErrorCode = errorCode;
    }
}

public partial class DerivedException : BaseException
{
    public double Measurement { get; set; }

    public DerivedException()
    {
    }

    public DerivedException(
        int errorCode,
        double measurement)
        : base(errorCode)
    {
        this.Measurement = measurement;
    }
}
```

{% /aside %}

[exception-specification]: operation#exception-specification
[sliced-format]: class-types#slicing

[SliceException]: csharp:ZeroC.Slice.SliceException

{% /slice1 %}
