---
title: Flow control
description: Understand how flow control works with Slic
---

## Connection data flow control

Slic doesn't implement connection level flow control. Instead, it solely relies on the duplex transport for applying
back pressure on the sender if the receiver can't process the incoming data fast enough. It's therefore important that
the underlying duplex transport supports flow control.

## Stream data flow control

If Slic doesn't provide connection level flow control, it provides stream level flow control. The sending of data on a
stream should block if the peer can't read fast enough this data. Slic stream flow control is similar to [HTTP/2 stream
flow control][http-stream-flow-control].

The flow control window defines the amount of data the receiver is willing to accept. A sender must stop sending data
over the stream once the window is full. Sending more data is a protocol error. To allow the sender to resume the
sending, the receiver sends a [StreamWindowUpdate][stream-window-update] frame that carries the amount of additional data it's willing to accept.

The initial window size is specified by the [InitialStreamWindowSize][connection-parameters] parameter exchanged on connection establishment.

The [StreamWindowUpdate][stream-window-update] frame provides enough flexibility to implement different strategies to
adjust the window size after stream creation. A common strategy is to implement dynamic window scaling where the window
size is computed using the round-trip time (RTT) of a [Ping][ping] frame. Such a strategy can improve throughput. A more
basic strategy is to use a fixed window size and send a [StreamWindowUpdate][stream-window-update] frame when a size
threshold is reached.

## Stream count flow control

Each side of the connection defines how many streams it's willing to accept with the
[MaxBidirectionalStreams][connection-parameters] and [MaxUnidirectionalStreams][connection-parameters] parameters
transmitted on connection establishment. Stream creation will block if this limit is reached. For example, if the peer
[MaxBidirectionalStreams][connection-parameters] parameter is 5 and 5 streams are opened, the creation of the next
bidirectional stream should block until one of stream is closed. Opening an additional stream if the limit is reached is
a protocol error.

[http-stream-flow-control]: https://datatracker.ietf.org/doc/html/rfc7540#page-22
[connection-parameters]: connection-establishment#connection-establishment-parameters
[ping]: protocol-frames#ping
[stream-window-update]: protocol-frames#streamwindowupdate-frame
