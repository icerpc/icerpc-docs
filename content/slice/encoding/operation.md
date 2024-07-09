---
title: Operation arguments and return values
description: Understand how operation arguments and return values are encoded with Slice.
---

The arguments and return value of an operation are encoded in exactly the same way. The text below describes the
encoding of arguments, and the same rules apply to return values.

{% slice1 %}
The arguments of an operation are encoded like a compact [struct] holding all the non-tagged arguments, in definition
order, followed by the tagged arguments.

The tagged arguments are encoded in tag order (not in definition order); the argument with the lowest tag number is
encoded first. For each tagged argument:

- if the argument value is not set, nothing is encoded
- otherwise, the argument is encoded like a [tagged field]

Unlike the encoding of tagged fields in classes, the encoding of tagged arguments does not end with a tag end marker.
{% /slice1 %}

{% slice2 %}

## Non-stream encoding

The arguments of an operation are encoded as a [segment]. The body of this segment corresponds to a virtual [struct]
with a field for each non-stream operation parameter, in the same order.

Tagged parameters are mapped to tagged fields in the virtual struct.

## Stream encoding

The stream argument, if present, is encoded immediately after the segment holding the non-stream arguments.

If the stream parameter type has a fixed size as far as the Slice encoding is concerned (e.g., an `int32`), the stream
is encoded as successive elements without any demarcation.

Otherwise, the stream is encoded as a series of segments, where each segment holds a whole number of encoded elements—at
least 1 element per segment. The segment's size corresponds to the number of bytes in the segment, not the number of
streamed elements encoded in this segment.

If the stream parameter type is an optional type (for example, an `int32?`), the stream parameter is encoded like a
stream of:

```slice
compact struct Element { value: T? }
```

where `T?` represents the stream parameter type.

## Empty optimization

When an operation has no argument at all, its empty argument list can be encoded as a segment holding an empty struct
(as per the rules described above) or as nothing at all.
{% /slice2 %}

[segment]: encoding-only-constructs#segment
[struct]: user-defined-types#struct
[tagged field]: user-defined-types#class-tagged-field
