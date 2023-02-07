---
title: Service address
description: Understand the service address concept and syntax.
---

{% title /%}

## Concept

A service address encapsulates the information an application needs to reach a service. This information or address
consists of:
 - a protocol (ice or icerpc)
 - a path that allows the server to route requests to the desired service
 - 0 or more server addresses (LINK), used to establish or locate a connection to a server that hosts the service
 - optional query parameters (only when the service address has no server address)
 - an optional fragment; this fragment is only valid with the ice protocol where it represents an Ice facet name.

## Syntax

A service address is a URI (as per [RFC 3986](https://www.rfc-editor.org/rfc/rfc3986.html)).

In C#, record class `ServiceAddress` is just a parsed and validated representation of a service address URI: it holds
exactly the same information.

Service addresses can be divided in 3 categories:

### Service address with a single server address

A service address with a single server address is very common:
```
protocol://host[:port]/path[?name=value][&more name value params...][#fragment]`
```

protocol, host, port and the query parameters specify the server address of the service address. The path and the
optional fragment are properties of the service address itself.

For example:
```
icerpc://hello.zeroc.com/chatbot?transport=quic
```

Such a service address is typically used when making invocations with a connection cache. The connection cache uses the
server address to direct the request to the desired server.

### Service address with two or more server addresses

A service address URI can specify additional server addresses with the `alt-server` query parameter. The value of this
parameter is a server address without the `protocol://` prefix. For example:
```
icerpc://hello.zeroc.com/chatbot?alt-server=bonjour.zeroc.com,hola.zeroc.com
```

`alt-server` means the application can find the service in the first server or in any of these alternate servers.
`alt-server` is typically used for fault tolerance.

Each alt server address can have its own query parameters. For example:
```
icerpc://hello.zeroc.com/chatbot?transport=quic&alt-server=bonjour.zeroc.com?transport=tcp,hola.zeroc.com?transport=ssl
```

If an alt server address has multiple query parameters, it must use '$' instead of '&' to separate these parameters.
For example:
```
icerpc://hello.zeroc.com/chatbot?alt-server=bonjour.zeroc.com?transport=tcp$other=foo
```

### Service address with no server address

A service address URI with no host does not hold a server address. Its syntax is:
```
protocol:/path[?name=value][&more name value params...][#fragment]`
```

Here, the query parameters are properties of the service address itself. For example:
```
icerpc:/chatbot

ice:/chatbot?adapter-id=bot-club
```

A server address-less service address is often used with a client connection. Since a client connection is bound to a
single server address, there is no need to repeat the server address when making an invocation with such a connection.

For example:
```csharp
// connects to icerpc://hello.zeroc.com
await using var clientConnection = new ClientConnection(new Uri("icerpc://hello.zeroc.com"));

// no server address in service address
using var request = new OutgoingRequest(new ServiceAddress(new Uri("icerpc:/chatbot")));

// ClientConnection accepts requests that don't specify a server address
IncomingResponse response = await connection.InvokeAsync(request);
```
