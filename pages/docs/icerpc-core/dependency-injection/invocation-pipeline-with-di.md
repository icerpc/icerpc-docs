---
title: Invocation pipeline with DI
description: Understand how to create an invocation pipeline using a DI container.
---

## Building an invocation pipeline with Microsoft's DI container

The [AddIceRpcInvoker](https://api.testing.zeroc.com/csharp/api/Microsoft.Extensions.DependencyInjection.IceRpcServiceCollectionExtensions.html#Microsoft_Extensions_DependencyInjection_IceRpcServiceCollectionExtensions_AddIceRpcInvoker_Microsoft_Extensions_DependencyInjection_IServiceCollection_System_Action_IceRpc_Builder_IInvokerBuilder__)
extension method, provided by IceRPC's extensions for Microsoft's DI container, [IceRpc.Extensions.DependencyInjection](https://github.com/icerpc/icerpc-csharp/tree/main/src/IceRpc.Extensions.DependencyInjection),
allows you to build and register an `IInvoker` singleton.

For example:

```csharp
// Construct an invocation pipeline using Microsoft's DI container.

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

You must specify a final invoker with the `Into` method. Here, the new invoker / invocation pipeline flows into the
`ClientConnection` singleton we configured earlier.

The resulting invoker does not create any DI scope.

## Interceptor for IInvokerBuilder

All the interceptors bundled with IceRPC can be used with or without DI, and use features for communications within
an invocation. For example, the retry interceptor communicates with the connection cache using
[IServerAddressFeature](https://api.testing.zeroc.com/csharp/api/IceRpc.Features.IServerAddressFeature.html).

These interceptors can be installed into an
[IInvokerBuilder](https://api.testing.zeroc.com/csharp/api/IceRpc.Builder.IInvokerBuilder.html).

For example:

```csharp
// Construct an invocation pipeline using Microsoft's DI container.

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
[IServiceProvider](https://learn.microsoft.com/en-us/dotnet/api/system.iserviceprovider?view=net-7.0), such as
[Microsoft's DI container](https://learn.microsoft.com/en-us/dotnet/core/extensions/dependency-injection)
and [Simple Injector](https://simpleinjector.org/)'s container.

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
Calling the DI container at runtime is typically discouraged--it's the Locator anti-pattern. Here, you should see the
`UseLogger` extension method as infrastructure code exempt from this rule.
{% /callout %}
