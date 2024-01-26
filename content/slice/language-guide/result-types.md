---
title: Result types
description: Learn how to define and use results in Slice.
---

{% slice1 %}
The built-in generic type Result<Success, Failure> is not available with Slice1.
{% /slice1 %}

{% slice2 %}

## Result

A result is a built-in generic type that holds either a Success value or a Failure value, where `Success` and `Failure`
are type parameters.

You construct a result inline, without giving it a name, usually to specify the return type of an operation. For
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

You can also use a constructed result as the type of a field, as the element type in a sequence, as the type of an
operation parameter, and so on, just like any other Slice type.

A result is conceptually equivalent to a compact enum with two enumerators (`Success` and `Failure`), each with a single
field with the associated type. You can see `Result<string, GreeterError>` as a convenient way to reference:

```slice
compact enum Result<string, GreeterError> { // not a valid Slice identifier
    Success(value: string)
    Failure(value: GreeterError)
}
```

## C# mapping

A `Result<Success, Failure>` maps to the a `Result<TSuccess, TFailure>`, where [Result<TSuccess, TFailure>] is a C#
record class in namespace ZeroC.Slice.

The Slice type parameters are mapped to C# type parameters, following the usual mapping rules. For example:

| Slice                                      | C# mapping                          |
|--------------------------------------------|-------------------------------------|
| `Result<string, int32>`                    | `Result<string, int>`               |
| `Result<WellknownTypes::TimeStamp, int32>` | `Result<DateTime, int>`             |
| `Result<string?, varint32>`                | `Result<string?, int>`              |
| `Result<MyStruct, MyEnum>`                 | `Result<MyStruct, MyEnum>`          |

The C# Result record class is a discriminated union with a number of helper methods provided by [Dunet].

For example, you can process the `Result<string, GreeterError>` shown earlier with the following code:

```csharp
// Match and MatchAway are methods generated Dunet.
string message = result.Match(
    success => success.Value,
    failure => failure.Value.MatchAway(
        away => $"Away until {away.Until.ToLocalTime()}",
        () => $"{failure.Value}"));
```

{% /slice2 %}

[Dunet]: https://github.com/domn1995/dunet
[Result<TSuccess, TFailure>]: csharp:ZeroC.Slice.Result
