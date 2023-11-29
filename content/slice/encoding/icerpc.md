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

## Custom type ServiceAddress {% icerpcSlice=true %}

A [service address] is represented in Slice by the custom type `IceRpc::ServiceAddress`:

```slice
mode = Slice1

[cs::namespace("IceRpc.Slice")]
module IceRpc

/// Represents the address of an RPC service that can be called using ice or icerpc. This custom type is
/// compatible with both Slice1 and Slice2.
[cs::type("IceRpc.ServiceAddress")]
custom ServiceAddress
```

{% slice2 %}
A service address is encoded as a URI [string]. This URI can be absolute or relative.
{% /slice2 %}

{% slice1 %}

## Encoding a ServiceAddress {% icerpcSlice=true %}

A null service address is encoded as the [null Ice identity](/icerpc-for-ice-users/rpc-core/ice-identity) (empty category and name strings).

A non-null service address is encoded as the following `ServiceAddressData` struct:

```slice {% addMode=true %}
compact struct ServiceAddressData {
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

When the IceRPC + Slice integration encodes a non-null service address, it sets the `ServiceAddressData` fields as
follows:

| ServiceAddressData field | Value set by IceRPC + Slice when encoding                                          |
|--------------------------|------------------------------------------------------------------------------------|
| identity                 | Ice identity computed from the service address path                                |
| facet                    | Ice facet computed from the service address fragment                               |
| invocationMode           | `Twoway`                                                                           |
| secure                   | `false`                                                                            |
| protocolMajor            | `1` for ice, `2` for icerpc                                                        |
| protocolMinor            | `0`                                                                                |
| encodingMajor            | `1`                                                                                |
| encodingMinor            | `1`                                                                                |
| serverAddressList        | Computed from the server address and alt server address(es) of the service address |
| adapterId                | The value of the `adapter-id` parameter                                            |

The server addresses use only the `Uri` transport code when the protocol is `icerpc`.

## Decoding a ServiceAddress {% icerpcSlice=true %}

When the IceRPC + Slice integration decodes a Slice1-encoded [service address] into a non-null service address, it
processes the `ServiceAddressData` fields as follows:

| ServiceAddressData field | Service address decoded by IceRPC + Slice                                           |
|--------------------------|-------------------------------------------------------------------------------------|
| identity                 | Converted into the service address path                                             |
| facet                    | Converted into the service address fragment                                         |
| invocationMode           | Ignored                                                                             |
| secure                   | Ignored                                                                             |
| protocolMajor            | `1` for ice, `2` for icerpc; other values are invalid                               |
| protocolMinor            | Must be 0                                                                           |
| encodingMajor            | Ignored                                                                             |
| encodingMinor            | Ignored                                                                             |
| serverAddressList        | Converted into the server address and alt server address(es) of the service address |
| adapterId                | Converted into an `adapter-id` parameter if not empty                               |

The proxy options ignored and therefore lost during decoding are invocation mode (`-t`, `-o`, `-D` etc.), secure
(`-s`), and encoding (`-e`).

For example:

| Service address to decode (with Ice proxy string syntax) | Decoded as                                        |
| ---------------------------------------------------------| ------------------------------------------------- |
| `hello -f facet:tcp -h localhost -p 10000`               | `ice://localhost:10000/hello?transport=tcp#facet` |
| `hello -p 2.0:ssl -h localhost -p 10000`                 | `icerpc://localhost:10000/hello?transport=ssl`    |
| `hello -o -s:ssl -h localhost -p 10000`                  | `ice://localhost:10000/hello?transport=ssl`       |
| `hello -t`                                               | `ice:/hello`                                      |
| `hello`                                                  | `ice:/hello`                                      |
| `hello@GreetersUnited`                                   | `ice:/hello?adapter-id=GreetersUnited`            |
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

{% /slice1 %}

[Endpoint]: /icerpc-for-ice-users/rpc-core/endpoint
[ice protocol]: /icerpc/ice-protocol/protocol-frames#encapsulation
[outgoing request]: /icerpc/invocation/outgoing-request
[outgoing response]: /icerpc/dispatch/outgoing-response
[service address]: /icerpc/invocation/service-address
[string]: primitive-types#String
