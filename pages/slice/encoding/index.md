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

## Slice encoding versions

There are currently two versions of the Slice encoding: Slice1 and Slice2. The [compilation mode] of a Slice file
determines the Slice encoding version to use when encoding the arguments and return values of operations defined in that
file:

| Compilation mode | Slice encoding for operation args and return values |
|------------------|-----------------------------------------------------|
| Slice1           | Slice1                                              |
| Slice2           | Slice2                                              |

All types defined in a Slice1 file can be encoded with the Slice1 encoding, and all types defined in a Slice2 file can
be encoded with the Slice2 encoding.

Furthermore, a [Slice2-compatible] type defined in a Slice1 file can be encoded with the Slice2 encoding.

## Byte ordering

Slice is [little-endian]: when encoding integers and floating point numbers into multiple bytes, the first byte encoded
into the byte stream holds the least significant portion of the value.

[compilation mode]: /slice/language-guide/compilation-mode
[little-endian]: https://en.wikipedia.org/wiki/Endianness
[slice2-compatible]: /slice/language-guide/compilation-mode#using-slice1-and-slice2-together
