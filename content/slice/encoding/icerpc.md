---
title: IceRPC + Slice integration
description: Understand how the IceRPC + Slice integration applies the Slice encoding rules.
---

## Payload and payload continuation {% icerpcSlice=true %}

The IceRPC + Slice integration fills the payload of an [outgoing request] resp. [outgoing response] with the non-stream
arguments resp. return value (encoded into a segment).

It fills the payload continuation of an outgoing response (resp. outgoing request) with the encoded stream argument
resp. stream return value, if any.

## Custom type ServiceAddress {% icerpcSlice=true %}

A [service address] is represented in Slice by the custom type `IceRpc::ServiceAddress`:

```slice
[cs::identifier("IceRpc.Slice")]
module IceRpc

/// Represents the address of an RPC service that can be called using ice or icerpc.
[cs::type("IceRpc.ServiceAddress")]
custom ServiceAddress
```

A service address is encoded as a URI [string]. This URI can be absolute or relative.
[Endpoint]: /icerpc-for-ice-users/rpc-core/endpoint
[ice protocol]: /icerpc/ice-protocol/protocol-frames#encapsulation
[outgoing request]: /icerpc/invocation/outgoing-request
[outgoing response]: /icerpc/dispatch/outgoing-response
[service address]: /icerpc/invocation/service-address
[string]: primitive-types#String
