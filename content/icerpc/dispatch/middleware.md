---
title: Middleware
description: Understand how to install and write a middleware.
---

## Intercepting incoming requests

A middleware is a piece of code that intercepts an incoming request before this request reaches the target service. The
same code also intercepts the outgoing response provided by the service before it's sent back to the caller.

At a more technical level, a middleware is a [dispatcher](dispatch-pipeline#the-dispatcher-abstraction) that holds
another dispatcher ("next") and calls `dispatch` on this next dispatcher as part of the implementation of its own
`dispatch` method. The next dispatcher can be another middleware, a service, a router, or some other kind of dispatcher;
as far as the middleware is concerned, it's just another dispatcher.

A middleware can include logic before calling `dispatch` on the next dispatcher (before the request is processed) and
after calling `dispatch` on the next dispatcher (after it receives the response). A middleware can also short-circuit
the dispatch pipeline by returning a cached response or by returning an error (a response with a status code other
than `Ok`).

For example, a simple C# middleware could look like:

```csharp
public class SimpleMiddleware : IDispatcher
{
    private readonly IDispatcher _next;

    public SimpleMiddleware(IDispatcher next) => _next = next;

    public async ValueTask<OutgoingResponse> DispatchAsync(
        IncomingRequest request,
        CancellationToken cancellationToken)
    {
        Console.WriteLine("before _next.DispatchAsync");
        OutgoingResponse response = await _next.DispatchAsync(request, cancellationToken);
        Console.WriteLine($"after _next.DispatchAsync; the response status code is {response.StatusCode}");
        return response;
    }
}
```

## Installing a middleware

You can use a [Router](router) to create a dispatch pipeline and install one or more middleware in this dispatch
pipeline.
