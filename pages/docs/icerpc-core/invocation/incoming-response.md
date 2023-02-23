---
title: Incoming response
description: Understand how to interpret an incoming response.
---

{% title /%}

## Overview

The `invoke` method of an [invoker](invocation-pipeline#the-invoker-abstraction) returns an incoming response
asynchronously. This incoming response is created by the connection when it receives the response from the peer.

An incoming response holds:
 - a [status code](#status-code)
 - an error message, set only when the status code is not Success
 - response [fields](#response-fields)
 - the [payload](#response-payload) of the response

## Status code

The status code represents the status of the [dispatch](../dispatch/dispatch-pipeline#definition) by the peer. It can be
`Success` or a error. It's defined in Slice (LINK) as an enum:

```slice
unchecked enum StatusCode : varuint62
{
    Success = 0,
    ApplicationError,
    ServiceNotFound,
    OperationNotFound,
    ... more errors ...
}
```

The caller that consumes the response uses this status code to figure out the format of the response payload. For
example when the caller is Slice generated code (LINK), it interprets Success as meaning the response payload holds a
Slice-encoded return value.

## Response fields

The response fields represent out-of-band information carried by a response. These fields are usually read and written
by [middleware](../dispatch/middleware) and [interceptors](interceptor) in an effort to coordinate the processing of the
same response in the server and in the client.

A field is an entry in a dictionary `ResponseFieldKey` to sequence of bytes, where `ResponseFieldKey` is enum defined in
Slice (LINK):
```slice
unchecked enum ResponseFieldKey : varuint62
{
    CompressionFormat = 2,
    ...
}
```

For example, when the Compress middleware compresses the payload of an outgoing response, it sets the response field
CompressionFormat. This tells the Compress interceptor on the other side of the connection "this payload is compressed
with brotli"; the Compress interceptor can then decompress this (incoming) response payload.

## Response payload

The payload of a response is sequence of bytes that represents the return value of an operation. It's simply a
continuous sequence of bytes. As far as the IceRPC core is concerned, the size of this sequence is unknown.
