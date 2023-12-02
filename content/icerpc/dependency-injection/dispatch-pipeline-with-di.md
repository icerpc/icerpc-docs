---
title: Dispatch pipeline with DI
description: Understand how to build your dispatch pipeline with a DI container.
---

## Traditional dispatch pipeline

A traditional dispatch pipeline is fairly static: you create a [router](../dispatch/router), add a few middleware, map
or mount a small number of leaf dispatchers in this router and then let your server dispatch incoming requests to this
router.

The leaf dispatchers (typically Slice services) are mapped or mounted at fixed path (such as `/greeter` or
`/admin/greeter-manager`). These dispatchers are singletons (or singleton-like) with the same lifetime as the router and
the server.

The middleware in your dispatch pipeline communicate with each others using [features]: an upstream middleware sets a
feature that a downstream middleware can retrieve. The leaf dispatcher can also communicate with these middleware using
the same features.

This works well for many applications. However, this is not the typical model when using DI.

## Dispatch pipeline with a DI container

With DI, a dispatch pipeline is typically more dynamic: some infrastructure code creates a unique DI scope for each
dispatch and the leaf dispatcher is a service managed by your DI container. This leaf dispatcher is created on-demand
(per dispatch) when its lifetime is transient or scoped.

A middleware in your DI dispatch pipeline can use features as usual to communicate with other middleware and the leaf
dispatcher. However, a more idiomatic approach is to communicate using injected services. For example:
 - an upstream middleware receives a scoped service (via injection) and then fills-in this service
 - a downstream middleware receives the same scoped service (also via injection) and reads the information filled-in by
 the upstream middleware
 - the constructor of the leaf dispatcher (a scoped or transient service) is auto-wired with this previously filled
scoped service

The chain of middleware is itself static: each dispatch does not create new middleware instances. The middleware are
typically singletons managed by the DI container.

## Building a dispatch pipeline with Microsoft's DI container

The [IceRpc.Extensions.DependencyInjection] assembly, provides a number of extension methods for
[IServiceCollection] that accept an `Action<IDispatcherBuilder>` parameter.

All these methods allow you to build and configure a dispatch pipeline for Microsoft's DI container. For example:

```csharp
// Construct a dispatch pipeline using Microsoft's DI container.

using IceRpc.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection;
...

// Add a new IDispatcher singleton configured with an action.
services.AddIceRpcDispatcher(builder => builder.Map<IGreeterService>());
```

The resulting dispatcher (dispatch pipeline) creates a new DI scope for each incoming request, and transmits this scope
to downstream dispatchers using an [IServiceProviderFeature].

## Installing a standard middleware in an IDispatcherBuilder

A standard middleware is a middleware that can be used with or without a DI container: it does not rely on a DI
container injecting services to operate, and it implements interface `IDispatcher`.

All the middleware that ship with IceRPC are standard middleware: you can use them with or without DI, and they use
features for communications within a dispatch.

These middleware can be installed in a [Router] or an [IDispatcherBuilder]. For
example:

```csharp
// Construct a dispatch pipeline using Microsoft's DI container.

using IceRpc.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection;
...

services.AddIceRpcDispatcher(
    builder => builder
        .UseLogger()
        .Map<IGreeterService>());
```

Here, `UseLogger` is an extension method provided by the `IceRpc.Logger` assembly. This extension method works with any
DI container that implements [IServiceProvider], such as Microsoft's DI container and [Simple
Injector](https://simpleinjector.org/)'s container.

The implementation of `UseLogger` simply retrieves a logger instance from the DI container and then creates a new
middleware with this instance:

```csharp
public static IDispatcherBuilder UseLogger(this IDispatcherBuilder builder) =>
    builder.ServiceProvider.GetService(typeof(ILogger<LoggerMiddleware>)) is ILogger logger ?
        builder.Use(next => new LoggerMiddleware(next, logger)) :
        throw new InvalidOperationException(
            $"Could not find service of type '{nameof(ILogger<LoggerMiddleware>)}' in the service container.");
```

We recommend you follow the same pattern when you create your own standard middleware and provide `Use` extension
methods for both `Router` and `IDispatcherBuilder`.

{% callout type="note" %}
Calling the DI container at runtime is typically discouraged—it's the service locator anti-pattern. Here, you should
see the `UseLogger` extension method as infrastructure code exempt from this rule.
{% /callout %}

## Middleware with injected services

Instead of providing a standard middleware, you can create a middleware that communicates with other middleware and the
leaf dispatcher via services injected by a DI container.

Such a DI-friendly middleware needs to implement one of the following `IMiddleware` interfaces:
- [IMiddleware<TDep>](csharp:IceRpc.Extensions.DependencyInjection.IMiddleware-1)
- [IMiddleware<TDep1, TDep2>](csharp:IceRpc.Extensions.DependencyInjection.IMiddleware-2)
- [IMiddleware<TDep1, TDep2, TDep3>](csharp:IceRpc.Extensions.DependencyInjection.IMiddleware-3)

For example, say we want to reimplement the deadline middleware in a more DI-friendly fashion. The standard deadline
middleware reads the deadline field and creates a deadline feature to communicate this deadline to downstream middleware
and the leaf dispatcher. Our new DI-friendly deadline middleware decodes the deadline and saves this information in an
injected scoped service:

```csharp
// Configured as a scoped service in the composition root of the application.
public class DeadlineInformation
{
    public DateTime Value { get; set; } = DateTime.MinValue; // MinValue means no deadline.
}
...

// New DI-friendly deadline middleware. Note that it does not implement IDispatcher.
public class DIDeadlineMiddleware : IMiddleware<DeadlineInformation>
{
    private readonly IDispatcher _next;

    // A constructor with an IDispatcher parameter is required for auto-wiring.
    public DIDeadlineMiddleware(IDispatcher next) => _next = next;

    // deadlineInfo is a scope service provided by the DI container.
    public ValueTask<OutgoingResponse> DispatchAsync(
        IncomingRequest request,
        DeadlineInformation deadlineInfo,
        CancellationToken cancellationToken)
    {
        // Decode the deadline field as usual.
        DateTime deadline = request.Fields.DecodeValue(
            RequestFieldKey.Deadline,
            (ref SliceDecoder decoder) => decoder.DecodeTimeStamp());

        if (deadline != DateTime.MinValue)
        {
            // If deadline is not MinValue, store it in deadlineInfo
            deadlineInfo.Value = deadline;

            // TODO: enforce deadline while calling _next.DispatchAsync.
        }
        else
        {
            // Call _next.DispatchAsync as usual.
            return _next.DispatchAsync(request, cancellationToken);
        }
    }
}
```

If you use Microsoft's DI container, you can install this middleware with the `UseMiddleware` extension method provided
by the `IceRpc.Extensions.DependencyInjection` assembly:

```csharp
using IceRpc.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection;
...

// The DIDeadlineMiddleware is instantiated and managed by the DI container.
services.AddIceRpcDispatcher(
    builder => builder
        .UseLogger()
        .UseMiddleware<DIDeadlineMiddleware>()
        .Map<IGreeterService>());

// Implements IGreeterService and is registered as a transient or scoped service in the DI container.
internal class Chatbot : Service, IGreeterService
{
    // DeadlineInformation is auto-wired by the DI container.
    internal Chatbot(DeadlineInformation deadlineInfo)
    {
        ...
    }
    ...
}
```

[features]: ../dispatch/incoming-request#request-features

[IServiceCollection]: https://learn.microsoft.com/en-us/dotnet/api/microsoft.extensions.dependencyinjection.iservicecollection
[IServiceProvider]: https://learn.microsoft.com/en-us/dotnet/api/system.iserviceprovider
[IceRpc.Extensions.DependencyInjection]: https://github.com/icerpc/icerpc-csharp/tree/0.1.x/src/IceRpc.Extensions.DependencyInjection

[Router]: csharp:IceRpc.Router
[IDispatcherBuilder]: csharp:IceRpc.Extensions.DependencyInjection.IDispatcherBuilder
[IServiceProviderFeature]: csharp:IceRpc.Extensions.DependencyInjection.IServiceProviderFeature
