---
title: Multiplexed transport
description: Learn about multiplexed transports and how IceRPC uses them.
---

A multiplexed transport is an abstraction that provides multiplexed communications between a client and server using
several streams. [QUIC][quic] and [Slic][slic] are multiplexed transports provided by IceRPC.

The multiplexed transport abstraction allows writing custom multiplexed transports. Such a custom transport needs to
conform to the requirements documented on this page.

The [icerpc protocol][icerpc-protocol] implementation provided by IceRPC relies on the multiplexed transport
abstraction.

## The multiplexed transport requirements

IceRPC requires a multiplexed transport to be [connection-oriented] and to support the following features:
- [full-duplex] communication over multiple independent streams
- [flow-control] for each stream
- a mechanism to limit the number of active streams opened on a connection
- stream half-closure where each side of the stream can be closed independently
- graceful connection closure to notify the peer of the connection closure and wait for its acknowledgement
- abortive closure to close the connection and release its resources immediately without waiting for the peer to
  acknowledge the connection closure

## Multiplexed transport and TLS

The TLS configuration from the application is passed through the multiplexed transport abstraction to allow the
transport implementation to setup TLS for multiplexed connections.

A transport is free to only support non-secure connections, only support secure connections or support both. For
example, Slic with TCP can create secure and non-secure connections while Quic can only create secure connections.

If the application provides TLS configuration, the transport must create secure connections. If it doesn't support TLS,
it must fail.

See also [Security with TLS](../connection/security-with-tls) for additional information.

## The C# multiplexed transport abstraction

The C# multiplexed transport abstraction consists of a number of interfaces that a custom transport needs to
implement:
- [IMultiplexedClientTransport][multiplexed-client-transport]: a factory to create outgoing connections
- [IMultiplexedServerTransport][multiplexed-server-transport]: a factory to create listeners
- [IListener<IMultiplexedConnection>][multiplexed-listener]: a factory to listen for and create incoming connections
- [IMultiplexedConnection][multiplexed-connection]: a connection to accept and create streams
- [IMultiplexedStream][multiplexed-stream]: a stream to allow a client and server to communicate

The API documentation of these interfaces specifies the contract a custom transport needs to comply with.

To use a custom transport, the application needs to provide an instance of `IMultiplexedServerTransport` or
`IMultiplexedClientTransport` to the [Server][server], [ConnectionCache][connection-cache] or
[ClientConnection][client-connection] constructors.

[slic]: ../slic-transport
[quic]: https://www.rfc-editor.org/rfc/rfc9000.html
[connection-oriented]: https://en.wikipedia.org/wiki/Connection-oriented_communication
[full-duplex]: https://en.wikipedia.org/wiki/Duplex_(telecommunications)#Full_duplex
[flow-control]: https://en.wikipedia.org/wiki/Flow_control_(data)
[icerpc-protocol]: ../protocols-and-transports/icerpc-multiplexed-transports
[multiplexed-client-transport]: csharp:IceRpc.Transports.IMultiplexedClientTransport
[multiplexed-server-transport]: csharp:IceRpc.Transports.IMultiplexedServerTransport
[multiplexed-listener]: csharp:IceRpc.Transports.IListener-1
[multiplexed-connection]: csharp:IceRpc.Transports.IMultiplexedConnection
[multiplexed-stream]: csharp:IceRpc.Transports.IMultiplexedStream
[server]: csharp:IceRpc.Server
[connection-cache]: csharp:IceRpc.ConnectionCache
[client-connection]: csharp:IceRpc.ClientConnection
