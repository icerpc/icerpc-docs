---
title: IceRPC + Slice integration
description: Understand how the IceRPC + Slice integration applies the Slice encoding rules.
---

## Payload and payload continuation {% icerpcSlice=true %}

The IceRPC + Slice integration fills the payload of an [outgoing request] resp. [outgoing response] with the non-stream
arguments resp. return value (encoded into a segment).

It fills the payload continuation of an outgoing request (resp. outgoing response) with the encoded stream argument
resp. stream return value, if any.

[outgoing request]: /icerpc/invocation/outgoing-request
[outgoing response]: /icerpc/dispatch/outgoing-response
