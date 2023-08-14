---
title: IceRPC + Slice integration
description: Understand how the IceRPC + Slice integration applies the Slice encoding rules.
---

## Payload and payload continuation {% icerpcSlice=true %}

{% slice1 %}
The IceRPC + Slice integration fills only the payloads of [outgoing requests][outgoing request] and
[outgoing responses][outgoing response] with the encoded arguments resp. return values. The payload continuation of an
outgoing request or response is always empty.
{% /slice1 %}
{% slice2 %}
The IceRPC + Slice integration fills the payload of an [outgoing request] resp. [outgoing response] with the non-stream
arguments resp. return value (encoded into a segment).

It fills the payload continuation of an outgoing response (resp. outgoing request) with the encoded stream argument
resp. stream return value, if any.
{% /slice2 %}

{% slice1 %}
## Decoding proxies {% icerpcSlice=true %}

When the IceRPC + Slice integration decodes a Slice1-encoded proxy into a non-null [service address], it processes the
[ProxyData] fields as follows:

| ProxyData field   | Service address decoded by IceRPC + Slice                                           |
|-------------------|-------------------------------------------------------------------------------------|
| identity          | Converted into the service address path                                             |
| facet             | Converted into the service address fragment                                         |
| invocationMode    | Ignored                                                                             |
| secure            | Ignored                                                                             |
| protocolMajor     | `1` for ice, `2` for icerpc; other values are invalid                               |
| protocolMinor     | Must be 0                                                                           |
| encodingMajor     | Ignored                                                                             |
| encodingMinor     | Ignored                                                                             |
| serverAddressList | Converted into the server address and alt server address(es) of the service address |
| adapterId         | Converted into an `adapter-id` parameter if not empty                               |

The proxy options lost (ignored) during decoding are invocation mode (`-t`, `-o`, `-D` etc.), secure (`-s`), and
encoding (`-e`).

For example:

| Proxy to decode (with Ice proxy string syntax) | Decoded as                                        |
| -----------------------------------------------| ------------------------------------------------- |
| `hello -f facet:tcp -h localhost -p 10000`     | `ice://localhost:10000/hello?transport=tcp#facet` |
| `hello -p 2.0:ssl -h localhost -p 10000`       | `icerpc://localhost:10000/hello?transport=ssl`    |
| `hello -o -s:ssl -h localhost -p 10000`        | `ice://localhost:10000/hello?transport=ssl`       |
| `hello -t`                                     | `ice:/hello`                                      |
| `hello`                                        | `ice:/hello`                                      |
| `hello@GreetersUnited`                         | `ice:/hello?adapter-id=GreetersUnited`            |
| `hello -t:opaque -t 5 -e 1.1 -v CTEyNy4wLjAuMeouAAAQJwAAAA==` | `ice://opaque/hello?e=1.1&t=5&transport=opaque&v=CTEyNy4wLjAuMeouAAAQJwAAAA==` |

When the IceRPC + Slice integration decodes a Slice1-encoded server address with a transport code it doesn't know, it
creates a server address with the opaque transport. The opaque transport supports the following options:

| Ice opaque endpoint option | Query parameter in IceRPC server address URI |
| -------------------------- | -------------------------------------------- |
| `-e 1.1`                   | `e=1.1`                                      |
| `-t transportCode`         | `t=transportCode`                            |
| `-v base64Value`           | `v=base64Value`                              |

An opaque server address URI always starts with `ice://opaque/`; the host ("opaque") and port (4061) are meaningless
since the actual host and port are encoded in the value of the `v` parameter.

The opaque transport allows you to decode any proxy received from an Ice application and later re-encode this proxy
without losing any server address information.

## Encoding proxies {% icerpcSlice=true %}

The IceRPC + Slice integration encodes a proxy by encoding its service address. When it encodes a non-null service
address, it sets the `ProxyData` fields as follows:

| ProxyData field   | Value set by IceRPC + Slice when encoding                                          |
|-------------------|------------------------------------------------------------------------------------|
| identity          | Ice identity computed from the service address path                                |
| facet             | Ice facet computed from the service address fragment                               |
| invocationMode    | `Twoway`                                                                           |
| secure            | `false`                                                                            |
| protocolMajor     | `1` for ice, `2` for icerpc                                                        |
| protocolMinor     | `0`                                                                                |
| encodingMajor     | `1`                                                                                |
| encodingMinor     | `1`                                                                                |
| serverAddressList | Computed from the server address and alt server address(es) of the service address |
| adapterId         | The value of the `adapter-id` parameter                                            |

The server addresses use only the `Uri` transport code when the protocol is `icerpc`.
{% /slice1 %}

{% slice2%}
## Proxies {% icerpcSlice=true %}

The IceRPC + Slice integration encodes a proxy by encoding its [service address].
{% /slice2 %}

[outgoing request]: /icerpc/invocation/outgoing-request
[outgoing response]: /icerpc/dispatch/outgoing-response
[ProxyData]: user-defined-types#proxy
[segment]: encoding-only-constructs#segment
[service address]: /icerpc/invocation/service-address
