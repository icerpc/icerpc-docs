---
title: Connection idle timeout
description: Understand connection idle timeout.
---

## Idle timeout

The transport implementation considers the connection lost if it doesn't receive any data within the period defined by
the idle timeout. The idle timeout is specified with the [IdleTimeout][connection-parameters] parameter. Each side of
the connection advertises its idle timeout and agree to use the minimum value during connection establishment.

{% callout %}
The default idle timeout is 30 seconds.
{% /callout %}

Each side of a connection maintains an idle timer that it restarts when it receives data. If this idle timer ever
expires, the expired side of the connection considers the connection dead and disposes of this connection immediately.

This idle timeout is comparable (but not identical) to QUIC's [idle timeout][QUIC idle timeout].

## Keeping a connection alive

Slic is responsible for preventing the connection's idle timers from expiring when the application (the upper protocol)
doesn't write anything to this connection.

Slic keeps connections alive by sending [Ping] frames. A Slic client connection sends `Ping` frames to the server; a
Slic server connection never sends `Ping` frames to the client. When the server receives a `Ping` frame, it restarts its
idle timer and sends back a [Pong] frame. The reception of the `Pong` frame in turn restarts the idle timer of the
client.

[connection-parameters]: connection-establishment#connection-establishment-parameters
[Ping]: protocol-frames#ping-frame
[Pong]: protocol-frames#pong-frame
[QUIC idle timeout]: https://www.rfc-editor.org/rfc/rfc9000.html#name-idle-timeout
