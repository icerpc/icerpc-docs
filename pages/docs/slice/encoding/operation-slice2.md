---
title: Operation
description: Learn how request and response payloads are encoded with Slice.
---

{% title /%}

## Protocol-independent payloads

When we encode an operation's arguments, we create the payload of an outgoing request. This payload is later received
as the payload of an incoming request.

Likewise, when we encode an operation's return value, we create the payload for a `Success` outgoing response. This
payload is later received as the payload of a `Success` incoming response.

The encoding/decoding for operation arguments and return values is protocol-independent. The payloads produced don't
depend on the protocol (ice or icerpc) of the request or response.

## Slice segment

A Slice segment is a `varuint62` size followed by size bytes. A Slice2-encoded request or response payload is either
empty or consists of one or more Slice segments.

## Non-stream arguments/return values

The arguments of an operation--stream argument aside--are encoded just like a struct holding all these arguments in
order, except:
 - this struct is logically enclosed in a Slice segment
 - there is no tag end marker at the end of the struct

The encoding of the arguments does not use a tag end marker because the end of the segment marks the end of the
argument list.

A return value is encoded exactly like an argument list.

## Stream argument/return value

The encoding of a stream argument follows the encoding of the non-stream arguments and depends on the stream parameter
type.

If the stream parameter type is fixed-size (for example, an `int32`), the stream is encoded as successive elements
without any delimiter.

If the stream parameter type is variable-size (for example, a `string`), the stream is encoded as a series of Slice
segments, where each Slice segment holds a whole number of encoded elements--at least 1 per segment. The segment's size
corresponds to the number of bytes in the segment, not the number of streamed elements encoded in this segment.

If the stream parameter type is an optional type (for example, an `int32?`), the stream is encoded like a stream of:
```slice
compact struct Element { value: T? }
```
This virtual struct parameter type is always variable-size.

A stream return value is encoded exactly like a stream argument, after the non-stream return values.

## Empty optimization

As an optimization, when an operation has no argument at all, the empty argument list can be encoded as an empty byte
buffer. The same optimization is available for responses of operations that don't return anything.

## ApplicationError response

When an operation completes with status code `ApplicationError`, the response's payload is a Slice segment that holds
the operation's exception, including this exception's tag end marker.

The encoding of an operation's exception is protocol-independent just like the encoding of the operation's arguments
and return value.
