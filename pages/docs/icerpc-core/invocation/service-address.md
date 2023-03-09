---
title: Service address
description: Understand the service address concept and syntax.
---

{% title /%}

## Syntax

A service address is a [URI](https://www.rfc-editor.org/rfc/rfc3986.html).

If it's a relative URI, we call this service address a relative service address. A relative service address has an
absolute path and nothing else--no query parameter, no fragment.

The URI scheme of an absolute service address denotes the protocol to use to reach the target service. IceRPC
supports two protocols: ice and icerpc. A service address with another protocol/scheme is supported: it represents the
address of a service that this version of IceRPC cannot call. A newer version of IceRPC may understand this protocol.

The path of a service address allows the server to route requests to the desired service.

An ice or icerpc service address may include one or more [server addresses](../connection/server-address). These server
addresses are used to establish or locate a connection to a server that hosts the service.

{% callout type="information" %}
A server address scheme is always ice or icerpc. No other scheme is currently supported.
{% /callout %}

An ice or icerpc service address without a server address can have query parameters. And lastly, an ice service address
can have a fragment; this fragment corresponds to an Ice facet.

In C#, record class `ServiceAddress` is simply a parsed and validated representation of a service address URI: it holds
exactly the same information.

ice and icerpc service addresses can be divided in 3 categories:

## Service address with a single server address

A service address with a single server address is very common:

```
icerpc://<host>[:<port<>]/<path>[?<name>=<value>][&<name2>=<value2>][...]
ice://<host<[:<port>]//<path>[?<name>=<value>][&<name2>=<value2>][...][#<fragment>]
```

The protocol (ice or icerpc), host, port and the query parameters specify the server address of the service address. The
path and the optional fragment are properties of the service address itself.

For example:

```
icerpc://hello.zeroc.com/hello?transport=quic
```

Such a service address is typically used when making invocations with a connection cache. The connection cache uses the
server address to establish or reuse a connection to the target server and send requests on this connection.

### Service address with two or more server addresses

A service address URI can specify additional server addresses with the `alt-server` query parameter. The value of this
parameter is a server address without the `ice://` ori `icerpc://` prefix. For example:

```
icerpc://hello.zeroc.com/hello?alt-server=bonjour.zeroc.com,hola.zeroc.com
```

`alt-server` means the application can find the service in the first server or in any of these alternate servers. It's
typically used for fault tolerance.

Each alt server address can have its own query parameters. For example:

```
icerpc://hello.zeroc.com/hello?transport=quic&alt-server=bonjour.zeroc.com?transport=tcp,hola.zeroc.com?transport=ssl
```

If an alt server address has multiple query parameters, it must use '$' instead of '&' to separate these parameters.
For example:

```
icerpc://hello.zeroc.com/hello?alt-server=bonjour.zeroc.com?transport=tcp$other=foo
```

## Service address with no server address

A service address URI with no host does not specify a server address. Its syntax is:

```
icerpc:/<path>[?<name>=<value>][&<name2>=<value2>][...]
ice:/<path>[?<name>=<value>][&<name2>=<value2>][...][#fragment]
```

Here, the query parameters are properties of the service address itself. For example:

```
icerpc:/hello

ice:/hello?adapter-id=greeter-union
```

A server address-less service address is often used with a ClientConnection. Since a client connection is bound to a
single server address, there is no need to repeat the server address when making an invocation with such a connection.

For example:

```csharp
// connects to icerpc://hello.zeroc.com
await using var clientConnection = new ClientConnection(new Uri("icerpc://hello.zeroc.com"));

// no server address in service address
using var request = new OutgoingRequest(new ServiceAddress(new Uri("icerpc:/hello")));

// ClientConnection accepts requests that don't specify a server address
IncomingResponse response = await connection.InvokeAsync(request);
```
