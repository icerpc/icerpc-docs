---
title: Operation
description: Learn how to define operations in Slice.
---

## Operation components

An operation consists of:
 - a name (the name of operation)
 - a list of parameters (this list can be empty)
 - an arrow followed by a return type (optional)
 - an exception specification (optional)

For example:

```slice
greet(name: string) -> string throws GreeterException
```

Operation `greet` has all four components: a name (`greet`), a parameter (`name`), a return type (a string) and an
exception specification (it can throw a `GreeterException`).

## Operation parameters

Each operation parameter has a name and a type (specified as `name: Type`). Two parameters are separated by whitespace
or a single comma.

For example:

```slice
op() // no operation parameter

op(x: int32) // a single operation parameter

op(x: int32, y: int32) -> int32 // two operation parameters and a return value

// Another way to write the operation above
op(
    x: int32
    y: int32
) -> int32
```

### Tagged parameter

An operation parameter can have a tag, which makes this parameter a "tagged parameter". A tag consists of the `tag`
keyword plus a tag number in parenthesis. For example:

```slice
op(tag(1) x: int32?)
```

{% callout type="information" %}
A tag number is a positive integer, such as 0, 1, 77. The scope of a tag number is the parameter list of a specific
operation. For example, `tag(1)` in `opA`'s parameters is independent of `tag(1)` in `opB`'s parameters.
{% /callout %}

A tagged parameter must have an optional type (the `?` after `int32` in the example above). Such a parameter can appear
anywhere in the parameter list. For instance, the operation below has a valid though unusual parameter list:

```slice
op(
    tag(5) x: int32?
    y: int32
    tag(1) s: string?
)
```

A regular (non-tagged) parameter is a mandatory parameter: it's always encoded into the request payload by the sender
and decoded from the request payload by the recipient. If the sender and recipient don't agree on this operation
parameter--their Slice definitions are not the same--the decoding of the request arguments will fail.

On the other hand, a tagged parameter tolerates mismatches. The sender can send a tagged parameter that the recipient
doesn't know about (it will be ignored), and the recipient can expect a tagged parameter that the sender doesn't know
(the recipient will get a "not set" value).

{% callout type="information" %}
You can add and remove tagged parameters over time while maintaining on-the-wire compatibility. The only constraint
is you can never change the type associated with a tag number. If the type associated with tag 7 is a string, it must
always remain a string; if you were to reuse tag 7 with another type, you would break on the wire compatibility with
applications that expect tag 7 parameters to be encoded as strings.
{% /callout %}

## Operation return type

An operation can return nothing, a single type, or a return tuple. For example:

```slice
opNoReturn() // returns nothing (no arrow)

opReturnString() -> string // returns a string

opReturnTuple() -> (x: int32, y: int32) // returns a tuple
```

A return tuple is exactly like a parameter list with two or more elements.

### Tagged return

A return tuple can include tagged elements. For example:

```slice
op() -> (
    tag(5) x: int32?
    y: int32?
    tag(1) s: string?
)
```

The tag numbers and tag semantics are the same as for [tagged parameters](#tagged-parameter).

When an operation returns a single type, this return type can be tagged. For example:

```slice
// returns a tagged string
op() -> tag(1) string?
```

## Exception specification

An operation can include an exception specification after its return type, or after its parameter list if the operation
returns nothing.

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

This exception specification allows the operation to return (throw) a custom error when the implementation of the
operation fails. When the operation succeeds, it returns the return type and this exception specification is not used.

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
   `ValueTask<T>`.
 - the `features` parameter is nullable and defaults to null only in the client-side method
 - the cancellation token parameter has a default value only in the client-side method

### C# parameters

Each Slice operation parameter maps to a C# method parameter with the same name, in camel case. Its Slice parameter
type is mapped to a C# type. For example, an int32 parameter is mapped to an int parameter in C#, as described in
[Primitive types](primitive-types).

A parameter with an optional type (with a `?` suffix) is mapped to a parameter with a nullable C# type. Tagged
parameters are mapped exactly like regular parameters--the tag number has no effect on the C# API.

For example:

{% side-by-side alignment="top" %}
```slice {% addEncoding=true %}
module Example

interface Widget {
    spin(speed: int32, tag(1) bool? clockWise)
}
```

```csharp
namespace Example;

public partial interface IWidget
{
    Task SpinAsync(
        int speed,
        bool? clockWise = null,
        IFeatureCollection? features = null,
        CancellationToken cancellationToken = default);
}

public partial interface IWidgetService
{
    ValueTask SpinAsync(
        int speed,
        bool? clockWise,
        IFeatureCollection features,
        CancellationToken cancellationToken);
}
```
{% /side-by-side %}

### C# return type

When an operation returns nothing, the mapped client-side method returns a `Task` and the mapped service method returns
a `ValueTask`.

Otherwise, the mapped client-side method return a `Task<T>` and the mapped service method returns a `ValueTask<T>`.

For example:

{% side-by-side alignment="top" %}
```slice {% addEncoding=true %}
module Weather

interface Probe {
    getData() -> (
        temperature: float64
        windSpeed: int32
    )
}
```

```csharp
public partial interface IProbe
{
    Task<(double Temperature, int WindSpeed)> GetDataAsync(
        IFeatureCollection? features = null,
        CancellationToken cancellationToken = default);
}

public partial interface IProbeService
{
    ValueTask<(double Temperature, int WindSpeed)> GetDataAsync(
        IFeatureCollection features,
        CancellationToken cancellationToken);
}
```
{% /side-by-side %}

### Collection parameters and return values

In general, a Slice parameter or return value has exactly the same mapping when you send this parameter (resp. return
value) through a Slice operation and when you receive this parameter (resp. return value). For example, a Slice int32 is
always mapped to an C# int, a Slice string is always mapped to a C# string, etc.

Collection types are the exception: a sequence or dictionary parameter (resp. return value) has one mapping when it's
sent and a different mapping when it's received. This special mapping for outgoing values makes sending sequences and
dictionaries more convenient and occasionally faster.

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
