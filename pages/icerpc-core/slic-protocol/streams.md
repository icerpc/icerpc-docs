---
title: Streams
description: Understand how streams are created, closed and used to transmit data.
---

## What is a stream?

Data is transmitted through independent bidirectional or unidirectional streams. Multiple streams can be opened at the same time on a multiplexed connection. Streams are identified by an ever increasing 62-bit integer value.

Slic stream types and identifier are similar to QUIC, see [RFC9000][rfc9000]. In particular, the first two significant
bits of a stream identifier are used to identify the initiator of the stream and the type of the stream.

The application data is carried by the [Stream][stream-frame] and [StreamLast][stream-last-frame] frames.

Several stream control frames are also used:
- The [StreamReadsClosed][stream-reads-closed-frame] frame informs the peer of the stream reads closure.
- The [StreamWritesClosed][stream-writes-closed-frame] frame informs the peer of the stream writes closure.
- The [StreamWindowUpdate][stream-window-update-frame] frame informs the peer of a stream window size update.

Stream frames are sent over the Slic's underlying duplex connection. The sending of a stream frame can therefore block the sending of other stream frames or connection frames.

## Stream creation

Stream creation is initiated by the sending of the first [Stream][stream-frame] or [StreamLast][stream-last-frame] frame with a newly allocated stream identifier. Sending a control stream frame with a newly allocated stream identifier is a protocol error.

The peer accepts a new stream when it receives a [Stream][stream-frame] or [StreamLast][stream-last-frame] frame with a stream identifier larger than the
the last accepted stream identifier.

The stream identifier must be the next expected stream identifier. For example, if the last accepted client-side bidirectional stream identifier is 0, the next stream identifier should be 4.

## Stream closure

Each side of a stream maintains a reads and writes closed state. When the application is done sending data on a stream, it closes writes on the stream. When it's done reading data, it closes reads.

The update of the closed state triggers the sending of a stream control frame to the peer:
- If reads are closed, a [StreamReadsClosed][stream-reads-closed-frame] frame is sent. Upon receiving this frame, the peer should stop sending data over the stream and close the stream writes.
- If writes are closed, a [StreamWritesClosed][stream-writes-closed-frame] frame is sent. Upon receiving this frame, the peer should stop reading data from the stream and close the stream reads.

A stream is considered closed when both writes and reads are closed.

## Sending and receiving data over a stream

The [Stream][stream-frame] and [StreamLast][stream-last-frame] frames cary a sequence of bytes provided by the
application. Multiple [Stream][stream-frame] frames can be sent over the Slic connection for a specific stream. They
will be received in order by the peer. The [StreamLast][stream-last-frame] frame is used to cary the last sequence of
bytes delivered to the peer. Upon receiving this frame, the peer can assume that no more data will be sent for this
stream.

Sending a [Stream][stream-frame] frame after a [StreamLast][stream-last-frame] frame or multiple
[StreamLast][stream-last-frame] frames for the same stream is considered a protocol error.

[Head-of-line blocking][hol] very much depends on the size of a [Stream][stream-frame] or
[StreamLast][stream-last-frame] frame. A large stream frame will cause more head-of-line blocking that smaller stream
frames. The [PacketMaxSize][connection-parameters] parameter exchanged on connection limits the maximum size of a
[Stream][stream-frame] or [StreamLast][stream-last-frame] frame. If the application data is larger than this parameter
value, the data will be sent in chunks with multiple [Stream][stream-frame] frames.

[rfc9000]: https://www.rfc-editor.org/rfc/rfc9000.html#name-stream-types-and-identifier
[hol]: https://en.wikipedia.org/wiki/Head-of-line_blocking
[connection-parameters]: connection-establishment#connection-establishment-parameters
[stream-frame]: protocol-frames#stream-and-streamlast-frames
[stream-last-frame]: protocol-frames#stream-and-streamlast-frames
[stream-reads-closed-frame]: protocol-frames#streamreadsclosed-and-streamwritesclosed-frames
[stream-writes-closed-frame]: protocol-frames#streamreadsclosed-and-streamwritesclosed-frames
[stream-window-update-frame]: protocol-frames#streamwindowupdate-frame
