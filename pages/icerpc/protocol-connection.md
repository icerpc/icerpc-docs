---
title: Protocol connection
description: Understand how to create and use protocol connections.
---

## The protocol connection abstraction

A server, a client connection and a connection cache all manage protocol connections. A protocol connection is an
abstraction that:

- holds a transport connection such as a QUIC connection or a tcp connection
- implements an RPC protocol layer over this transport connection

In C#, this abstraction is the [IProtocolConnection] interface:

```csharp
namespace IceRpc;

public interface IProtocolConnection : IInvoker, IAsyncDisposable
{
    Task<(TransportConnectionInformation ConnectionInformation, Task ShutdownRequested)> ConnectAsync(
        CancellationToken cancellationToken = default);

    Task ShutdownAsync(CancellationToken cancellationToken = default);
}
```

Even though it's public, a regular application should not use this API directly.

IceRPC provides two implementations of the protocol connection abstraction:
[ice](protocols-and-transports/ice-duplex-transports) and
[icerpc](protocols-and-transports/icerpc-multiplexed-transports) protocol connections.

## Creating a protocol connection

In C#, you create a client protocol connection with a [ClientProtocolConnectionFactory].
For example:

```csharp
var clientProtocolConnectionFactory = new ClientProtocolConnectionFactory(connectionOptions, logger: logger);
await using var protocolConnection = clientProtocolConnectionFactory.CreateConnection(serverAddress);
```

This allows you to implement your own custom version of [ClientConnection] or
[ConnectionCache].

There is currently no public API to create server protocol connections; as a result, you can't create your own custom
version of [Server].

[ProtocolConnection]: csharp:IceRpc.IProtocolConnection
[ClientProtocolConnectionFactory]: csharp:IceRpc.ClientProtocolConnectionFactory
[ClientConnection]: csharp:IceRpc.ClientConnection
[ConnectionCache]: csharp:IceRpc.ConnectionCache
[Server]: csharp:IceRpc.Server
