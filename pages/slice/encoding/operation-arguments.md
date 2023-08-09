---
title: Operation arguments
description: Understand how operation arguments are encoded with Slice.
---

## Payload of an outgoing request {% icerpcSlice=true %}

{% slice1 %}
The arguments of an operation are encoded into the payload of an outgoing request without any special framing.

This payload contains:

- a [compact struct](constructed-types#struct) holding all the non-tagged arguments, in definition order, followed by
- the tagged arguments

The tagged arguments are encoded in tag order (not in definition order); the argument with the lowest tag number is
encoded first. For each tagged argument:

- if the argument value is not set, don't encode anything.
- otherwise, encode this argument as a [tag record](encoding-only-constructs#tag-record).

Unlike the encoding of tagged fields in classes, the encoding of tagged arguments does not end with the tag end marker.
{% /slice1 %}

{% slice2 %} The payload of an outgoing request carries the arguments of the operation encoded as a [segment]. The body
of this segment corresponds to a virtual [struct](constructed-types#struct) with a field for each non-stream operation
parameter, in the same order.

Tagged parameters are mapped to tagged fields in the virtual struct.

The stream argument, if any, is not encoded into the payload but into the payload continuation (see below).
{% /slice2 %}

## Payload continuation of an outgoing request {% icerpcSlice=true %}

{% slice1 %}
The payload continuation of an outgoing request is always empty.
{% /slice1 %}

{% slice2 %}
The stream argument of an operation (if present) is encoded into the payload continuation of an outgoing request. If
there is no stream argument or the stream argument is empty, the payload continuation is empty.

If the stream parameter type is fixed-size (e.g., an `int32`), the stream is encoded as successive elements without any
demarcation.

If the stream parameter type is variable-size (e.g., a `string`), the stream is encoded as a series of segments, where
each segment holds a whole number of encoded elements—at least 1 element per segment. The segment's size corresponds to
the number of bytes in the segment, not the number of streamed elements encoded in this segment.

If the stream parameter type is an optional type (for example, an `int32?`), the stream parameter is encoded like a
stream of:

```slice
compact struct Element { value: T? }
```

where `T?` represents the stream parameter type.

## Empty optimization {% icerpcSlice=true %}

As an optimization, when an operation has no argument at all, the empty argument list can be encoded as an empty
payload plus an empty payload continuation.
{% /slice2 %}

[segment]: ../encoding-only-constructs#segment
