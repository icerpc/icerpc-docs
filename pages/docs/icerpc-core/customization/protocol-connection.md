---
title: Protocol connection
description: Understand how to create and use protocol connections.
---



## The protocol connection abstraction

A server, a client connection and a connection cache all manage
[connections](../connection/client-vs-server-connections). These somewhat low-level connections are represented by
the protocol connection abstraction. A protocol connection:

- holds a transport connection such as a QUIC connection or a tcp connection
- implements a RPC protocol layer over this transport connection

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

Even though `IProtocolConnection` is public, a regular application should not use this API directly.

IceRPC provides two implementations of the protocol connection abstraction:
[ice](../protocols-and-transports/ice-duplex-transports) and
[icerpc](../protocols-and-transports/icerpc-multiplexed-transports) protocol connections.

## Creating a protocol connection

In C#, you create a client protocol connection with a `ClientProtocolConnectionFactory` (LINK). For example:

```csharp
var clientProtocolConnectionFactory = new ClientProtocolConnectionFactory(connectionOptions, logger: logger);
await using var protocolConnection = clientProtocolConnectionFactory.CreateConnection(serverAddress);
```

This allows you to implement your own custom version of `ClientConnection` or `ConnectionCache`.

There is currently no public API to create server protocol connections; as a result, you can't create your own custom
version of Server.
