---
title: Exception
description: Learn how Ice exceptions are mapped to C#
---

An Ice exception maps to a public C# class with the same name. If the exception doesn't derive from another exception,
the mapped class derives from [IceException], the base class for all C# Ice exceptions.

For example:

{% aside alignment="top" %}

```ice
exception TranslationException
{
    int errorCode;
    optional(1) string detectedLanguage;
}
```

```csharp
public partial class TranslationException :
    IceException
{
    public int ErrorCode { get; set; }
    public string? DetectedLanguage { get; set; }

    // Parameterless constructor
    public TranslationException()
    {
    }

    // Primary constructor
    public TranslationException(
        int errorCode,
        string? detectedLanguage)
    {
        this.ErrorCode = errorCode;
        this.DetectedLanguage = detectedLanguage;
    }
}
```

{% /aside %}

The mapped C# class provides a parameterless constructor and a primary constructor which sets all the fields.

Ice exception inheritance maps to C# class inheritance:

{% aside alignment="top" %}

```ice
exception BaseException
{
    int errorCode;
}

exception DerivedException extends BaseException
{
    double measurement;
}
```

```csharp
public partial class BaseException : IceException
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

[IceException]: csharp:IceRpc.Ice.IceException
