---
title: Parameters and return values
description: Learn how Ice parameters and return values are mapped to C#
---

## In parameters

An in parameter is mapped to a C# parameter with the same name, with name converted to camel case; its type is the
mapped C# type.

For example, an Ice parameter `string name` is mapped to a C# parameter `string name`.

## Out parameters and return values

Out parameters and return values are mapped to tuple elements of the `Task` or `ValueTask` return value. The return
value (if any) appears before the out parameters in the tuple, and is named `ReturnValue`.

Consider this example:

```ice
interface Example
{
    double op(int inp1, string inp2, out bool outp1, out long outp2);
}
```

The Ice compiler generates the following C# code for this interface:

```csharp
// Client-side interface
public partial interface IExample
{
    Task<(double ReturnValue, bool Outp1, long Outp2)> OpAsync(
        int inp1,
        string inp2,
        IceRpc.Features.IFeatureCollection? features = null,
        CancellationToken cancellationToken = default);
}

// Client-side proxy struct
public readonly partial record struct ExampleProxy : IExample, IIceProxy { ... }

// Server-side interface
public partial interface IExampleService
{
    ValueTask<(double ReturnValue, bool Outp1, long Outp2)> OpAsync(
        int inp1,
        string inp2,
        IceRpc.Features.IFeatureCollection features,
        CancellationToken cancellationToken);
}
```

## Optional parameters

The mapping for optional parameters is the same as for required parameters, except each mapped C# type is nullable,
where null represents "not set".

Consider the following operation:

```ice
optional(1) int execute(optional(2) string parameters, out optional(3) float value);
```

The corresponding C# client-side method is:

```csharp
Task<(int? ReturnValue, float? Value)> ExecuteAsync(
    string? parameters,
    IceRpc.Features.IFeatureCollection? features = null,
    CancellationToken cancellationToken = default);
```

and the corresponding C# server-side method is:

```csharp
ValueTask<(int? ReturnValue, float? Value)> ExecuteAsync(
    string? parameters,
    IceRpc.Features.IFeatureCollection features,
    CancellationToken cancellationToken);
```
