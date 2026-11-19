---
title: IceRPC + Slice integration
description: Understand how the IceRPC + Slice integration applies the Slice encoding rules.
---

## Payload and payload continuation {% icerpcSlice=true %}

The IceRPC + Slice integration fills the payload of an [outgoing request] resp. [outgoing response] with the non-stream
arguments resp. return value (encoded into a segment).

It fills the payload continuation of an outgoing request (resp. outgoing response) with the encoded stream argument
resp. stream return value, if any.

## Proxy {% icerpcSlice=true %}

A [proxy] is encoded as a [string] that holds:

- the URI of the proxy's [service address], such as `icerpc://widgets.example.com/widget/7`, or
- the percent-escaped path of the proxy, such as `/widget/my%20widget`, when the proxy is a [relative proxy]

The first character of this string distinguishes the two forms: a path starts with `/`.

[outgoing request]: /icerpc/invocation/outgoing-request
[outgoing response]: /icerpc/dispatch/outgoing-response
[proxy]: /slice/language-guide/using-proxies-as-slice-types
[relative proxy]: /slice/language-guide/using-proxies-as-slice-types#relative-proxy
[service address]: /icerpc/invocation/service-address
[string]: primitive-types#string
