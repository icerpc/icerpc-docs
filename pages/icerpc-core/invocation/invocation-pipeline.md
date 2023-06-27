---
title: Invocation pipeline
description: Understand how to send requests and receive responses.
---

## Definition

The process of sending a request and receiving the corresponding response is called an invocation.

You would typically make invocations over client connections. Nevertheless, since client and server
[connections](../connection/client-vs-server-connections) have the same capabilities, you can also make invocations
the other way around, from the server-side of a connection to the client-side of this connection.

## The Invoker abstraction

With IceRPC, you always make an invocation by calling an invoker. An invoker is a simple abstraction with a single
`invoke` method that accepts an [outgoing request](outgoing-request) and returns an
[incoming response](incoming-response).

In C#, this abstraction is the `IInvoker` interface:

```csharp
namespace IceRpc;

public interface IInvoker
{
    Task<IncomingResponse> InvokeAsync(OutgoingRequest request, CancellationToken cancellationToken = default);
}
```

Both `ClientConnection` (C# LINK) and `ConnectionCache`(C# LINK) implement this interface. This allows you to make an
invocation by creating a client connection or a connection cache and then calling `InvokeAsync` on the resulting
instance:

```csharp
await using var clientConnection = new ClientConnection(new Uri("icerpc://hello.zeroc.com"));
using var request = new OutgoingRequest(...);

// Make an invocation by calling the IInvoker.InvokeAsync method implemented by ClientConnection.
IncomingRequest response = clientConnection.InvokeAsync(request);
```

## Invocation processing

It is common to perform additional processing on an invocation before giving it to a connection. For example, you may
want to compress the payloads of your requests, add a telemetry field to each request, add a timeout or deadline, or
simply add logging.

A invoker implementation can call `invoke` on another invoker, which itself calls `invoke` on another invoker, etc.; the
invoker used to make an invocation can be the head of a invoker chain or tree, known as a "invocation pipeline".

There are 3 common types of invokers:

 - **Leaf invoker**\
   It's a leaf in the invocation pipeline that implements `invoke` without the help of another invoker. This leaf
   invoker is typically a client connection or connection cache.

 - **Interceptor**\
    An [interceptor](interceptor) intercepts an invocation and forwards it to the "next" interceptor. IceRPC provides
    several built-it interceptors for logging, compression and more.

 - **Pipeline**\
    A [pipeline](pipeline) forwards a request through interceptors and a leaf invoker registered with this pipeline.

```mermaid
---
title: A typical invocation pipeline
---
flowchart LR
    app([application code]) -- request --> i1["interceptor #1"] -- request --> i2["interceptor #2"]
    i2 -- request --> ti["ClientConnection\n or ConnectionCache"] -- request --> connection
    connection -- response --> ti -- response --> i2 -- response --> i1 -- response --> app
```
