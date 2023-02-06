---
title: Interceptor
description: Learn about IceRPC interceptors.
---

{% title /%}

## Definition

An interceptor is nothing more than an invoker (LINK) that holds another invoker ("next") and calls Invoke on this next
invoker as part of the implementation of its own Invoke method. This next invoker can be a connection, another
interceptor, or some other kind of invoker, it doesn't matter.

An interceptor can include logic before calling Invoke on the next invoker (before the request is sent) and after
calling Invoke on the next (after it receives the response). An interceptor can also short-circuit the pipeline by
throwing an exception or returning a cached response.

DIAGRAM: a typical interceptor with next

## Installing interceptors

In C#, you can create an invocation pipeline by creating an instance of class `Pipeline` and then calling `Use`
extension methods to install interceptors on this pipeline.

For example:
```
Pipeline pipeline = new Pipeline().UseLogger(loggerFactory).UseCompress().Into(clientConnection);
```

You need to specify the last invoker of the pipeline with `Into`. It's usually a client connection or connection cache,
but it can also be another pipeline.

`Pipeline` is itself an invoker. When you make an invocation on a Pipeline, the request goes through the chain of
invokers (interceptors and connection). On the way back, the incoming response goes through the same chain in reverse
order.

The order in which you install these interceptors is often important. The first interceptor you install is the first
invoker to execute. With the pipeline we created above, the logger interceptor executes first, then calls `InvokeAsync`
on the compress interceptor, and then finally the compress interceptor calls `InvokeAsync` on the client connection.

## Installing interceptors with Dependency Injection

If you use Microsoft's Dependency Injection container, you'll want to use an invoker builder instead of `Pipeline` to
create your invocation pipeline. The `Use` extension methods for invoker builder retrieve dependencies automatically
from the DI container.

For example:
```
services.AddIceRpcInvoker(builder => builder.UseLogger().UseCompress().Into<ClientConnection>())
```

This is equivalent to our earlier example except `UseLogger` retrieves the logger factory from the DI container.

{% callout type="information" %}
There is only one Logger interceptor class, one Compress interceptor class etc. These interceptors can be installed in
several different pipeline implementations, such as `Pipeline`, the implementation of the builder created by
`AddIceRpcInvoker`, or even your own custom pipeline class. Each pipeline implementation just needs its own set of `Use`
extension methods.
{% /callout %}
