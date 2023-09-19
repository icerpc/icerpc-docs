---
title: Connection idle timeout
description: Understand connection idle timeout.
---

## Idle Timeout

The transport implementation considers the connection lost if it doesn't receive any data within the period defined by
idle timeout. The idle timeout is specified with the [IdleTimeout][connection-parameters] parameter. Each side of the
connection advertises its idle timeout and the minimum value is used for the connection.

{% callout %}
The default idle timeout is 30 seconds.
{% /callout %}

## Keeping a connection alive

Slic is responsible to keep a connection from becoming idle when the application doesn't write anything to this
connection.

{% callout %}
TODO: this behavior should be configurable and controlled by the upper protocol (e.g., `icerpc`). Currently, it isn't.

See also [InactivityTimeout].
{% /callout %}

Slic ensures a connection does not become idle by sending [Ping] frames. A Slic client sends `Ping` frame to the
server; a Slic server never sends `Ping` frames to its client.

A Slic client sends a `Ping` frame (idle timeout / 2) after connection establishment and (idle timeout / 2) after any
write to that connection. The sending of a `Ping` frame is itself a write that schedules the sending of a new `Ping`
frame; this next `Ping` is deferred when the caller (upper protocol) on the client-side performs a write operation on
the connection.

When the server receives a `Ping` frame, it resets its idle watchdog-timer and sends back a [Pong] frame. The reception
of the `Pong` frame in turn resets the idle watchdog-timer of the client.

[connection-parameters]: connection-establishment#connection-establishment-parameters
[Ping]: protocol-frames#ping-frame
[Pong]: protocol-frames#pong-frame
[InactivityTimeout]: https://docs.icerpc.dev/api/csharp/api/IceRpc.ConnectionOptions.html#IceRpc_ConnectionOptions_InactivityTimeout
