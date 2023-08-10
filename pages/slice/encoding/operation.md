---
title: Operation arguments and return values
description: Understand how operation arguments and return values are encoded with Slice.
---

## Encoding

The arguments and return value of an operation are encoded in exactly the same way. The text below describes the
encoding of arguments, and the same rules apply to return values.

{% slice1 %}
The arguments of an operation are encoded like a compact [struct] holding all the non-tagged arguments, in definition
order, followed by the tagged arguments.

The tagged arguments are encoded in tag order (not in definition order); the argument with the lowest tag number is
encoded first. For each tagged argument:

- if the argument value is not set, don't encode anything
- otherwise, encode this argument as a [tag record](encoding-only-constructs#tag-record)

Unlike the encoding of tagged fields in classes, the encoding of tagged arguments does not end with the tag end marker.
{% /slice1 %}

{% slice2 %}
The arguments of an operation are encoded as a [segment]. The body of this segment corresponds to a virtual [struct]
with a field for each non-stream operation parameter, in the same order.

Tagged parameters are mapped to tagged fields in the virtual struct.

### Stream encoding

The stream argument, if present, is encoded immediately after after the segment holding the non-stream arguments.

If the stream parameter type is fixed-size as far the Slice encoding is concerned (e.g., an `int32`), the stream is
encoded as successive elements without any demarcation.

If the stream parameter type is variable-size (e.g., a `string`), the stream is encoded as a series of segments, where
each segment holds a whole number of encoded elements—at least 1 element per segment. The segment's size corresponds to
the number of bytes in the segment, not the number of streamed elements encoded in this segment.

If the stream parameter type is an optional type (for example, an `int32?`), the stream parameter is encoded like a
stream of:

```slice
compact struct Element { value: T? }
```

where `T?` represents the stream parameter type.

### Empty optimization
As an optimization, when an operation has no argument at all, its empty argument list can be encoded as nothing at all.
{% /slice2 %}

## Payload and payload continuation {% icerpcSlice=true %}
{% slice1 %}
The IceRPC + Slice integration fills only the payloads of [outgoing requests][outgoing request] and
[outgoing responses][outgoing response]. The payload continuation of an outgoing request or response is always empty.
{% /slice1 %}
{% slice2 %}
The IceRPC + Slice integration fills the payload of an [outgoing request] resp. [outgoing response] with the non-stream
arguments (encoded into a segment as described above). It fills the payload continuation of an outgoing response
(resp. outgoing request) with the encoded stream argument (if any).
{% /slice2 %}

[outgoing request]: /icerpc/invocation/outgoing-request
[outgoing response]: /icerpc/dispatch/outgoing-response
[segment]: ../encoding-only-constructs#segment
[struct]: constructed-types#struct
