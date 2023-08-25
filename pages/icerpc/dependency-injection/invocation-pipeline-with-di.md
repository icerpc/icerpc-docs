---
title: Invocation pipeline with DI
description: Understand how to build your invocation pipeline with a DI container.
---

## Invocation pipeline with a DI container

Unlike the [dispatch pipeline](dispatch-pipeline-with-di), the invocation pipeline is pretty much the same with or
without a DI container. That's because there is no natural DI scope for an invocation: if an invocation executes within
a DI scope, this scope comes from another enclosing activity, such as a dispatch that makes this invocation.

{% callout type="note" %}
IceRPC for C# does not provide any special support for invocations within a DI scope. In particular
[IMiddleware](dispatch-pipeline-with-di#middleware-with-injected-services) has no interceptor counterpart.
{% /callout %}

## Building an invocation pipeline with Microsoft's DI container

You can call [AddIceRpcInvoker] to add a new invoker (invocation pipeline) singleton to your DI
container.

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

## Installing an interceptor in an IInvokerBuilder

All of IceRPC's built-in interceptors can be used with or without DI, and use [features] for communications within an
invocation. For instance, the retry interceptor communicates with a connection cache using an [IServerAddressFeature] to
coordinate retries over replicated servers.

These interceptors can be installed into a [Pipeline] or an [IInvokerBuilder].

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
DI container that implements [IServiceProvider], such as Microsoft's DI container and [Simple
Injector][simple-injector]'s container.

The implementation of the `UseLogger` method simply retrieves a logger instance from the DI container and then create
a new interceptor with this instance:

```csharp
public static IInvokerBuilder UseLogger(this IInvokerBuilder builder) =>
    builder.ServiceProvider.GetService(typeof(ILogger<LoggerInterceptor>)) is ILogger logger ?
        builder.Use(next => new LoggerInterceptor(next, logger)) :
        throw new InvalidOperationException(
            $"Could not find service of type '{nameof(ILogger<LoggerInterceptor>)}' in the service container.");
```

We recommend you follow the same pattern when you create your own interceptor and provide `Use` extension methods
for both `Pipeline` and `IInvokerBuilder`.

{% callout type="note" %}
Calling the DI container at runtime is typically discouraged—it's the service locator anti-pattern. Here, you should
see the `UseLogger` extension method as infrastructure code exempt from this rule.
{% /callout %}

[features]: ../invocation/outgoing-request#request-features
[simple-injector]: https://simpleinjector.org/

[AddIceRpcInvoker]: csharp:IceRpc.Extensions.DependencyInjection.InvokerServiceCollectionExtensions#IceRpc_Extensions_DependencyInjection_InvokerServiceCollectionExtensions_AddIceRpcInvoker_Microsoft_Extensions_DependencyInjection_IServiceCollection_System_Action_IceRpc_Extensions_DependencyInjection_IInvokerBuilder__
[IInvokerBuilder]: csharp:IceRpc.Extensions.DependencyInjection.IInvokerBuilder
[Pipeline]: csharp:IceRpc.Pipeline
[IServerAddressFeature]: csharp:IceRpc.Features.IServerAddressFeature
[IServiceProvider]: https://learn.microsoft.com/en-us/dotnet/api/system.iserviceprovider
