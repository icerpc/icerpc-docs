---
title: Result types
description: Learn how to define and use results in Slice.
---

## Result

Result is a built-in generic type that either holds a Success value or a Failure value, where `Success` and `Failure`
are type parameters.

You can construct a result inline, without giving it a name, usually to specify the return type of an operation. For
example:

```slice
module VisitorCenter

interface Greeter {
    greet(name: string) -> Result<string, GreeterError>
}

/// The errors returned by the Greeter.
unchecked enum GreeterError {
    EmptyName
    NameTooLong(maxLength: int32)
    Away(until: WellKnownTypes::TimeStamp)
}
```

You can also use a constructed result as the type of a field, the element type of a sequence, the type of an operation
parameter, and so on, just like any other Slice type.

A result is conceptually equivalent to a compact variant enum with two variants (`Success` and `Failure`), each with a
single field of the associated type. You can see `Result<string, GreeterError>` as a convenient way to reference:

```slice
compact enum Result<string, GreeterError> { // not a valid Slice identifier
    Success(value: string)
    Failure(value: GreeterError)
}
```

## C# mapping

`Result<Success, Failure>` maps to `Result<TSuccess, TFailure>`, where [Result<TSuccess, TFailure>] is a C# [union] in
the ZeroC.Slice namespace. Its two case types are the record classes [`Success<T>`] and [`Failure<T>`], also in the
ZeroC.Slice namespace.

The Slice type parameters are mapped to C# type parameters, following the usual mapping rules. For example:

| Slice                                      | C# mapping                 |
| ------------------------------------------ | -------------------------- |
| `Result<string, int32>`                    | `Result<string, int>`      |
| `Result<WellKnownTypes::TimeStamp, int32>` | `Result<DateTime, int>`    |
| `Result<string?, varint32>`                | `Result<string?, int>`     |
| `Result<MyStruct, MyEnum>`                 | `Result<MyStruct, MyEnum>` |

You create a result by constructing a `Success<T>` or a `Failure<T>`, which both convert implicitly to the result type.
For example:

```csharp
Result<string, GreeterError> success = new Success<string>("hello");
Result<string, GreeterError> failure = new Failure<GreeterError>(new GreeterError.EmptyName());
```

The static class [Result] provides two factory methods, `FromSuccess` and `FromFailure`, that infer the type argument
from the value: `Result.FromSuccess("hello")` is equivalent to `new Success<string>("hello")`. With a variant enum
value, construct the case directly, as in the example above: `Result.FromFailure(new GreeterError.EmptyName())` infers
`Failure<GreeterError.EmptyName>`, which does not convert to `Result<string, GreeterError>`.

You process a result with a `switch` expression on its case types. For example, you can process the
`Result<string, GreeterError>` shown earlier with the following code:

```csharp
string message = result switch
{
    Success<string>(var greeting) => greeting,
    Failure<GreeterError>(var error) => error switch
    {
        GreeterError.Away away => $"Away until {away.Until.ToLocalTime()}",
        _ => $"{error}",
    },
};
```

[`Failure<T>`]: csharp:ZeroC.Slice.Failure-1
[Result]: csharp:ZeroC.Slice.Result
[Result<TSuccess, TFailure>]: csharp:ZeroC.Slice.Result-2
[`Success<T>`]: csharp:ZeroC.Slice.Success-1
[union]: https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/union
