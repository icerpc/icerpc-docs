---
title: Connection idle timeout
description: Understand connection idle timeout.
---

## Idle Timeout

The transport implementation must consider the connection lost if it doesn't receive data within the period defined by
the idle timeout. The idle timeout is specified with the [IdleTimeout][connection-parameters] parameter. Each side of
the connection advertises its idle timeout and the minimum value is used for the connection.

## Keeping a connection alive

To prevent the idle timeout from being triggered, the client or server can send a [Ping][ping] frame. When the peer
receives this `Ping` frame, it must reset its idle timeout timer and send back a [Pong][pong] frame. The reception of
the `Pong` frame must in turn reset the idle timeout timer of the receiver.

It's up to the transport implementation to decide if and when `Ping` frames are sent.

A `Ping` frame carries an opaque payload. This payload is sent back with the `Pong` frame. Multiple `Ping` frames can be
sent concurrently.

{% callout %}

The `Ping` frame can be used for different purposes. For example, it can be used to keep alive a connection or to
measure the round-trip time (RTT). The opaque payload allows to identify the different `Ping` frames.

{% /callout %}

[connection-parameters]: connection-establishment#connection-establishment-parameters
[ping]: protocol-frames#ping-frame
[pong]: protocol-frames#pong-frame
