---
title: Dependency Injection and IceRPC for C#
description: Understand how IceRPC for C# provides support for Dependency Injection (DI).
---

## DI as an optional feature

The first rule of DI is: don't introduce a dependency on DI.

IceRPC for C# takes this rule at heart by providing full support for DI while making this support completely optional.

The IceRPC C# API was designed to be both DI-friendly and DI-container agnostic. Additionally, IceRPC provides
integration code specifically for the
[Microsoft DI container](https://learn.microsoft.com/en-us/dotnet/core/extensions/dependency-injection).

## DI support in the IceRpc core assembly

The IceRpc assembly includes a few DI-related abstractions:
- interface [IceRpc.Builder.IDispatcherBuilder](https://api.testing.zeroc.com/csharp/api/IceRpc.Builder.IDispatcherBuilder.html)
is used to construct a dispatch pipeline with the help of a specific DI container.

- interface [IceRpc.Builder.IInvokerBuilder](https://api.testing.zeroc.com/csharp/api/IceRpc.Builder.IInvokerBuilder.html)
is used to construct an invocation pipeline with the help of a specific DI container.

- interfaces [IceRpc.IMiddleware<TDep>](https://api.testing.zeroc.com/csharp/api/IceRpc.IMiddleware-1.html),
[IceRpc.IMiddleware<TDep1, TDep2>](https://api.testing.zeroc.com/csharp/api/IceRpc.IMiddleware-2.html) and
[IceRpc.IMiddleware<TDep1, TDep2, TDep3>](https://api.testing.zeroc.com/csharp/api/IceRpc.IMiddleware-3.html) are used
to create idiomatic middleware for dispatch pipelines built using a DI container.

- interface [IceRpc.Features.IServiceProviderFeature](https://api.testing.zeroc.com/csharp/api/IceRpc.Features.IServiceProviderFeature.html)
is used to carry the service provider (DI container) through a dispatch pipeline or an invocation pipeline. This feature
should be set and consumed only by infrastructure code such as an implementation of IDispatcherBuilder; any other usage
falls into the Locator anti-pattern.

These abstractions don't depend on a specific DI container. As long as your preferred DI container implements
[IServiceProvider](https://learn.microsoft.com/en-us/dotnet/api/system.iserviceprovider?view=net-7.0), you can use
IceRPC and the IceRPC interceptors and middleware with this DI container.
