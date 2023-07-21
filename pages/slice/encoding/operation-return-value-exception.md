---
title: Operation return value and exception
description: Learn how an operation's return value and exception is encoded with Slice.
---

## IceRPC-specific rules

The encoding rules on this page are specific to the IceRPC-Slice integration. If you use Slice with another RPC
framework, consult the documentation for this specific integration.

## Status code

The [status code](../../icerpc/invocation/incoming-response#status-code) of a response determines the contents of
the response payload. When the status code is `Success`, the payload contains the encoded return value. When the status
code is `ApplicationError`, the payload contains the encoded Slice exception thrown by the implementation of the
operation. For all other status codes, the payload is usually empty and the generated code does not attempt to decode
this payload.

## Payload of an outgoing response (Success)

{% slice1 %}
The return value of an operation is encoded into the payload of a `Success` outgoing response without any special
framing.

This payload contains:

- a [compact struct](constructed-types#struct) holding all the non-tagged return value elements, in definition order,
  followed by
- the tagged return value elements

The tagged elements are encoded in tag order (not in definition order); the element with the lowest tag number is
encoded first. For each tagged element:

- if the element value is not set, don't encode anything.
- otherwise, encode this element as a [tag record](encoding-only-constructs#tag-record).

Unlike the encoding of tagged fields in classes, the encoding of tagged elements does not end with the tag end marker.
{% /slice1 %}

{% slice2 %}
The payload of a `Success` outgoing response carries the return value of the operation encoded as a [segment][segment].
The body of this segment corresponds to a virtual [struct](constructed-types#struct) with a field for each non-stream
return parameter, in the same order.

Tagged return parameters are mapped to tagged fields in the virtual struct.

The stream return element, if any, is not encoded into the payload but into the payload continuation (see below).
{% /slice2 %}

{% slice2 %}

## Payload continuation of an outgoing response (Success)

The stream element of a return value (if present) is encoded into the payload continuation of an outgoing response. If
there is no stream element or the stream element is empty, the payload continuation is empty.

{% callout type="information" %}
IceRPC may not provide a payload continuation for outgoing responses in all programming languages. In this case,
the stream element is encoded at the end of the payload.
{% /callout %}

If the stream element type is fixed-size (e.g., an `int32`), the stream is encoded as successive streamed elements
without any demarcation.

If the stream element type is variable-size (e.g., a `string`), the stream is encoded as a series of segments, where
each segment holds a whole number of encoded elements—at least 1 per segment. The segment's size corresponds to the
number of bytes in the segment, not the number of streamed elements encoded in this segment.

If the stream element type is an optional type (for example, an `int32?`), the stream is encoded like a stream of:

```slice
compact struct Element { value: T? }
```

where `T?` represents the stream element type.
{% /slice2 %}

## Payload of an outgoing response (ApplicationError)

{% slice1 %}
When an operation implementation throws an exception whose type matches the operation's exception specification, this
exception is encoded into the payload of an outgoing response with status code `ApplicationError`.
{% /slice1 %}

{% slice2 %}
When an operation implementation throws an exception whose type matches the operation's exception specification, this
exception is encoded inside a segment into the payload of an outgoing response with status code `ApplicationError`.

This segment contains only the encoded exception, and the payload continuation of the outgoing response is empty in this
situation.

## Void optimization

As an optimization, when an operation has no return value, a "void" return value can be encoded as an empty payload and
an empty payload continuation.
{% /slice2 %}

{% slice1 %}

## Payload continuation of an outgoing response

The payload continuation of an outgoing response is always empty.
{% /slice1 %}

[segment]: encoding-only-constructs#segment
