---
title: Proxy string
description: Understand the new IceRPC syntax for proxy strings.
---

## Service address

With Ice, a proxy string or stringified proxy represents the address of a remote Ice object. The corresponding concept
in IceRPC is called a [service address].

Service address is a core concept in IceRPC: it doesn't depend on Slice. When you send a [request], you identify the
target service with a service address.

## Proxy string syntax

Ice uses its own syntax for proxy strings, while IceRPC uses URIs for service addresses. The object identity in a proxy
string is mapped to an absolute path in the service address URI as described on the [Ice identity](ice-identity) page.

Here are a few examples:

| Ice proxy string                                  | Corresponding IceRPC service address URI                               |
| ------------------------------------------------- | ---------------------------------------------------------------------- |
| `hello:tcp -h localhost -p 10000`                 | `ice://localhost:10000/hello?transport=tcp`                            |
| `IceGrid/Locator:default -h 192.168.1.2 -p 10000` | `ice://192.168.1.2:10000/IceGrid/Locator`                              |
| `hello:tcp -h h1 -p 10000:tcp -h h2 -p 10000`     | `ice://h1:10000/hello?transport=tcp&alt-server=h2:10000?transport=tcp` |

## Indirect proxies

In Ice, a proxy without an endpoint is called an "indirect proxy". When you send a request to such a proxy, you need a
Locator to locate the actual endpoints of this proxy.

In IceRPC, a service address without a server address has no special name: it's just a service address without a server
address. The Ice adapter id is mapped to an `adapter-id` query parameter:

| Ice proxy string       | Corresponding IceRPC service address URI |
| -----------------------| -----------------------------------------|
| `hello`                | `ice:/hello`                             |
| `hello@GreetersUnited` | `ice:/hello?adapter-id=GreetersUnited`   |

[request]: /icerpc/invocation/outgoing-request
[service address]: /icerpc/invocation/service-address
