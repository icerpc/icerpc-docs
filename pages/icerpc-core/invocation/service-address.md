---
title: Service address
description: Understand the service address concept and syntax.
---

## Syntax

A service address is a [URI][uri] that specifies the address of a service. It can be either absolute or relative.

- **Absolute Service Address:** Contains the protocol, `ice` or `icerpc`, required to reach the target service.
  - The URI scheme identifies the protocol required to access the target service.
  - An absolute service address may include one or more [server addresses](../connection/server-address), which can be
    used to establish or locate a connection to a server hosting the service. The protocol of the server address matches
    that of the enclosing service address.
  - An absolute service address without a server address can have query parameters.
- **Relative Service Address:** An absolute path that does not query parameters or fragments.

{% callout %}

An `ice` service address can have a fragment; this fragment corresponds to an Ice facet.

{% /callout %}

The **path** of a service address allows the server to route requests to the desired service.

In C#, the record class [`ServiceAddress`][service-address] provides a parsed and validated representation of a service
address URI.

## Categories of service addresses

Service addresses can be categorized into four distinct types based on their syntax.

### Service address with a single server address

A service address with a single server address is very common:

```
icerpc://host[:port]/<path>[?name=value][&name=value...]
icerpc://host[:port]/<path>[?name=value][&name=value...][#fragment]
```

The protocol (ice or icerpc), host, port and the query parameters specify the server address of the service address. The
path and the optional fragment are properties of the service address itself.

#### Example

```
icerpc://hello.zeroc.com/hello?transport=quic
```

Such a service address is typically used when making invocations with a connection cache. The connection cache uses the
server address to establish or reuse a connection to the target server and send requests on this connection.

### Service address with two or more server addresses

A service address can specify additional server addresses with the `alt-server` query parameter. The value of this
parameter is a server address without the `ice://` or `icerpc://` prefix.

#### Example

```
icerpc://hello.zeroc.com/hello?alt-server=bonjour.zeroc.com,hola.zeroc.com
```

`alt-server` means the application can find the service in the first server or in any of these alternate servers. It's
typically used for fault tolerance.

Each alt-server address can have its own query parameters.

#### Example

```
icerpc://hello.zeroc.com/hello?transport=quic&alt-server=bonjour.zeroc.com?transport=tcp,hola.zeroc.com?transport=tcp
```

If an alt-server address has multiple query parameters, it must use '$' instead of '&' to separate these parameters.

#### Example

```
icerpc://hello.zeroc.com/hello?alt-server=bonjour.zeroc.com?transport=tcp$other=foo
```

### Absolute service address with no server address

An absolute service address with no host does not specify a server address. Its syntax is:

```
icerpc:/path[?name=value][&name=value...]
ice:/path[?name=value][&name=value...][#fragment]
```

Here, the query parameters are properties of the service address itself.

#### Example:

```
icerpc:/greeter
ice:/greeter?adapter-id=greeter-union
```

A server address-less service address is often used with a `ClientConnection`. Since a client connection is bound to a
single server address, there is no need to repeat the server address when making an invocation with such a connection.

#### Example:

```csharp
// connects to icerpc://hello.zeroc.com
await using var clientConnection = new ClientConnection(new Uri("icerpc://hello.zeroc.com"));

// no server address in service address
using var request = new OutgoingRequest(new ServiceAddress(new Uri("icerpc:/greeter")));

// ClientConnection accepts requests that don't specify a server address
IncomingResponse response = await connection.InvokeAsync(request);
```

### Relative service address

A relative service address consists of an absolute path. The IceRPC core does not consume relative service addresses;
in particular, it's an error to create an outgoing request with a relative service address.

Relative service addresses underpin [relative proxies][relative-proxies] in Slice.

[relative-proxies]: ../../../slice/language-guide/proxy-types#relative-proxy
[service-address]: csharp:IceRpc.ServiceAddress
[uri]: https://en.wikipedia.org/wiki/Uniform_Resource_Identifier
