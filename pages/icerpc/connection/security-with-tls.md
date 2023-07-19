---
title: Security with TLS
description: Learn how to secure your connections with TLS.
---

## TLS - a transport feature

The ice and icerpc protocol are neither secure nor non-secure because securing communications using TLS is the
responsibility of the underlying transport.

There is no "s" variation of the icerpc protocol or a distinct secure port for secure icerpc connections. When you see
the server address `icerpc://hello.zeroc.com`, you can tell the server is listening on the default icerpc port but you
can't tell which transport a connection to this server would use and whether or not this transport uses TLS.

## quic

The quic transport is always secure. If you configure your client connection to use quic, the connection will use TLS.

For example:

```csharp
// Always uses TLS.
await using var quicConnection = new ClientConnection(
    "icerpc://hello.zeroc.com",
    multiplexedClientTransport: new QuicClientTransport());
```

The same logic applies to servers: if you configure your server to use quic, any connection accepted by this server will
use TLS.

## tcp

The tcp transport may or may not use TLS. If you specify TLS configuration when you create your client connection for
tcp, the connection will use TLS. If you don't specify TLS configuration, the connection won't use TLS.

In C#, this client-side TLS configuration is provided by a
[`SslClientAuthenticationOptions`][ssl-client-authentication-options] parameter. For example:

```csharp
// The default multiplexed transport for icerpc is tcp (implemented by TcpClientTransport). This connection
// does not use TLS since we don't pass a SslClientAuthenticationOptions parameter.
await using var plainTcpConnection = new ClientConnection("icerpc://hello.zeroc.com");

// We pass a non-null SslClientAuthenticationOptions so the connection uses TLS.
await using var secureTcpConnection = new ClientConnection(
    "icerpc://hello.zeroc.com",
    new SslClientAuthenticationOptions());
```

It's the same for servers using tcp. If you specify TLS configuration when you create this server, the server will only
accept connections secured by TLS. If you don't specify TLS configuration when you create this server, the server will
only listen for and accept plain tcp connections.

{% callout %}
An ice server address can specify the ssl transport, e.g. `ice://hello.zeroc.com?transport=ssl`. This ice-specific ssl
transport is identical to the tcp transport except the connections are always secure. In this respect, ssl is like quic.
{% /callout %}

In C#, tcp and ssl are implemented by the same transport classes, [`TcpClientTransport`][tcp-client-transport] and
[`TcpServerTransport`][tcp-server-transport]. For example:

```csharp
// Uses the default client transport, TcpClientTransport.
await using var connection = new ClientConnection("ice://hello.zeroc.com?transport=ssl");
```

is equivalent to:

```csharp
await using var connection = new ClientConnection(
    "ice://hello.zeroc.com?transport=tcp",
    new SslClientAuthenticationOptions());
```

## coloc

The coloc transport, used for testing, does not support TLS at all. If you specify TLS configuration with coloc, you'll
get an error.

```csharp
// Does not work: can't get a TLS connection with a transport that doesn't support TLS.
await using var secureColocConnection = new ClientConnection(
    "icerpc://colochost",
    new SslClientAuthenticationOptions()
    multiplexedClientTransport: new SlicClientTransport(colocClientTransport)
```

[ssl-client-authentication-options]: https://learn.microsoft.com/en-us/dotnet/api/system.net.security.sslclientauthenticationoptions
[tcp-client-transport]: csharp:IceRpc.Transports.Tcp.TcpClientTransport
[tcp-server-transport]: csharp:IceRpc.Transports.Tcp.TcpServerTransport
