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

## The protocol connection abstraction

`ClientConnection`, `ConnectionCache` and `Server` all create and manage instances of the protocol connection
abstraction. A protocol connection:
 - holds a transport connection such as a QUIC connection or a tcp connection
 - implements a RPC protocol layer, such as icerpc (LINK) or ice (link), over this transport connection

We often refer to a protocol connection as simply a "connection".

 A client connection maintains a single active protocol connection - a (client) protocol connection connected to a
 server.

 A connection cache maintains a map of server address to (client) protocol connection. Each connection is connected to a
 different server. The connection cache helps locate and reuse these protocol connections.

 A server accepts server protocol connections and remembers which connections it accepted. This allows the server to
 shut down these protocol connection when you shut down this server.

 DIAGRAM

In C#, the protocol connection abstraction is represented by interface `IProtocolConnection`:
```csharp
namespace IceRpc;

public interface IProtocolConnection : IInvoker, IAsyncDisposable
{
    Task<(TransportConnectionInformation ConnectionInformation, Task ShutdownRequested)> ConnectAsync(
        CancellationToken cancellationToken = default);

    Task ShutdownAsync(CancellationToken cancellationToken = default);
}
```

You can use this interface directly to create your own custom version of `ClientConnection` or `ConnectionCache`.
