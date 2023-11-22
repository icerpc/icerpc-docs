---
title: Encoding payloads with Protobuf
description: Learn how IceRPC + Protobuf formats the payloads of requests and responses.
---

The [Protocol Buffers Encoding] specifies how to encode or decode Protobuf messages to or from a stream of bytes.

However, this specification is silent on how Protobuf RPC methods frame their input and output messages. As a result, an
RPC framework that uses Protobuf needs to fill in this blank and describe what the payloads of its requests and
responses look like with Protobuf.

The IceRPC + Protobuf integration adopts the framing used by the [gRPC protocol]: a Protobuf input or output message
is encoded as a Length-Prefixed-Message inside a request or response payload:

- the first byte (`Compressed-Flag`) can be 0 or 1 (not compressed or compressed)
- the next 4 bytes (`Message-Length`) hold the length of the Protobuf-encoded message as an unsigned integer
  (big-endian ordering)
- the following bytes are the Protobuf-encoded message

It's a simple and uniform framing. IceRPC + Protobuf does not currently provide support for gRPC-style compression
(`Compress-Flag` set to 1) so `Compress-Flag` is always set to 0.

[gRPC protocol]: https://github.com/grpc/grpc/blob/master/doc/PROTOCOL-HTTP2.md
[Protocol Buffers Encoding]: https://protobuf.dev/programming-guides/encoding/
