---
title: Constructed types
description: Learn how to encode structs, enums, exceptions and proxies with Slice.
---

{% slice1 %}

## Class

The class encoding is complex and stateful. Since a class instance can point to another class instance (or even itself)
and bring this instance into the encoded byte stream, the class encoding requires an indexing system and a scope, namely
the payload of a request or a response.

The class encoding is described in the
[Ice manual](https://doc.zeroc.com/ice/3.7/ice-protocol-and-encoding/ice-encoding/data-encoding-for-classes). Slice1
corresponds to encoding version 1.1 in the Ice manual.

IceRPC encodes classes in the compact format by default, just like Ice. You can switch to the sliced format with the
`slicedFormat` attribute. IceRPC can decode classes in any format.

During decoding, IceRPC considers all classes that use the sliced format to be fully
[preserved](https://doc.zeroc.com/ice/3.7/client-server-features/slicing-values-and-exceptions#id-.SlicingValuesandExceptionsv3.7-PreservingSlices).

{% callout type="information" %}
There is no attribute to turn off class slice preservation during decoding: it's always on.
{% /callout %}
{% /slice1 %}

## Enum

{% slice1 %}
An enumerator is encoded as its associated numeric value using the
[variable-length size](encoding-only-constructs#variable-length-size) encoding.

For example:

```slice {% addEncoding=true %}
enum Fruit { Apple, Strawberry, Orange = 300 }
```

A `Strawberry` is encoded as `1` on 1 byte. An `Orange` is encoded as 255 (1 byte) followed by `300` encoded as an
int32 (5 bytes total).

The encoding is the same for checked and unchecked enums.
{% /slice1 %}

{% slice2 %}
An enumerator is encoded as its associated numeric value, using the encoding of the enumeration's underlying type.

For example:

```slice
enum Fruit : uint16 { Apple, Strawberry, Orange = 300 }
```

A `Strawberry` is encoded like a uint16 with value 1 (on 2 bytes). An `Orange` is encoded like a uint16 with value 300.

The encoding is the same for checked and unchecked enums.
{% /slice2 %}

## Exception

{% slice1 %}
An exception is encoded like a [class](#class) with the same fields. IceRPC always encodes exceptions in sliced format;
it can decode exceptions in any format.

Exceptions are not [preserved](https://doc.zeroc.com/ice/3.7/client-server-features/slicing-values-and-exceptions#id-.SlicingValuesandExceptionsv3.7-PreservingSlices)
during decoding: if IceRPC encounters a slice it doesn't know while decoding a sliced-format exception, this slice
is dropped.
{% /slice1 %}

{% slice2 %}
An exception is encoded exactly like a [struct](#struct) with the same fields.
{% /slice2 %}

## Proxy

A proxy is encoded as its [service address](../../icerpc-core/invocation/service-address). The name of the proxy's
interface is not encoded: it's only the proxy's untyped service address that gets encoded.

{% slice1 %}
If the proxy is null, we encode this proxy as the [null Ice identity](../../icerpc-for-ice-users/rpc-core/ice-identity)
(two empty strings).

Otherwise, we encode the service address like the following ServiceAddressData struct:
```slice {% addEncoding=true %}
compact struct ServiceAddressData {
    identity: Identity             // The service address path converted to an Ice identity (two strings).
    facet: sequence<string>        // The fragment encoded as an empty sequence or a 1-element sequence.
    invocationMode: InvocationMode // IceRPC always encodes Twoway and ignores this value during decoding.
    secure: bool                   // IceRPC always encodes false and ignores this value during decoding.
    protocolMajor: uint8           // 1 for ice and 2 for icerpc.
    protocolMinor: uint8           // Always 0.
    encodingMajor: uint8           // IceRPC always encodes 1 and ignores this value during decoding.
    encodingMinor: uint8           // IceRPC always encodes 1 and ignores this value during decoding.
    serverAddressList: sequence<ServerAddressData>
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

The adapterId field corresponds to the value of the `adapter-id` parameter. This value can be empty. See
[Proxy](../../icerpc-for-ice-users/rpc-core/proxy) for additional details.

The format of the encapsulation payload in a ServerAddressData depends on its transport code.

With transport code Uri (0), this payload is a URI string--the server address converted into a URI string, including the
protocol/scheme. It's a wildcard transport code since the actual transport is specified in the URI string, or is left
unspecified when the server address has no transport parameter. Uri is the only valid transport code with the icerpc
protocol.

{% callout type="information" %}
Encoding an icerpc proxy with Slice1 is possible but uncommon. Usually, you'll encode ice proxies with Slice1 and icerpc
proxies with Slice2.
{% /callout %}

Other transport codes identify specific transports, such as tcp, ssl, ws (for WebSocket), wss (WebSocket with TLS) etc.

Transport codes Tcp and Ssl share the same encapsulation payload format:

```slice {% addEncoding=true %}
compact struct TcpServerAddressBody {
    host: string
    port: int32      // limited in practice to uint16
    timeout: int32   // timeout parameter
    compress: bool   // z parameter
}
```

See [Endpoint](../../icerpc-for-ice-users/rpc-core/endpoint) for additional information.

If a server address in an ice service address does not specify a transport name, IceRPC uses transport code Tcp to
encode this server address.
{% /slice1 %}

{% slice2 %}
A service address is encoded as a URI [string](../primitive-types#String).
{% /slice2 %}

## Struct

{% slice1 %}
A compact struct is encoded as its fields, in definition order, without any framing.

{% callout type="information" %}
The name of the struct and the name of the struct's fields are not encoded at all. As a result, changing these names
does not break the "on-the-wire" contract.
{% /callout %}

_Example: simple compact struct_

```slice {% addEncoding=true %}
compact struct Point { x: int32, y: int32 }
```

A point x = 5, y = 32 is encoded as follows:

```
0x05 0x00 0x00 0x00: x's value (5 on 4 bytes in little-endian order)
0x20 0x00 0x00 0x00: y's value (32 on 4 bytes in little-endian order)
```

{% /slice1 %}

{% slice2 %}
A struct is encoded as:

- a [bit sequence](encoding-only-constructs#bit-sequence) with N bits, where N is the number of non-tagged fields with
  optional types in the struct, followed by
- the non-tagged fields encoded in definition order, followed by
- the tagged fields

The bit sequence is empty (and occupies no byte) when none of the struct's fields has an optional type (ignoring tagged
fields).

Each non-tagged field is encoded as follows:

- if the field has a non-optional type, encode the field value as usual.
- otherwise:
  - if the field value is set, set the corresponding bit in the bit sequence and encode the field value as usual.
  - otherwise, make sure the corresponding bit in the bit sequence is unset and don't encode anything else for this
      field.

The tagged fields of a struct are encoded in tag order (not in definition order); the field with the lowest tag number
is encoded first. For each tagged field:

- if the field value is not set, don't encode anything
- otherwise encode this field as `[number][size][value]` where number is the tag number encoded as a varint32, value is
the encoded field value and size is a varuint62 with the number of bytes in value.

Finally, we mark the end of the tagged fields (and the end of the struct) with the "tag end marker", -1 encoded as a
`varint32`.

### Compact struct

If a struct is marked `compact`, it cannot have any tagged field and its encoded representation does not include the tag
end marker.

The encoding of a regular (non-compact) struct always includes the tag end marker byte, even when it has no tagged
field. This is why a compact struct is slightly more compact than a regular struct.

{% callout type="information" %}
The name of the struct and the name of the struct's fields are not encoded at all. As a result, changing these names
does not break the "on-the-wire" contract.
{% /callout %}

_Example: simple compact struct_

```slice
compact struct Point { x: int32, y: int32 }
```

A point x = 5, y = 32 is encoded as follows:

```
0x05 0x00 0x00 0x00: x's value (5 on 4 bytes in little-endian order)
0x20 0x00 0x00 0x00: y's value (32 on 4 bytes in little-endian order)
```

_Example: compact struct with a bit sequence_

```slice
compact struct Contact {
  id: int32
  name: string?
  age: uint8?
}
```

The contact id = 5, name = not set, age = 42 is encoded as:

```
0b00000010:          bit sequence with only the bit at position 1 set
0x05 0x00 0x00 0x00: id (5)
-                    nothing for name since the bit at position 0 is not set
0x2A:                age (42 encoded on a single byte)
```

_Example: simple struct_

```slice
struct Point { x: int32, y: in32 }
```

A (non-compact) point x = 5, y = 32 is encoded as follows:

```
0x05 0x00 0x00 0x00: x's value (5 on 4 bytes in little-endian order)
0x20 0x00 0x00 0x00: y's value (32 on 4 bytes in little-endian order)
0xFC:                tag end marker (-1 varint32, encoded on 1 byte)
```

_Example: empty struct_

```slice
struct Empty {}
```

An instance of Empty is encoded as:

```
0xFC: tag end marker
```

_Example: struct with tagged fields_

```slice
struct Contact {
  id: int32
  tag(1) name: string?
  tag(2) age: uint8?
}
```

The contact id = 5, name = not set, age = 42 is encoded as:

```
-                    empty bit sequence since no non-tagged field has an optional type
0x05 0x00 0x00 0x00: id (5 on 4 bytes, little-endian)
-                    nothing for the name since it's not set
0x10:                age's tag (2 as a varint32 on 1 byte)
0x04:                age's value size (1 as a varuint62 on 1 byte)
0x2A:                age's encoded value on a single byte
0xFC:                tag end marker (-1 varint32, encoded on 1 byte)
```
{% /slice2 %}
