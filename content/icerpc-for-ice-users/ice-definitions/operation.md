---
title: Operation
description: Learn how Ice operations are mapped to C#
---

An Ice operation named *opName* in interface `Greeter` is mapped to abstract method *OpName*Async in the interface
`IGreeter` and to abstract method *OpName*Async in interface `IGreeterService`.

The mapped method name is always in Pascal case, per the usual C# naming conventions, even when *opName* is not in
Pascal case.

For example:

{% aside alignment="top" %}

```ice
module VisitorCenter
{
    // An interface with a single operation.
    interface Greeter
    {
        string greet(string name);
    }
}
```

```csharp
namespace VisitorCenter
{
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
}
```

{% /aside %}

While the two methods are similar, please note they are not the same:

- the client-side method returns a `Task` or `Task<T>` while the service method returns a `ValueTask` or `ValueTask<T>`
- the `features` parameter is nullable and defaults to null only in the client-side method
- the cancellation token parameter has a default value only in the client-side method

## Request and Response helper classes

The Ice compiler generates helper nested static classes named Request and Response in *Name*Proxy and I*Name*Service.
These nested classes provide helper methods to encode and decode the payloads of requests and responses associated with
the interface operations, with 4 helper methods per operation.

For example:

```ice
module VisitorCenter
{
    interface Greeter
    {
        string greet(string name);
    }
}
```

produces 4 helper methods:

```csharp
public readonly partial record struct GreeterProxy : IGreeter, IIceProxy
{
    public static class Request
    {
        // Encodes the name argument into a request payload (a PipeReader).
        public static PipeReader EncodeGreet(string name, IceEncodeOptions? encodeOptions = null)
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
            IIceProxy sender,
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
        public static ValueTask<string> DecodeGreetAsync(
            IncomingRequest request,
            CancellationToken cancellationToken)
        {
            ...
        }
    }

    public static class Response
    {
        // Encodes the greeting return value into a response payload.
        public static PipeReader EncodeGreet(string returnValue, IceEncodeOptions? encodeOptions = null)
        {
            ...
        }
    }
}
```

## marshaled-result metadata directive

The `"marshaled-result"`[marshaled-result] metadata directive allows you to change the return type of the mapped
method on the generated Service interface: `marshaled-result` makes this method return a `ValueTask<PipeReader>`
instead of the usual `ValueTask<T>`.

The returned [PipeReader] represents the encoded return value. You would typically produce this value using
the Encode*OpName* method provided by the helper [`Response` class](#request-and-response-helper-classes).

There are two somewhat common use-cases for this directive:

1. You want to encode a mutable collection field of your class (such as `List<T>`) while holding a mutex lock; this
    lock prevents other operations from modifying this field while it's being encoded.
2. You want to return over and over the same return value that is costly to encode; this metadata directive allows you
    to encode the return value once, cache the encoded bytes and then return over and over these bytes.

[marshaled-result]: https://docs.zeroc.com/ice/3.8/csharp/slice-metadata-directives#SliceMetadataDirectives-marshaled-result
[PipeReader]: https://learn.microsoft.com/en-us/dotnet/api/system.io.pipelines.pipereader
