---
title: Client vs server connections
description: Learn how to create and accept connections in IceRPC.
---

{% title /%}

Connections play a central role in IceRPC: you send a request to a service over a connection and later receive a
response over the same connection. At the other end of this connection, IceRPC receives this request, hands it over to
your service and later sends back the response returned by your service.

When an application creates a connection to a server, this connection is a "client connection". When a server accepts a
connection from a client, this connection is called a "server connection".

DIAGRAM

Once a connection is established, there is no difference between a client and a server connection. You can make an
invocation (send a request and receive the corresponding response) on a client connection or on a server connection
with exactly the same API. Any connection, client or server, can also accept incoming requests and dispatch these
requests to your services.

## Creating a client connection

In C#, you create a client connection with the `ClientConnection` class or with the `ConnectionCache` class. For
example:
```csharp
using IceRpc;

await using var clientConnection = new ClientConnection(new Uri("icerpc://hello.zeroc.com"));
```

`ClientConnection`'s constructor specifies the address of the server (see XXX), but does not actually establish the
connection. The connection is established later on by an asynchronous call such as `ConnectAsync`:
```csharp
// establishes the connection explicitly
await clientConnection.ConnectAsync();
```

This pattern where the constructor configures the new instance but does not actually run anything is common throughout
the IceRPC core.

## Creating a server

On the server-side, you accept server connections with an instance of the Server class. This server listens for and
accepts new connections on its configured server address (LINK).

In C#, this is again a two-step process, where you first construct the server and later call `Listen`:
```csharp
using IceRpc;

// constructs and configures server
await using var server = new Server(...);

// starts listening for new connections
server.Listen();
```
