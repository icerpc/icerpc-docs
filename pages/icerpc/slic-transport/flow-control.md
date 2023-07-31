---
title: Flow control
description: Understand how flow control works with Slic.
---

## Connection-level flow control

Slic doesn't implement flow control at the connection level. It relies instead on the flow control provided by the
underlying duplex connection: the duplex connection must apply back pressure on the sender if the receiver cannot
consume incoming data fast enough.

## Stream-level flow control

Slic provides stream-level flow control. The sending of data on a stream is paused when the peer doesn't consume data
fast enough from this stream.

Slic's stream-level flow control is similar to the stream flow control provided by [HTTP/2][http-stream-flow-control]. A
flow control window defines the amount of data the receiving-side of a stream is willing to accept. A sender must stop
sending data over the stream once the window is full. Sending more data is a protocol error. The sender can resume
sending data only after receiving a [StreamWindowUpdate][stream-window-update] frame.

The `StreamWindowUpdate` frame carries the amount of additional data the receiver is willing to accept. The receiver can
send this frame at anytime to increase the stream window size in the sender.

The initial window size is specified by the [InitialStreamWindowSize][connection-parameters] parameter exchanged on
connection establishment.

The `StreamWindowUpdate` frame provides enough flexibility to implement different strategies to adjust the window size
after stream creation. A common strategy is to implement dynamic window scaling where the window size is computed using
the round-trip time (RTT) of a [Ping][ping] frame. Such a strategy can improve throughput. A more basic strategy is to
use a fixed window size and send a `StreamWindowUpdate` frame when a size threshold is reached.

## Stream concurrency

Each side of the connection defines how many streams it's willing to accept with the
[MaxBidirectionalStreams][connection-parameters] and [MaxUnidirectionalStreams][connection-parameters] parameters
transmitted during connection establishment. `Stream` creation is paused when this limit is reached. For example, if the
peer's `MaxBidirectionalStreams` parameter is 5 and 5 bidirectional streams are opened, the creation of the next
bidirectional stream is delayed until one of the stream is closed. Opening an additional stream when the limit is
reached is a protocol error.

[http-stream-flow-control]: https://datatracker.ietf.org/doc/html/rfc7540#page-22
[connection-parameters]: connection-establishment#connection-establishment-parameters
[ping]: protocol-frames#ping
[stream-window-update]: protocol-frames#streamwindowupdate-frame
