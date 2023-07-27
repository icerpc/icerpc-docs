---
title: Security with TLS
description: Learn how to secure your connections with TLS.
---

## TLS - a transport feature

The ice and icerpc protocol are neither secure nor non-secure because securing communications using TLS is the
responsibility of the underlying transport.

There is no "s" variation of the icerpc protocol or a distinct secure port for secure icerpc connections. When you see
the server address `icerpc://hello.zeroc.com`, you can tell the server is listening on the default icerpc port but you
cannot tell which transport a connection to this server would use and whether or not this transport uses TLS.

## quic

The quic transport is always secure. If you configure your client connection to use quic, the connection will use TLS.

For example:

```csharp
// Always uses TLS.
await using var connection = new ClientConnection(
    "icerpc://hello.zeroc.com",
    multiplexedClientTransport: new QuicClientTransport());
```

The same logic applies to servers: if you configure your server to use quic, any connection accepted by this server will
use TLS.

In C#, you need to specify TLS configuration—in particular a X.509 certificate—for any server that uses quic. For
example:

```csharp
// SslServerAuthenticationOptions is required with QuicServerTransport.
await using var server = new Server(
    new Chatbot(),
    new SslServerAuthenticationOptions
    {
        ServerCertificate = new X509Certificate2("server.p12")
    },
    multiplexedServerTransport: new QuicServerTransport());
```

## tcp

The tcp transport may or may not use TLS. If you specify TLS configuration when you create your client connection for
tcp, the connection will use TLS. If you don't specify TLS configuration, the connection won't use TLS.

In C#, this client-side TLS configuration is provided by a
[`SslClientAuthenticationOptions`][ssl-client-authentication-options] parameter. For example:

```csharp
// The default multiplexed transport for icerpc is tcp (implemented by SlicClientTransport over TcpClientTransport).
// This connection does not use TLS since we don't pass a SslClientAuthenticationOptions parameter.
await using var plainTcpConnection = new ClientConnection("icerpc://hello.zeroc.com");

// We pass a non-null SslClientAuthenticationOptions so the connection uses TLS.
await using var secureTcpConnection = new ClientConnection(
    "icerpc://hello.zeroc.com",
    new SslClientAuthenticationOptions());
```

It's the same for servers using tcp. If you specify TLS configuration when you create this server, the server will only
accept connections secured by TLS. If you don't specify TLS configuration when you create this server, the server will
only listen for and accept plain tcp connections.

## ssl (ice only)

An ice server address can specify the ssl transport, for instance `ice://hello.zeroc.com?transport=ssl`. This
ice-specific ssl transport is identical to the tcp transport except the connections are always secure. In this respect,
ssl is like quic.

For example:

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

The ssl transport is provided solely for backward compatibility with Ice: the standard way for an Ice application to
request a secure connection is to send a proxy with an ssl server address. When IceRPC + Slice receives such a proxy,
the ssl transport captures this information ("TLS required") and ensures the client establishes a secure connection when
it calls the decoded proxy.

{% callout %}
With Ice, the tcp transport means "don't use TLS". As described earlier, with IceRPC, the tcp transport means plain
tcp or tcp + tls depending on your TLS configuration.
{% /callout %}

With the icerpc protocol, both the client and the server must have the same TLS expectations, and an icerpc server
address with `transport=tcp` cannot advertise that the server requires TLS.

## coloc

The coloc transport, used for testing, does not support TLS at all. If you specify TLS configuration with coloc, you'll
get an error.

```csharp
// Does not work: can't get a TLS connection with a transport that doesn't support TLS.
await using var connection = new ClientConnection(
    "icerpc://colochost",
    new SslClientAuthenticationOptions()
    multiplexedClientTransport: new SlicClientTransport(colocClientTransport));
```

[ssl-client-authentication-options]: https://learn.microsoft.com/en-us/dotnet/api/system.net.security.sslclientauthenticationoptions
[tcp-client-transport]: csharp:IceRpc.Transports.Tcp.TcpClientTransport
[tcp-server-transport]: csharp:IceRpc.Transports.Tcp.TcpServerTransport
