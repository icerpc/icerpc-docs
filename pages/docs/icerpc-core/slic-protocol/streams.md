---
title: Streams
description: Learn how streams are created and closed
---

## What is a stream?

Data is transmitted through independent bidirectional or unidirectional streams. Multiple streams can be opened at the same time on a multiplexed connection. Streams are identified by an ever increasing 62-bit integer value.

Slic stream types and identifier are similar to Quic. In particular, the first two significant bits of a stream
identifier are used to identify the initiator of the stream and the type of the stream. See the Quic specification for
a definition of [stream types and identifier](https://www.rfc-editor.org/rfc/rfc9000.html#name-stream-types-and-identifier).

The stream data is carried by the [Stream](LINK) and [StreamLast](LINK) frames.

Several stream control frames are also used to notify the peer of:
- The [StreamReadsClosed](LINK) frame informs the peer of the stream reads closure.
- The [StreamWritesClosed](LINK) frame informs the peer of the stream writes closure.
- The [StreamWindowUpdate](LINK) frame informs the peer of a stream window size update.

Stream frames are sent over the Slic's underlying duplex connection. The sending of a stream frame can therefore block the sending of other stream frames or connection frames.

## Stream creation

Stream creation is initiated by the sending of the first Stream or StreamLast frame with a newly allocated stream identifier. Sending a control stream frame with a newly allocated stream identifier is a protocol error.

The peer accepts a new stream when it receives a Stream or StreamLast frame with a stream identifier which is larger than the stream identifier of the last accepted stream.

The stream identifier must be the next expected stream identifier. For example, if the last client-side initiated bidirectional stream identifier is 0, the next stream identifier for a client-initiated bidirectional stream should be 4.

## Stream closure

Each side of a stream maintains a read and write closed state. When the application is done sending data on a stream, it closes writes on the stream. When it's done reading data, it closes reads.

The update of the closed state of a stream triggers the sending of a stream control frame to the peer:
- If reads are closed, a StreamReadsClosed frame is sent. Upon receiving this frame, the peer stream should stop sending data and close stream writes.
- If writes are closed, a StreamWritesClosed frame is sent. Upon receiving this frame, the peer should stop reading data and close stream reads.

## Stream flow-control

TODO
