---
title: Dispatch pipeline with DI
description: Understand how to create a dispatch pipeline using a DI container.
---

## Traditional dispatch pipeline

A traditional dispatch pipeline is typically very static: you create a router, add a few middleware, map or mount a
small number of services in this router and then let your server dispatch incoming requests to this router.

The services are mapped or mounted at fixed path (just as `/greeter` or `/admin/manager`). These service instances are
singletons (or singleton-like) with the same lifetime as the router and the server.

Middleware in a dispatch pipeline communicate with each others using features: an upstream middleware sets a feature
that a downstream middleware can retrieve.

This works well for many applications. However, this is not the typical model when using DI.

## DI dispatch pipeline

With DI, a dispatch pipeline is typically more dynamic: some infrastructure code creates a unique DI scope for each
dispatch and as a result each dispatch retrieves a scoped service instance as a leaf dispatcher. This scoped service
instance is released/disposed by the DI container when the scope completes.

{% callout type="information" %}
The standard DI rules naturally still apply. If you don't want to create a scoped instance per dispatch, you can use
singletons for your leaf dispatchers.
{% /callout %}

The middleware in your DI dispatch pipeline can use features as usual to communicate with each others. However, a
more idiomatic approach is to communicate using injected scoped services. For example:
 - an upstream middleware retrieves a scoped service from the DI container via auto-wiring and then fills-in this
 service
 - a downstream middleware retrieves this scoped service via auto-wiring, and read the information filled-in by
 the upstream middleware
 - the leaf dispatcher (a scoped service) is itself auto-wired with this previously filled scoped service

{% callout type="information" %}
The chain of middleware is itself static: each dispatch does not create new middleware instances. The middleware
themselves are typically singletons managed by the DI container.
{% /callout %}
