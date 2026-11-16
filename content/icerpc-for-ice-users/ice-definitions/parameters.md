---
title: Parameters and return values
description: Learn how Ice parameters and return values are mapped to C#
---

## In parameters

An in parameter is mapped to a C# parameter with the same name converted to camel case; its type is the mapped C# type.

For example, an Ice parameter `string name` is mapped to a C# parameter `string name`.

## Out parameters and return values

Out parameters and return values are mapped to the result of the `Task` or `ValueTask` returned by the C# method. When
the operation returns a single value (a return value and no out parameter, or a single out parameter and no return
value), this result is the mapped C# type of this value. For example, both `string getName()` and
`void getName(out string name)` map to a client-side method that returns `Task<string>`.

When the operation returns two or more values, these values are mapped to tuple elements. The return value (if any)
appears before the out parameters in the tuple, and is named `ReturnValue`.

Consider this example:

```ice
interface Example
{
    double op(int inP1, string inP2, out bool outP1, out long outP2);
}
```

The Ice compiler generates the following C# code for this interface:

```csharp
// Client-side interface
public partial interface IExample
{
    Task<(double ReturnValue, bool OutP1, long OutP2)> OpAsync(
        int inP1,
        string inP2,
        IceRpc.Features.IFeatureCollection? features = null,
        CancellationToken cancellationToken = default);
}

// Client-side proxy struct
public readonly partial record struct ExampleProxy : IExample, IIceProxy { ... }

// Server-side interface
public partial interface IExampleService
{
    ValueTask<(double ReturnValue, bool OutP1, long OutP2)> OpAsync(
        int inP1,
        string inP2,
        IceRpc.Features.IFeatureCollection features,
        CancellationToken cancellationToken);
}
```

## Optional parameters

The mapping for optional parameters is the same as for required parameters, except each mapped C# type is nullable,
where null represents "not set".

There is one exception for the values you send, namely the parameters of the client-side method and the return value
and out parameters of the server-side method: an optional sequence of bool or numeric type without `"cs:generic"`
metadata maps to `ReadOnlyMemory<T>`, like a required sequence. A default `ReadOnlyMemory<T>`, such as one created from
a null array, represents "not set", while a `ReadOnlyMemory<T>` created from an empty array represents an empty
sequence.

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
