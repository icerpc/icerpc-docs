---
title: Invocation pipeline with DI
description: Understand how to build your invocation pipeline with a DI container.
---

## Building an invocation pipeline with Microsoft's DI container

You can call [AddIceRpcInvoker](csharp:IceRpc.Extensions.DependencyInjections.InvokerServiceCollectionExceptions.AddIceRpcInvoker) to add a new invoker (invocation pipeline) singleton to your DI container.

For example:

```csharp
// Construct an invocation pipeline using Microsoft's DI container.

using IceRpc.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection;
...

// Add a new IInvoker singleton configured with an action.
services
    .AddIceRpcClientConnection()
    .AddIceRpcInvoker(builder => builder.Into<ClientConnection>())
```

You must specify a final invoker with the `Into` method. With this example, the new invoker flows into the
`ClientConnection` singleton we configured earlier.

{% callout type="information" %}
The resulting invoker does not create a new DI scope when sending requests.
{% /callout %}
## Installing an interceptor in an IInvokerBuilder

All the interceptors bundled with IceRPC can be used with or without DI, and use features for communications within
an invocation. For example, the retry interceptor communicates with a connection cache using an
[IServerAddressFeature](csharp:IceRpc.Features.IServerAddressFeature) to coordinate retries over replicated servers.

These interceptors can be installed into a [Pipeline](csharp:IceRpc.Pipeline) or an
[IInvokerBuilder](csharp:IceRpc.Extensions.DependencyInjection.IInvokerBuilder).

For example:

```csharp
// Construct an invocation pipeline using Microsoft's DI container.

using IceRpc.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection;
...

// Add a new IInvoker singleton configured with an action.
services
    .AddIceRpcClientConnection()
    .AddIceRpcInvoker(builder =>
        builder
            .UseLogger()
            .Into<ClientConnection>())
```

Here, `UseLogger` is an extension method provided by the `IceRpc.Logger` assembly. This extension method works with any
DI container that implements
[IServiceProvider](https://learn.microsoft.com/en-us/dotnet/api/system.iserviceprovider), such as
Microsoft's DI container and [Simple Injector](https://simpleinjector.org/)'s container.

The implementation of the `UseLogger` method simply retrieves a logger instance from the DI container and then create
a new interceptor with this instance:

```csharp
public static IInvokerBuilder UseLogger(this IInvokerBuilder builder) =>
    builder.ServiceProvider.GetService(typeof(ILogger<LoggerInterceptor>)) is ILogger logger ?
        builder.Use(next => new LoggerInterceptor(next, logger)) :
        throw new InvalidOperationException(
            $"Could not find service of type '{nameof(ILogger<LoggerInterceptor>)}' in the service container.");
```

We recommend you follow the same pattern when you create your own interceptor.

{% callout type="information" %}
Calling the DI container at runtime is typically discouraged--it's the service locator anti-pattern. Here, you should
see the `UseLogger` extension method as infrastructure code exempt from this rule.
{% /callout %}
