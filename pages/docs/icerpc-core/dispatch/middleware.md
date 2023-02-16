---
title: Middleware
description: Learn how to write a middleware.
---

{% title /%}

## Definition

A middleware is nothing more than a [dispatcher](../dispatch-pipeline#the-dispatcher-abstraction) that holds another
dispatcher ("next") and calls `dispatch` on this next dispatcher as part of the implementation of its own `dispatch`
method. The next dispatcher can be another middleware, a service, a router, or some other kind of dispatcher, it doesn't
matter.

A middleware can include logic before calling `dispatch` on the next dispatcher (before the request is processed) and
after calling `dispatch` on the next dispatcher (after it receives the response). A middleware can also short-circuit
the dispatch pipeline by throwing an exception or returning a cached response.

For example, a simple C# middleware could look like:

```csharp
public class SimpleMiddleware : IDispatcher
{
    private readonly IDispatcher _next;

    public SimpleMiddleware(IDispatcher next) => _next = next;

    public async ValueTask<OutgoingResponse> DispatchAsync(IncomingRequest request, CancellationToken cancellationToken)
    {
        Console.WriteLine("before _next.DispatchAsync");
        OutgoingResponse response = await _next.DispatchAsync(request, cancellationToken);
        Console.WriteLine($"after _next.DispatchAsync; the response status code is {response.StatusCode}");
        return response;
    }
}
```

## Installing a middleware

You can use a [router](router) to create a dispatch pipeline and install one or more middleware in this pipeline.
