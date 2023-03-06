---
title: Operation arguments
description: Understand how operation arguments are encoded with Slice.
---

{% title /%}

## Payload of outgoing request

The arguments of an operation--stream argument aside--are encoded as a segment into the payload of an outgoing request.

This [segment](encoding-only-constructs-slice2#segment) contains:
- a [compact struct](constructed-types-slices2#struct) holding all the non-tagged arguments, in definition order,
    followed by
- the tagged arguments

The tagged arguments are encoded in tag order (not in definition order); the argument with the lowest tag is encoded
first. For each tagged argument:
- if the argument value is not set, don't encode anything.
- otherwise, encode this argument as: `[tag][size][value]` where tag is the tag encoded as a `varint32`, value is the
encoded argument value and size is a `varuint62` with the number of bytes in value.

## Payload continuation of outgoing request

The stream argument of an operation (if present) is encoded into the payload continuation of an outgoing request. If
there is no stream argument, the payload continuation is empty.

If the stream parameter type is an optional type (for example, an `int32?`), the stream is encoded like a stream of:
```slice
compact struct Element { value: T? }
```
where `T?` represents the stream parameter type.

If the stream parameter type is fixed-size (e.g., an `int32`), the stream is encoded as successive elements without any
demarcation.

If the stream parameter type is variable-size (e.g., a `string` or an `int32?`), the stream is encoded as a series of
segments, where each segment holds a whole number of encoded elements--at least 1 per segment. The segment's size
corresponds to the number of bytes in the segment, not the number of streamed elements encoded in this segment.

## Empty optimization

As an optimization, when an operation has no argument at all, the empty argument list can be encoded as an empty
payload plus an empty payload continuation.
