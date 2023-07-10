---
title: The Slice encoding
description: Learn about the main characteristics of the Slice encoding.
---

## Compact binary encoding

The Slice encoding defines how each Slice language construct is encoded into a stream of bytes. It's a non-self
describing binary encoding: the Slice encoding relies on the encoder and decoder sharing the same contract (Slice
definitions) to achieve compactness.

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
other encoded type, the decoding fails.

## Slice encoding versions

There are currently two versions of the Slice encoding: Slice1 and Slice2. The compilation mode of a Slice file
determines the Slice encoding version to use when encoding the arguments and return values of operations defined in that
file:

| Compilation mode | Slice encoding for operation args and return values |
|------------------|-----------------------------------------------------|
| Slice1           | Slice1                                              |
| Slice2           | Slice2                                              |

All types defined in a Slice1 file can be encoded with the Slice1 encoding, and all types defined in a Slice2 file can
be encoded with the Slice2 encoding.

Furthermore, a [Slice2-compatible][slice2-compatible] type defined in a Slice1 file can be encoded with the Slice2
encoding.

## Little-endian

When encoding integers and floating point numbers into multiple bytes, we have to select a byte ordering:
[little-endian or big-endian](https://en.wikipedia.org/wiki/Endianness).

All modern CPUs are little-endian, while the standard endianness for network protocols is big-endian.

We use Slice to encode/decode application data into/from request and response payloads. This application data typically
transits from one little-endian system to another little-endian system, so little-endian is simpler and slightly faster
for this use-case: it allows us to keep the native endianness on most systems.

On the other hand, the ice and icerpc protocols define their frame headers and control frames using Slice; this usage
favors big-endian ordering.

We selected little-endian because Slice's main job is to encode/decode the payloads of requests and responses. Its use
for the ice and icerpc frame headers is secondary. And it's simpler to use the same ordering (little-endian) in all
situations.

[slice2-compatible]: ../language-guide/compilation-mode#using-slice1-and-slice2-together
