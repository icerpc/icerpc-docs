---
title: Flow control
description: Understand how flow control works with Slic.
---

## Connection data flow control

Slic doesn't implement connection level flow control. Instead, it solely relies on the duplex transport for applying
back pressure on the sender if the receiver can't process the incoming data fast enough. Therefore, the underlying
duplex transport must support flow control.

## Stream data flow control

Slic does provide stream level flow control.  The sending of data on a stream must block if the peer can't read fast
enough this data. Slic stream flow control is similar to [HTTP/2 stream flow control][http-stream-flow-control].

A flow control window defines the amount of data the receiver is willing to accept. A sender must stop sending data over
the stream once the window is full. Sending more data is a protocol error. The sender can resume sending data only after
receiving a [StreamWindowUpdate][stream-window-update] frame.

The StreamWindowUpdate frame carries the amount of additional data the receiver is willing to accept. It can be sent
anytime to increase the stream window size.

The initial window size is specified by the [InitialStreamWindowSize][connection-parameters] parameter exchanged on connection establishment.

The StreamWindowUpdate frame provides enough flexibility to implement different strategies to adjust the window size
after stream creation. A common strategy is to implement dynamic window scaling where the window size is computed using
the round-trip time (RTT) of a [Ping][ping] frame. Such a strategy can improve throughput. A more basic strategy is to
use a fixed window size and send a StreamWindowUpdate frame when a size threshold is reached.

## Stream count flow control

Each side of the connection defines how many streams it's willing to accept with the
[MaxBidirectionalStreams][connection-parameters] and [MaxUnidirectionalStreams][connection-parameters] parameters
transmitted on connection establishment. Stream creation must block if this limit is reached. For example, if the peer
MaxBidirectionalStreams parameter is 5 and 5 streams are opened, the creation of the next bidirectional stream must
block until one of the stream is closed. Opening an additional stream when the limit is reached is a protocol error.

[http-stream-flow-control]: https://datatracker.ietf.org/doc/html/rfc7540#page-22
[connection-parameters]: connection-establishment#connection-establishment-parameters
[ping]: protocol-frames#ping
[stream-window-update]: protocol-frames#streamwindowupdate-frame
