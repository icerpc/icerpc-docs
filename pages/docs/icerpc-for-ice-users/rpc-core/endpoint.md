---
title: Endpoint
description: Understand the new IceRPC syntax for endpoint strings.
---

## Server address

An endpoint is called a server address in IceRPC. An endpoint (server address) is the address of an object adapter
(renamed server with IceRPC) that accepts connections.

## String syntax

Ice uses its own syntax for endpoint strings, while IceRPC uses URIs. Here are a few examples:

| Ice endpoint                           | Corresponding IceRPC server address URI           |
|----------------------------------------|---------------------------------------------------|
| `tcp -h localhost -p 10000`            | `ice://localhost:10000?transport=tcp`             |
| `default -h localhost -p 10000`        | `ice://localhost:10000`                           |
| `ssl -h 192.168.100.10`                | `ice://192.168.100.10:0?transport=ssl`            |
| `default -h "::0" -p 10000`            | `ice:://[::0]:10000`                              |
| `tcp -h *`                             | `ice:://[::0]:0?transport=tcp`                    |

## Endpoint options

Ice endpoints support a number of transport-specific options. For tcp/ssl, none of these options have any effect on
IceRPC. Nevertheless, when IceRPC decodes a Slice1-encoded ice service address with a tcp or ssl server address, it
converts its tcp/ssl options into server address parameters to be able to later re-encode this server address without
losing information.

| Ice tcp/ssl endpoint option | Corresponding query parameter in IceRPC server address URI |
|-----------------------------|------------------------------------------------------------|
| `-z`                        | `z`                                                        |
| `-t timeout`                | `t=timeout`                                                |

{% callout type="information" %}
Ice's local endpoint options (such as `--sourceAddress`) have no equivalent in IceRPC. All server address parameters are "non-local".

With IceRPC for C#, you would set [TcpClientTransportOptions.LocalNetworkAddress]() to configure your tcp/ssl source
address.
{% /callout %}
