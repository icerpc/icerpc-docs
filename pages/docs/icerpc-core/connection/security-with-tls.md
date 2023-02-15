---
title: Security with TLS
description: Learn how to secure your connections with TLS.
---

{% title /%}

## TLS - a transport feature

The ice and icerpc protocol are neither secure nor non-secure because securing communications using TLS is the
responsibility of the underlying transport.

There is no "s" variation of the icerpc protocol or a distinct secure port for secure icerpc connections. When you see
the server address `icerpc://hello.zeroc.com`, you can tell the server is listening on the default icerpc port but you
don't have enough information to tell if a connection to this server uses TLS or not.

## quic and ssl

The quic transport and the ssl transport are always secure. If you configure your client connection to use one of these
transports, the connection will use TLS.

For example:
```csharp
// We specify the ssl transport: we get a TLS-secured connection even without any additional parameter.
await using var sslConnection = new ClientConnection("icerpc://hello.zeroc.com?transport=ssl");
```

The same logic applies to servers: if you configure your server to use quic or ssl, any connection accepted by this
server will use TLS.

## tcp

The tcp transport may or may not use TLS. If you specify TLS configuration when you create your client connection for
tcp, the connection will use TLS. If you don't specify TLS configuration, the connection won't use TLS.

In C#, this TLS configuration is a `SslClientAuthenticationOptions` parameter. For example:

```csharp
// The default multiplexed transport for icerpc is tcp. The connection does not use TLS since we don't pass a
// SslClientAuthenticationOptions parameter.
await using var plainTcpConnection = new ClientConnection("icerpc://hello.zeroc.com");

// We pass a non-null SslClientAuthenticationOptions so the connection uses TLS.
await using var secureTcpConnection = new ClientConnection(
    "icerpc://hello.zeroc.com",
    new SslClientAuthenticationOptions());
```

It's the same for servers using tcp. If you specify TLS configuration when you create this server, the server will only
accept connections secured by TLS. If you don't specify TLS configuration when you create this server, the server will
only listen for and accept plain tcp connections.

{% callout type="information" %}
tcp and ssl are actually the same transport. If a server listens on a tcp server address and specifies TLS
configuration, a client can connect to this server with tcp (and TLS configuration) or with ssl. It's completely
equivalent. The only difference between tcp and ssl is ssl requires TLS while it's optional for tcp.
{% /callout %}

## coloc

The coloc transport, used for testing, does not support TLS at all. If you specify TLS configuration with coloc, you'll
get an error.

```csharp
// Does not work: can't get a TLS connection with a transport that doesn't support TLS.
await using var secureColocConnection = new ClientConnection(
    "icerpc://colochost",
    new SslClientAuthenticationOptions()
    multiplexedClientTransport: ...);
```
