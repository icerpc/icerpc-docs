---
title: Proxy types
description: Learn how to encode proxies with Slice.
---

## Encoding

{% slice1 %}
A null proxy is encoded as the [null Ice identity](/icerpc-for-ice-users/rpc-core/ice-identity) (two empty strings).

A non-null proxy is encoded as the following `ProxyData` struct:

```slice {% addMode=true %}
compact struct ProxyData {
    identity: Identity
    facet: Sequence<string>        // an empty sequence or a 1-element sequence
    invocationMode: InvocationMode
    secure: bool
    protocolMajor: uint8           // 1 = ice, 2 = icerpc
    protocolMinor: uint8
    encodingMajor: uint8
    encodingMinor: uint8
    serverAddressList: Sequence<ServerAddressData>
    adapterId: string              // only present when serverAddressList is empty
}

compact struct Identity {
    name: string
    category: string
}

enum InvocationMode { Twoway, Oneway, BatchOneway, Datagram, BatchDatagram }

compact struct ServerAddressData {
    transportCode: int16 // the TransportCode encoded as an int16
    encapsulation: Encapsulation
}

unchecked enum TransportCode {
    Uri = 0
    Tcp = 1
    Ssl = 2
    Udp = 3
    WS = 4
    Wss = 5
    BT = 6
    Bts = 7
    IAP = 8
    IAps = 9
}
```

Encapsulations are described on the [ice protocol] page. The format of the encapsulation payload in a
`ServerAddressData` depends on its transport code.

With transport code `Uri` (0), the encapsulation payload is a URI string: the server address converted into a URI
string, including the protocol/scheme. `Uri` is a wildcard transport code since the actual transport is specified in the
URI string, or is left unspecified when the server address has no transport parameter.

Other transport codes identify specific transports, such as tcp, ssl, ws (for WebSocket), wss (WebSocket with TLS) etc.

Transport codes `Tcp` and `Ssl` share the same encapsulation payload format:

```slice {% addMode=true %}
compact struct TcpServerAddressBody {
    host: string
    port: int32      // the port number
    timeout: int32   // timeout parameter
    compress: bool   // z parameter
}
```

See [Endpoint] for additional information.
{% /slice1 %}

{% slice2 %}
A proxy is encoded as a URI [string]. This URI can be absolute or relative.
{% /slice2 %}

## Implementation {% icerpcSlice=true %}

The IceRPC + Slice integration encodes a proxy by encoding its [service address].

{% slice1 %}
When the IceRPC + Slice integration encodes a non-null service address, it sets the `ProxyData` fields as follows:

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

When the IceRPC + Slice integration decodes a non-null service address, it processes the `ProxyData` fields as follows:

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

[ice protocol]: /icerpc/ice-protocol/protocol-frames#encapsulation
[Endpoint]: /icerpc-for-ice-users/rpc-core/endpoint
[service address]: /icerpc/invocation/service-address
[string]: ../primitive-types#String
