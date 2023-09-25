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

IceRPC replaces this multi-purpose `Communicator` with smaller, more focused objects and abstractions that you compose
to get the behavior you want.

IceRPC has no equivalent for Ice configuration properties, and does not rely on any particular configuration file
format. In C#, IceRPC follows the [Options Pattern][options-pattern], which allows you to set configuration
programmatically or in a JSON file.

The bulk of `Communicator`'s client-side functionality corresponds to an IceRPC [invocation
pipeline][invocation-pipeline] that flows into a [ConnectionCache].

A `Communicator`-like invocation pipeline would include the following interceptors:

- the Deadline interceptor (for invocation timeouts)
- the Locator interceptor (to resolve "indirect proxies" using an Ice Locator)
- the Logger interceptor
- the Metrics interceptor (to collect metrics)
- the RequestContext interceptor (to send request contexts)
- the Retry interceptor (for automatic invocation retries)

When you create a client application with IceRPC, you should create an invocation pipeline with the interceptors you
need—don't include all built-in interceptors "just in case". You should also check if a [ClientConnection] is more
appropriate than a `ConnectionCache` for your application.

#### Example

{% side-by-side alignment="top" %}

```csharp {% title="Simple client with Ice for C#" %}
using var communicator = Ice.Util.initialize(ref args);

var hello = HelloPrxHelper.checkedCast(
    communicator.stringToProxy(
        "hello:default -h localhost -p 10000"));

hello.sayHello();

communicator.shutdown();
```

```csharp {% title="Similar client with IceRPC for C#" %}
await using var connection = new ClientConnection(
    new Uri("ice://localhost:10000"));

// We install only the deadline and retry interceptors.
Pipeline pipeline = new Pipeline()
    .UseDeadline(TimeSpan.FromSeconds(30))
    .UseRetry()
    .Into(connection);

var helloProxy = new HelloProxy(
    pipeline,
    new Uri("ice:/hello"));

await helloProxy.SayHelloAsync();

await connection.ShutdownAsync();
```

{% /side-by-side %}

[invocation-pipeline]: /icerpc/invocation/invocation-pipeline

[options-pattern]: https://learn.microsoft.com/en-us/dotnet/core/extensions/options

[ClientConnection]: csharp:IceRpc.ClientConnection
[ConnectionCache]: csharp:IceRpc.ConnectionCache
