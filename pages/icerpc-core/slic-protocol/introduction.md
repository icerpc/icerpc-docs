---
title: Introduction
description: The Slic multiplexed stream protocol
show_toc: false
---

## The Slic protocol

Slic is a multiplexed stream protocol designed to provide the same functionality as [QUIC][quic]. Instead of relying on
UDP, it relies on a connection oriented full-duplex transport (such as TCP) for the data transmission.

Like [QUIC][quic], Slic implements the IceRPC [multiplexed transport][multiplexed-transport] abstraction. It relies on a
duplex transport for the data transmission. So while it is typically used with the TCP transport, it can be used with
 any other implementation of the [duplex transport][duplex-transport] abstraction (such as the Coloc transport).

## QUIC vs Slic

Because Slic relies on a full-duplex transport, it is subject to [head-of-line blocking][hol]. [QUIC][quic] doesn't have
this problem so the use of [QUIC][quic] should always be privileged in deployments where it is supported.

Unlike [QUIC][quic] Slic doesn't require the use of TLS.

## Terminology

The following terms are used throughout the Slic documentation:
- Client: the initiator of the connection.
- Server: the acceptor of the connection.
- Application: the component that uses Slic. For IceRPC, it's the icerpc protocol implementation through the
  multiplexed transport abstraction.

[hol]: https://en.wikipedia.org/wiki/Head-of-line_blocking
[quic]: https://datatracker.ietf.org/doc/rfc9000
[duplex-transport]: ../protocols-and-transports/ice-duplex-transports
[multiplexed-transport]: ../protocols-and-transports/icerpc-multiplexed-transports
