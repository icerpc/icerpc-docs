---
title: Duplex transport
description: Learn about duplex transports and how IceRPC uses them.
---

A duplex transport is an abstraction that provides duplex communications between a client and server. TCP is the primary
duplex transport provided by IceRPC.

The duplex transport abstraction allows writing custom duplex transports. For example, the [RFCOMM] transport
could be supported by implementing this abstraction. Such custom transports need to conform to a number of requirements
which are documented on this page.

IceRPC uses duplex transports for the implementation of the [ice protocol][ice-protocol] and the implementation of the
[Slic] transport.

## The duplex transport requirements

IceRPC requires a duplex transport to be [connection-oriented] and to support the following features:
- [full-duplex] communication over a bidirectional byte stream
- [flow control][flow-control]
- half-closure where each side of the connection can be closed independently
- graceful closure to allow closing the connection once all the data is delivered
- abortive closure to close the connection and release its resources immediately without waiting for the data to be
  delivered

## Duplex transport and TLS

The TLS configuration from the application is passed through the duplex transport abstraction to allow the transport
implementation to setup TLS for duplex connections.

A transport is free to only support non-secure connections, only support secure connections or support both. For
example, the TCP duplex transport can create secure or non-secure connections.

If the application provides TLS configuration, the transport must create secure connections. If it doesn't support TLS,
it must fail.

See also [Security with TLS][security-with-tls] for additional information.

## The C# duplex transport abstraction

The C# duplex transport abstraction is composed of a number of interfaces that a custom transport needs to implement:
- [IDuplexClientTransport]: a factory to create outgoing connections
- [IDuplexServerTransport]: a factory to create listeners
- [IListener<IDuplexConnection>]: a factory to listen for and create incoming connections
- [IDuplexConnection]: a connection to allow a client and server to communicate

The API documentation of these interfaces specifies the contract a custom transport needs to comply with.

To use a custom transport, the application needs to provide an instance of `IDuplexServerTransport` or
`IDuplexClientTransport` to the [Server], [ConnectionCache] or [ClientConnection] constructors.

[security-with-tls]: connection/security-with-tls
[Slic]: slic-transport

[RFCOMM]: https://en.wikipedia.org/wiki/List_of_Bluetooth_protocols#Radio_frequency_communication_(RFCOMM)
[connection-oriented]: https://en.wikipedia.org/wiki/Connection-oriented_communication
[full-duplex]: https://en.wikipedia.org/wiki/Duplex_(telecommunications)#Full_duplex
[flow-control]: https://en.wikipedia.org/wiki/Flow_control_(data)
[ice-protocol]: protocols-and-transports/ice-duplex-transports

[IDuplexClientTransport]: csharp:IceRpc.Transports.IDuplexClientTransport
[IDuplexServerTransport]: csharp:IceRpc.Transports.IDuplexServerTransport
[IListener<IDuplexConnection>]: csharp:IceRpc.Transports.IListener-1
[IDuplexConnection]: csharp:IceRpc.Transports.IDuplexConnection
[Server]: csharp:IceRpc.Server
[ConnectionCache]: csharp:IceRpc.ConnectionCache
[ClientConnection]: csharp:IceRpc.ClientConnection
