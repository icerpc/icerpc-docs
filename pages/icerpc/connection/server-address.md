---
title: Server address
description: Understand the server address concept and syntax.
---

## Syntax

A server address is a [URI] with the following syntax: `protocol://host[:port][?name=value][&name=value...]`

- `protocol` (the URI scheme) is either `ice` or `icerpc`
- `host` is a DNS name or an IP address
- `port` is the port number; when not specified, the default port is 4061 for ice and 4062 for icerpc

A server address URI must have an empty path and no fragment. It can have query parameters; these parameters are usually
transport-specific.

The query parameter `transport` specifies the name of the underlying transport. Most applications use a single transport
and configure this transport as the only transport they can use. As a result, it is common to leave out `transport`
in server addresses.

In C#, struct [ServerAddress] is just a parsed and validated representation of a server address URI:
it holds exactly the same information.

## Client connection configuration

The main configuration for a client connection is the server's address. It tells the client connection how to reach the
server. It is common to use DNS names in these server addresses.

For example:

| Server address                      | Meaning                                                                                                         |
| ------------------------------------|-----------------------------------------------------------------------------------------------------------------|
| `icerpc://hello.zeroc.com`          | Connect to `hello.zeroc.com` on port 4062 using the icerpc protocol; the underlying transport is not specified. |
| `icerpc://192.168.100.10:10000?transport=quic` | Connect to `192.168.100.10` on port 10000 using the icerpc protocol over QUIC.                       |
| `ice://hello.zeroc.com`             | Connect to `hello.zeroc.com` on port 4061 using the ice protocol.                                               |

## Server configuration

You can specify the server address to listen on when you construct a server.

If you don't specify a server address, the default is `icerpc://[::0]`, which means listen for icerpc connections on
all interfaces on the default icerpc port (4062).

When constructing a server, the host of the server address must be a wildcard IP address such as `[::0]`, or the IP
address of a specific interface on the current system.

If you specify 0 for the port number, the OS will automatically assign a port number in its ephemeral range. The server
won't listen on tcp or udp port 0.

Here are some examples:

| Server address            | Meaning                                                                                                         |
| --------------------------|-----------------------------------------------------------------------------------------------------------------|
| `icerpc://192.168.100.10` | Listen for icerpc connections on the interface associated with `192.168.100.10`, using the default icerpc port. |
| `icerpc://[::0]:0`        | Listen for icerpc connections on all interfaces; the OS selects the port number to use.                         |
| `ice://0.0.0.0:10000`     | Listen for ice connections on all interfaces with an IPv4 address on port 10000.                                |

In C#, when you specify port 0 in your server address, [Listen] returns a server address with the port number selected
by the OS:

```csharp
using IceRpc;

await using var server = new Server(..., new Uri("icerpc://[::1]:0"));
ServerAddress actualServerAddress = server.Listen();
Console.WriteLine($"server is now listening on {actualServerAddress}); // shows actual port
// then somehow share this server address with the clients
```

[Listen]: csharp:IceRpc.Server#IceRpc_Server_Listen
[ServerAddress]: csharp:IceRpc.ServerAddress
[URI]: https://en.wikipedia.org/wiki/Uniform_Resource_Identifier
