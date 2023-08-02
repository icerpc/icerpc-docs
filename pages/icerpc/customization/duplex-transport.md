---
title: Duplex transport
description: Understand what's a duplex transport
---

## What is a duplex transport?

A duplex transport is an abstraction that provides duplex communication between a client and server.

IceRPC uses duplex transports for the implementation of the [ice protocol][ice-protocol] and the implementation of the
[Slic transport][slic-transport]

It provides two duplex transport implementations:
- the TCP transport (which also supports TLS).
- the Coloc transport to allow communication within the same process.

## The duplex transport requirements

IceRPC requires a duplex transport to be [connection-oriented] and to support the following features:
- [full-duplex] communication over a byte stream
- [flow-control]
- half-closure where each side of the connection can be closed independently
- graceful closure to allow closing the connection once all the data is delivered
- abortive closure to close the connection and release its resources immediately without waiting for the data to be
  delivered.

## The C# duplex transport abstraction

The C# duplex transport abstraction is composed of a number of interfaces that a custom transport needs to implement:
- [IDuplexClientTransport][duplex-client-transport]: a factory to create outgoing connections
- [IDuplexServerTransport][duplex-server-transport]: a factory to create listeners
- [IListener<IDuplexConnection>][duplex-listener]: a factory to listen for and create incoming connections
- [IDuplexConnection][duplex-connection]: a connection to allow a client and server to communicate

The API documentation of each of these interfaces specifies the contract a custom transport needs to comply with.

To use a custom transport, the application needs to provide an instance of `IDuplexServerTransport` or
`IDuplexClientTransport` to the [Server][server], [ConnectionCache][connection-cache] or
[ClientConnection][client-connection] constructors.

[connection-oriented]: https://en.wikipedia.org/wiki/Connection-oriented_communication
[full-duplex]: https://en.wikipedia.org/wiki/Duplex_(telecommunications)#Full_duplex
[flow-control]: https://en.wikipedia.org/wiki/Flow_control_(data)
[ice-protocol]: ../protocols-and-transports/ice-duplex-transports
[slic-transport]: ../slic-transport
[multiplexed-transport]: multiplexed-transport
[duplex-client-transport]: csharp:IceRpc.Transports.IDuplexClientTransport
[duplex-server-transport]: csharp:IceRpc.Transports.IDuplexServerTransport
[duplex-listener]: csharp:IceRpc.Transports.IListener-1
[duplex-connection]: csharp:IceRpc.Transports.IDuplexConnection
[server]: csharp:IceRpc.Server
[connection-cache]: csharp:IceRpc.ConnectionCache
[client-connection]: csharp:IceRpc.ClientConnection
