---
title: Proxy types
description: Learn how to encode proxies with Slice.
---

## Service address {% icerpcSlice=true %}

A proxy is encoded as its [service address](/icerpc/invocation/service-address) and only its service address.
The name of the proxy's interface is not encoded: it's only the proxy's untyped service address that gets encoded.

{% slice1 %}
If the proxy is null, we encode this proxy as the [null Ice identity](/icerpc-for-ice-users/rpc-core/ice-identity)
(two empty strings).

Otherwise, we encode the service address like the following `ServiceAddressData` struct:

```slice {% addMode=true %}
compact struct ServiceAddressData {
    identity: Identity             // The service address path converted to an Ice identity (two strings).
    facet: Sequence<string>        // The fragment encoded as an empty sequence or a 1-element sequence.
    invocationMode: InvocationMode // IceRPC always encodes Twoway and ignores this value during decoding.
    secure: bool                   // IceRPC always encodes false and ignores this value during decoding.
    protocolMajor: uint8           // 1 for ice and 2 for icerpc.
    protocolMinor: uint8           // Always 0.
    encodingMajor: uint8           // IceRPC always encodes 1 and ignores this value during decoding.
    encodingMinor: uint8           // IceRPC always encodes 1 and ignores this value during decoding.
    serverAddressList: Sequence<ServerAddressData>
    adapterId: string              // Encoded only when serverAddressList is empty.
}

compact struct Identity {
    name: string
    category: string
}

enum InvocationMode { Twoway, Oneway, BatchOneway, Datagram, BatchDatagram }

compact struct ServerAddressData {
    transportCode: int16 // the TransportCode (see below) encoded as an int16
    encapsulation: Encapsulation
}

compact struct Encapsulation {
    size: int32              // payload size + 6
    encodingMajor: uint8     // always 1
    encodingMinor: uint8     // always 1
    payload: uint8[...]      // pseudo-Slice
}

unchecked enum TransportCode {
    Uri = 0
    Tcp = 1
    Ssl = 2
}
```

The `adapterId` field corresponds to the value of the `adapter-id` parameter. This value can be empty. See
[Proxy](../../icerpc-for-ice-users/rpc-core/proxy) for additional details.

The format of the encapsulation payload in a `ServerAddressData` depends on its transport code.

With transport code `Uri` (0), this payload is a URI string: the server address converted into a URI string, including
the protocol/scheme. It's a wildcard transport code since the actual transport is specified in the URI string, or is
left unspecified when the server address has no transport parameter. `Uri` is the only valid transport code with the
icerpc protocol.

{% callout type="information" %}
Encoding an icerpc proxy with Slice1 is possible but uncommon. Usually, you'll encode ice proxies with Slice1 and icerpc
proxies with Slice2.
{% /callout %}

Other transport codes identify specific transports, such as tcp, ssl, ws (for WebSocket), wss (WebSocket with TLS) etc.

Transport codes `Tcp` and `Ssl` share the same encapsulation payload format:

```slice {% addMode=true %}
compact struct TcpServerAddressBody {
    host: string
    port: int32      // limited in practice to uint16
    timeout: int32   // timeout parameter
    compress: bool   // z parameter
}
```

See [Endpoint](../../icerpc-for-ice-users/rpc-core/endpoint) for additional information.

If a server address in an ice service address does not specify a transport name, IceRPC uses transport code `Tcp` to
encode this server address.
{% /slice1 %}

{% slice2 %}
A service address is encoded as a URI [string](../primitive-types#String).
{% /slice2 %}
