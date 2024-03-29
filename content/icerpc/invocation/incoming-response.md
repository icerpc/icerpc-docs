---
title: Incoming response
description: Understand how to interpret an incoming response.
---

## Receiving an incoming response

An [invoker](invocation-pipeline#the-invoker-abstraction) returns an incoming response asynchronously. This incoming
response is created by the connection when it receives the response from the peer.

An incoming response holds:

- a [status code](#status-code)
- an error message, set only when the status code is not `Ok`
- response [fields](#response-fields)
- the [payload](#response-payload) of the response

## Status code

The status code represents the status of the [dispatch] by the peer. It can be `Ok` or an error. [StatusCode] is an
enumeration defined in Slice:

```slice
unchecked enum StatusCode : varuint62 {
    Ok = 0
    ApplicationError
    NotFound
    NotImplemented
    ... more errors ...
}
```

The caller that consumes the response uses this status code to figure out the content of the response payload. For
example when the caller is code generated by the [Slice] compiler, it interprets `Ok` as meaning the response payload
holds a Slice-encoded return value.

## Response fields

The response fields represent out-of-band information carried by a response. These fields are usually read and written
by [middleware] and [interceptors] in an effort to coordinate the processing of the same response in the server and in
the client.

A field is an entry in a dictionary `ResponseFieldKey` to sequence of bytes, where [ResponseFieldKey] is an
enumeration defined in Slice.

```slice
unchecked enum ResponseFieldKey : varuint62 {
    CompressionFormat = 2
    ...
}
```

For example, when the compressor middleware compresses the payload of an outgoing response, it sets the response field
[CompressionFormat]. This tells the compressor interceptor on the other side of the connection "this payload is
compressed with brotli"; the compressor interceptor can then decompress this (incoming) response payload.

## Response payload

The payload of an incoming response is a stream of bytes that represents the return value of an operation. As far as
IceRPC is concerned, the number of bytes in this stream is unknown.

[dispatch]: ../dispatch/dispatch-pipeline#definition
[interceptors]: interceptor
[middleware]: ../dispatch/middleware
[Slice]: /slice

[ResponseFieldKey]: https://github.com/icerpc/icerpc-slice/blob/main/IceRpc/ResponseFieldKey.slice
[StatusCode]: https://github.com/icerpc/icerpc-slice/blob/main/IceRpc/StatusCode.slice
[CompressionFormat]: https://github.com/icerpc/icerpc-slice/blob/main/IceRpc/CompressionFormat.slice
