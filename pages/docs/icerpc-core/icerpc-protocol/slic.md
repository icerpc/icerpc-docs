---
title: Slic
description: Learn how to use icerpc with tcp and other duplex transports.
---

{% title /%}

## Multiplexed transport abstraction

icerpc does not necessarily use QUIC directly as a we presented earlier. Instead, it can use QUIC via a QUIC-like
multiplexed transport abstraction.

A multiplexed transport provides streams, stream IDs, flow control, security and more, just like QUIC does. And it's
naturally easy to implement this multiplexed transport abstraction using QUIC.

Diagram: icerpc + multiplexed abstraction + thin implementation + QUIC

Introducing this abstraction allows us to bring icerpc to more transports: tcp, bluetooth, Apple's iAP and more.

A tcp connection is a plain duplex connection with exactly 2 streams of bytes, one in each direction. tcp is definitely
not a QUIC-like multiplexed transport.

The solution is Slic, an adapter that implements multiplexing (streams and more) over a duplex connection.

Diagram: icerpc + multiplexed transport abstraction + Slic + duplex transport abstraction + tcp
