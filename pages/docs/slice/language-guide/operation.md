---
title: Operation
description: Learn how to define operations in Slice.
---

## Anatomy of an operation

An operation consists of:
 - a name (the name of operation)
 - a list of [parameters][parameters] (the operation parameters)
 - an arrow followed by one or more return [parameters][parameters] (optional)
 - an [exception specification](#exception-specification) (optional)

For example:

```slice
greet(name: string) -> string throws GreeterException
```

Operation `greet` has all four components: a name (`greet`), an operation parameter (`name`), a nameless return
parameter and an exception specification (it can throw a `GreeterException`).

Here are a few additional examples:

```slice
op() // no operation parameter

op(x: int32) // a single operation parameter

op(x: int32, y: int32) -> int32 // two operation parameters and a return parameter

// Another way to write the operation above
op(
    x: int32
    y: int32
) -> int32

opNoReturn() // returns nothing (no ->)

opReturnString() -> string // returns a string

opReturnPair() -> (x: int32, y: int32) // returns two return parameters
```

## Tagged parameters

The operation parameters and return parameters can include [tagged parameters][tagged-parameters]. For example:

```slice
// An operation with many tagged parameters.
op(
    tag(5) x: int64?
    is: string
) -> (
    tag(5) x: int32?
    y: int32?
    tag(1) s: string?
)
```

A single nameless return parameter can also get tagged. For example:

```slice
// returns a tagged string
op() -> tag(1) string?
```

## Exception specification

An operation can include an exception specification after its return parameter(s), or after the operation parameters if
the operation returns nothing.

{% slice1 %}
An exception specification consists of the `throws` keyword followed by an exception name or the `AnyException` keyword.
{% /slice1 %}
{% slice2 %}
An exception specification consists of the `throws` keyword followed by an exception name.
{% /slice2 %}

For example:

```slice
translate(input: string) -> string throws TranslationException
```

This exception specification allows the operation to return a custom error when the implementation of the operation
fails. When the operation succeeds, it returns the return parameters and this exception specification is not used.

{% slice1 %}
This custom error can be the exception after the `throws` or any Slice exception derived from this exception.
`AnyException` means the operation can return (throw) any Slice exception as a custom error.
{% /slice1 %}

{% callout type="information" %}
Don't read too much in the terms "exception" and "throws". An exception specification is about sending a custom error
in a response as an alternative to the return value. This custom error maps to an exception thats gets thrown in
programming languages with exceptions (such as C#). In programming languages without exceptions (such as Rust), there is
no exception or throwing: the exception is just a custom error.
{% /callout %}

## Idempotent operation

An operation can be marked as idempotent, which means calling this operation several times with the same arguments is
semantically equivalent to calling this operation once.

For example:

```slice
idempotent setTemperature(newValue: float64) throws ThermostatException
```

Setting the temperature over-and-over to the same value is like setting it once.

The `idempotent` keyword ensures that both the caller and the implementation of the service have compatible
understandings of the idempotent-ness of this operation. If the caller believes an operation is idempotent, the service
implementation must see and treat this operation as idempotent too.

## C# mapping

A Slice operation named *opName* in interface `Greeter` is mapped to abstract method *OpName*Async in the interface
`IGreeter` and to abstract method *OpName*Async in interface `IGreeterService`.

The mapped method name is always in Pascal case, per the usual C# naming conventions, even when *opName* is not in
Pascal case.

For example:

{% side-by-side alignment="top" %}
```slice {% addEncoding=true %}
module VisitorCenter

// An interface with a single operation.
interface Greeter {
    greet(name: string) -> string
}
```

```csharp
namespace VisitorCenter;

public partial interface IGreeter
{
    Task<string> GreetAsync(
        string name,
        IFeatureCollection? features = null,
        CancellationToken cancellationToken = default);
}

public partial interface IGreeterService
{
    ValueTask<string> GreetAsync(
        string name,
        IFeatureCollection features,
        CancellationToken cancellationToken);
}
```
{% /side-by-side %}

While the two methods are similar, please note they are not the same:
 - the client-side method returns a `Task` or `Task<T>` while the service method returns a `ValueTask` or
   `ValueTask<T>`
 - the `features` parameter is nullable and defaults to null only in the client-side method
 - the cancellation token parameter has a default value only in the client-side method

### Collection parameters

TODO: move to sequence/dictionary pages

In general, a Slice parameter has exactly the same mapping when you send this parameter through a Slice operation and
when you receive this parameter. For example, a Slice int32 is always mapped to an C# int, a Slice string is always
mapped to a C# string, etc.

Collection types are the exception: a sequence or dictionary parameter has one mapping when it's sent and a different
mapping when it's received. This special mapping for outgoing values makes sending sequences and dictionaries more
convenient and occasionally faster.

#### Sequence of bool or fixed-size numeric type

| Mapping for outgoing values | Default mapping for incoming values |
|-----------------------------|-------------------------------------|
| `ReadOnlyMemory<T>`         | `T[]`                               |

{% slice2 %}
{% callout type="information" %}
This mapping also applies to Slice enums whose underlying type is fixed-size.
{% /callout %}
{% /slice2 %}

#### Other sequences

| Mapping for outgoing values | Default mapping for incoming values |
|-----------------------------|-------------------------------------|
| `IEnumerable<T>`            | `T[]`                               |

#### Dictionary

| Mapping for outgoing values              | Default mapping for incoming values |
|------------------------------------------|-------------------------------------|
| `IEnumerable<KeyValuePair<TKey, TValue>>`| `Dictionary<TKey, Value>`           |

### Request and Response helper classes

The Slice compiler generates helper nested static classes named Request and Response in *Name*Proxy and I*Name*Service.
These nested classes provide helper methods to encode and decode the payloads of requests and responses associated with
the interface operations, with up to 4 helper methods per operation.

For example:
```slice
module VisitorCenter

interface Greeter {
    greet(name: string) -> string
}
```

produces 4 helper methods:

```csharp
public readonly partial record struct GreeterProxy : IGreeter, IProxy
{
    public static class Request
    {
        // Encodes the name argument into a request payload (a PipeReader).
        public static PipeReader EncodeGreet(string name, SliceEncodeOptions? encodeOptions = null)
        {
            ...
        }
    }

    public static class Response
    {
        // Decodes the response payload into a string (the greeting).
        public static ValueTask<string> DecodeGreetAsync(
            IncomingResponse response,
            OutgoingRequest request,
            GenericProxy sender,
            CancellationToken cancellationToken)
        {
            ...
        }
    }
}

public partial interface IGreeterService
{
    public static class Request
    {
        // Decodes the name argument from the request payload.
        public static ValueTask<string> DecodeGreetAsync(IncomingRequest request, CancellationToken cancellationToken)
        {
            ...
        }
    }

    public static class Response
    {
        // Encodes the greeting return value into a response payload.
        public static PipeReader EncodeGreet(string returnValue, SliceEncodeOptions? encodeOptions = null)
        {
            ...
        }
    }
}
```

{% slice2 %}
{% callout type="information" %}
If your operation has a stream parameter, the encode helper (in *NameProxy*.Request) does not encode the stream
argument; however, the decode helper (in I*Name*Service.Request) decodes all arguments, including the stream.

Likewise, if your operation returns a stream, the encode helper (in I*Name*Service.Response) does not encode the stream
return value, while the decode helper (in *Name*Proxy.Response) decodes everything.
{% /callout %}
{% /slice2 %}

These helper methods allow you to create/consume plain IceRPC requests and responses while still using the generated
code for their payloads.

[parameters]: parameters-and-fields
[tagged-parameters]: parameters-and-fields#tagged-parameters-and-fields
