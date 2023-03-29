---
title: Outgoing request
description: Learn how to create outgoing requests.
---

## Overview

In order to make a RPC, you construct an outgoing request and then pass this request as a parameter to the `invoke`
method of an [invoker](invocation-pipeline#the-invoker-abstraction).

An outgoing request carries all the data an invoker needs to send a request:

- the [service address](service-address) of the target service
- the name of the operation on this service
- request [fields](#request-fields)
- the [payload](invocation-pipleine#payload-and-payload-continuation) of the request

In C#, an outgoing request also holds [features](#request-features). These features are used for local communications
with the invocation pipeline, and within this pipeline.

## Request fields

The request fields represent out-of-band information carried by a request "over the wire". These fields are usually read
and written by [interceptors](interceptor) and [middleware](../dispatch/middleware) in an effort to coordinate the
processing of the same request in the client and in the server.

A field is an entry in a dictionary `RequestFieldKey` to sequence of bytes, where `RequestFieldKey` is an enumeration
defined in Slice (LINK):

```slice
unchecked enum RequestFieldKey : varuint62 {
    Context = 0
    TraceContext = 1
    CompressionFormat = 2
    Deadline = 3
    Idempotent = 4
}
```

For example, when the `Compress` interceptor compresses the payload of an outgoing request, it sets the request field
`CompressionFormat`. This tells the `Compress` middleware on the other side of the connection "this payload is
compressed with brotli"; the `Compress` middleware can then decompress this (incoming) request payload.

## Request payload and payload continuation

The payload of a request is a stream of bytes. It typically represents the argument(s) of an operation. When a
connection sends a request, it reads and logically copies these bytes to the network connection until there is no more
byte to read.

On the other side, the connection reads these bytes from the network and give them to a
[dispatcher](../dispatch/dispatch-pipeline#the-dispatcher-abstraction).

BENOIT: the continuation sending can continue after the response so this paragraph isn't really correct?
The payload of an outgoing request is actually split in two: a first part that the connection sends before awaiting the
response, and a second part (the "continuation") that the connection sends in the background while it awaits, receives
and returns the response.

```mermaid
sequenceDiagram
    Local->>Remote: request header + payload
    par Local to Remote
        Local->>Remote: request payload continuation
    and Remote to Local
        Remote->>Local: response header + payload
    end
```

On the other side, the dispatcher sees only one continuous incoming request payload.

## Request features

It is common for the invokers in an invocation pipeline to transmit information to each other during an invocation. For
example, the `Retry` interceptor needs to communicate with the `ConnectionCache` to make sure the `ConnectionCache` does
not keep retrying with the same server address. These invokers get and set request features (C# link) to communicate
with each other.

You can also use these features to communicate with the invocation pipeline. For example, you can set the feature
`ICompressFeature` to ask the `Compress` interceptor (if installed) to compress the payload of your request:

```csharp
using var request = new OutgoingRequest(serviceAddress)
{
    Payload = largePayload,
    Features = new FeatureCollection().With<ICompressFeature>(CompressFeature.Compress)
};

// Hopefully invoker is an invocation pipeline with a Compress interceptor.
IncomingResponse response = await invoker.InvokeAsync(request);
```

By convention, the features are keyed using interface types, such as `ICompressFeature` in the example above.

{% callout type="information" %}
Fields are used for communications "over the wire" while features are used for local communications within an invocation
pipeline. IceRPC provides both request fields (carried by requests) and response fields (carried by responses), but
only request features: since it's all local, there is no need for response features.
{% /callout %}
