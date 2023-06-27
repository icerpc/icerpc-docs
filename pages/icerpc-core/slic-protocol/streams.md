---
title: Streams
description: Understand how streams are created, closed and used to transmit data.
---

## What is a stream?

Data is transmitted through independent bidirectional or unidirectional streams. Multiple streams can be opened at the same time on a multiplexed connection. Streams are identified by an ever increasing 62-bit integer value.

Slic stream types and identifier are similar to QUIC, see
[RFC9000][rfc9000]. In particular, the first two
significant bits of a stream identifier are used to identify the initiator of the stream and the type of the stream.

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

## Sending and receiving data over a stream

The Stream and StreamLast frames cary a sequences of bytes provided by the application layer. Multiple Stream frames can
be sent over the Slic connection for a specific stream. They will be received in order by the peer. The StreamLast frame
is used to cary the last sequence of bytes that will be delivered to the peer for a given stream. Upon receiving this
frame, the peer can assume that no more data will be sent for this stream.

Sending a Stream frame after a StreamLast frame or multiple StreamLast frames for the same stream is considered a
protocol error.

[Head-of-line blocking][hol] very much depends on the size of a Stream or StreamLast frame. A large stream frame will
trigger more head-of-line blocking that smaller stream frame. The `PacketMaxSize` parameter exchanged connection
establishment allow to control the maximum size of a Stream or StreamLast frame.

[rfc9000]: https://www.rfc-editor.org/rfc/rfc9000.html#name-stream-types-and-identifier
[hol]: https://en.wikipedia.org/wiki/Head-of-line_blocking
