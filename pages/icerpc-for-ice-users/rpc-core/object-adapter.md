---
title: Object adapter
description: What is replacing ObjectAdapter in IceRPC?
---

An Ice object adapter manages servants (with its Active Servant Map, servant locator and default servant) and incoming
connections (with its Endpoints property and `activate` operation).

The corresponding IceRPC objects and abstractions are Dispatcher, Router and Server: a server accepts incoming
connections and hands out the incoming requests it receives to a dispatcher (an abstraction).

Router is an implementation of the dispatcher abstraction and is somewhat comparable to the Active Servant Map.

{% callout type="information" %}
A router is read-only after the first dispatch, while with Ice, it's common to add new servants to an object adapter
at runtime. If you need the "add at runtime" behavior with IceRPC, you can create your own custom dispatcher and
configure your server to use this dispatcher.
{% /callout %}

An Ice object adapter can be configured with multiple endpoints. It's so common that the corresponding configuration
property is named Endpoints. On the other hand, an IceRPC server has only one server address. That's because Server is a
more granular building block: if you want to listen on multiple server addresses with IceRPC, you create multiple
servers, each with its own server address, and all these servers can share the same dispatcher.

{% side-by-side alignment="top" %}

```csharp {% title="Simple server with Ice for C#" %}
using Communicator communicator =
    Ice.Util.initialize(ref args);

Console.CancelKeyPress +=
    (sender, eventArgs) => communicator.shutdown();

ObjectAdapter adapter =
    communicator.createObjectAdapterWithEndpoints(
        "Hello",
        "default -h * -p 10000");

adapter.add(
    new HelloI(),
    Ice.Util.stringToIdentity("hello"));

adapter.activate();
communicator.waitForShutdown();
```

```csharp {% title="Similar server with IceRPC for C#" %}
await using var server = new Server(
    new Chatbot(),
    new Uri("ice://[::0]:10000"));

server.Listen(); // similar to "activate"

await CancelKeyPressed;
await server.ShutdownAsync();
```

{% /side-by-side %}
