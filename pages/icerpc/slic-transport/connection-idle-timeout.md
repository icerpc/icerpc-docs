---
title: Connection idle timeout
description: Understand connection idle timeout.
---

## Idle Timeout

The transport implementation considers the connection lost if it doesn't receive data within the period defined by the
idle timeout. The idle timeout is specified with the [IdleTimeout][connection-parameters] parameter. Each side of the
connection advertises its idle timeout and the minimum value is used for the connection.

## Keeping a connection alive

To prevent the idle timeout from being triggered, the client or server can send a [PING][ping] frame. When the peer
receives this PING frame, it resets its idle timeout timer and send back a [PONG][pong] frame. The reception of the
PONG frame will in turn reset the idle timeout timer of the receiver.

It's up to the transport implementation to decide if and when PING frames are sent.

A PING frame carries an opaque payload. This payload is sent back with the PONG frame. Multiple PING frames can be sent
concurrently.

{% callout %}

The PING frame can be used for different purposes. For example, it can be used to keep alive a connection or to measure
the round-trip time (RTT). The opaque payload allows to identify the different PING frames.

{% /callout %}

[connection-parameters]: connection-establishment#connection-establishment-parameters
[ping]: protocol-frames#ping-frame
[pong]: protocol-frames#pong-frame
