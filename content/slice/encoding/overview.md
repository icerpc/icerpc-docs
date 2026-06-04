---
title: The Slice encoding
---

## Compact binary serialization format

The Slice encoding defines how each Slice language construct is encoded into a stream of bytes. It's a non-self
describing format: the Slice encoding relies on the encoder and decoder sharing the same contract (Slice definitions) to
achieve compactness.

For example:

```slice
compact struct Item {
    name: string
    count: int32
}
```

The encoder encodes a `string` followed by an `int32` into a stream of bytes. Later on, a decoder decodes these bytes.
Since the decoder has the same definitions, it expects the stream to hold an encoded `string` followed by an
encoded `int32`. The stream does not encode "the following bytes represent a string". If the byte stream holds some
other encoded type, the decoding fails—or if by happenstance it succeeds, the decoded data is gibberish.

## Byte ordering

Slice is [little-endian]: when encoding integers and floating point numbers into multiple bytes, the first byte encoded
into the byte stream holds the least significant portion of the value.

[little-endian]: https://en.wikipedia.org/wiki/Endianness
