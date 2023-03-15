---
title: Communicator
description: What is replacing Communicator in IceRPC?
---

An Ice communicator has numerous responsibilities:
- it holds configuration properties
- it creates and manages client connections
- when the application makes an invocation, it selects the connection to use (and sometimes create this connection)
- it provides invocation timeouts, invocation retries, logging/tracing, and metrics
- it's used to create object adapters
and more.

IceRPC replaces multi-purpose objects such as Communicator with smaller, more focused objects and abstractions that
you can compose to get the behavior you want.

IceRPC has no equivalent for Ice configuration properties, and does not rely on any particular configuration file
format. In C#, IceRPC follows C#'s [Options Pattern](https://learn.microsoft.com/en-us/dotnet/core/extensions/options),
which allows you to set configuration programmatically or in a JSON file.

The bulk of Communicator's client-side functionality corresponds to an IceRPC [invocation pipeline]() that flows into a
[ConnectionCache]().

A Communicator-like invocation pipeline includes many interceptors:
- the Deadline interceptor (for invocation timeouts)
- the Locator interceptor (to resolve "indirect proxies" using an Ice Locator)
- the Logger interceptor
- the Metrics interceptor (to collect metrics)
- the RequestContext interceptor (to send request contexts)
- the Retry interceptor (for automatic invocation retries)

When you create a client application with IceRPC, you should create an invocation pipeline with the interceptors you
need--please don't include all built-in interceptors "just in case". You should also check if a [ClientConnection] is
more appropriate than a ConnectionCache for your application.

For example:

{% side-by-side %}
```csharp
// Simple client application with Ice in C#.
using var communicator = Ice.Util.initialize(ref args);

var hello = HelloPrxHelper.checkedCast(
    communicator.stringToProxy("hello:default -h localhost -p 10000"));

hello.sayHello();
```

```csharp
// Similar client application with IceRPC.
await using var clientConnection = new ClientConnection(
    new Uri("ice://localhost:10000"));

// We install only the deadline and retry interceptors.
Pipeline pipeline = new Pipeline()
    .UseDeadline(TimeSpan.FromSeconds(30))
    .UseRetry()
    .Into(clientConnection);

var helloProxy = new HelloProxy(pipeline, new Uri("ice:/hello"));

await helloProxy.SayHelloAsync();
```
{% /side-by-side %}
