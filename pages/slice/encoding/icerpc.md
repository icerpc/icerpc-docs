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

## Proxies {% icerpcSlice=true %}

The IceRPC + Slice integration encodes a proxy by encoding its [service address].

{% slice1 %}
When it encodes a non-null service address, it sets the [ProxyData] fields as follows:

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

When IceRPC + Slice decodes a non-null service address, it processes the `ProxyData` fields as follows:

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
{% /slice1 %}

[outgoing request]: /icerpc/invocation/outgoing-request
[outgoing response]: /icerpc/dispatch/outgoing-response
[ProxyData]: user-defined-types#proxy
[segment]: encoding-only-constructs#segment
[service address]: /icerpc/invocation/service-address
