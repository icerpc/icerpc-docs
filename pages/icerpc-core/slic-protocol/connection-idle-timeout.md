---
title: Connection idle timeout
description: Understand connection idle timeout
---

## Idle Timeout

A connection should be aborted if it doesn't receive data within the period defined by the idle timeout. The idle
timeout is specified with the [IdleTimeout][connection-parameters] parameter. Each side of the connection advertises its
idle timeout and the minimum value is used  for the connection.

## Keeping a connection alive

To prevent a connection to be aborted by the idle timeout, the idle timeout can be deferred by sending a [PING][ping]
frame. When the peer receives this [PING][ping] frame, it should reset its idle timeout timer and send back a [PONG][pong] frame. The reception of the [PONG][pong] frame should in turn reset the idle timeout timer of the receiver.

It's up to the Slic transport implementation to decide if and when [PING][ping] frames are sent.

A [PING][ping] frame carries an opaque payload. This payload is sent back with the [PONG][pong] frame. Multiple
[PING][ping] frames can be sent concurrently as long as they include a different payload. Sending multiple [PING][ping]
frames with the same opaque payload is a protocol error.

{% callout %}

The [PING][ping] frame can be used for different purposes. It can also be used to measure the round-trip time (RTT)
instead. The opaque payload allows to identify the different [PING][ping] frames.

{% /callout %}

[connection-parameters]: connection-establishment#connection-establishment-parameters
[ping]: protocol-frames#ping-frame
[pong]: protocol-frames#pong-frame
