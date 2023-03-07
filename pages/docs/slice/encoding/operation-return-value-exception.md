---
title: Operation return value and exception
description: Learn how an operation's return value and exception is encoded with Slice.
---

{% title /%}

## Status code

The [status code](../../icerpc-core/invocation/incoming-response#status-code) of a response determines the contents of
the response payload. When the status code is `Success`, the payload contains the encoded return value. When the status
code is `ApplicationError`, the payload contains the encoded Slice exception thrown by the implementation of the
operation. For all other status codes, the payload is usually empty and the Slice engine does not attempt to decode this
payload.

## Payload of outgoing response (Success)

The elements of a return value--stream element aside--are encoded as a segment into the payload of an outgoing response
with status code `Success`.

This [segment](encoding-only-constructs-slice2#segment) contains:
- a [compact struct](constructed-types-slices2#struct) holding all the non-tagged elements, in definition order,
    followed by
- the tagged elements

The tagged elements are encoded in tag order (not in definition order); the element with the lowest tag is encoded
first. For each tagged element:
- if the element's value is not set, don't encode anything.
- otherwise, encode this element as: `[tag][size][value]` where tag is the tag encoded as a `varint32`, value is the
encoded element value and size is a `varuint62` with the number of bytes in value.

## Payload continuation of outgoing request (Success)

The stream element of return value (if present) is encoded into the payload continuation of an outgoing response. If
there is no stream element, the payload continuation is empty.

{% callout type="information" %}
The IceRPC core may not provide a payload continuation for outgoing responses in all programming languages. In this
case, the stream element is encoded at the end of the payload.
{% /callout %}

If the stream element type is an optional type (for example, an `int32?`), the stream is encoded like a stream of:
```slice
compact struct Element { value: T? }
```
where `T?` represents the stream element type.

If the stream element type is fixed-size (e.g., an `int32`), the stream is encoded as successive streamed elements
without any demarcation.

If the stream element type is variable-size (e.g., a `string` or an `int32?`), the stream is encoded as a series of
segments, where each segment holds a whole number of encoded elements--at least 1 per segment. The segment's size
corresponds to the number of bytes in the segment, not the number of streamed elements encoded in this segment.

## Payload of outgoing response (ApplicationError)

When an operation implementation throws the exception specified the operation's exception specification, this exception
is encoded as a segment into the payload of an outgoing response with status code `ApplicationError`.

This [segment](encoding-only-constructs-slice2#segment) contains only the encoded exception.

The payload continuation of the outgoing response is empty in this situation.

## Void optimization

As an optimization, when an operation has no return value, this "void" return value can be encoded as an empty payload
plus an empty payload continuation.
