---
title: The Slic multiplexed transport
show_toc: false
---

Slic is a multiplexed transport designed to provide the same functionality as [QUIC][quic]. Instead of relying on UDP,
it relies on a duplex transport (such as TCP) for the data transmission.

## QUIC vs Slic

Because Slic relies on a duplex transport, it is subject to [head-of-line blocking][hol]. QUIC doesn't have this problem
so the use of the QUIC transport should always be privileged in deployments where it is supported.

Unlike QUIC, Slic doesn't require the use of TLS.

## IceRPC's Slic implementation

Slic provides a multiplexing adapter that converts any [duplex transport][duplex-transport] into a [multiplexed
transport][multiplexed-transport]. While it is typically used with the TCP duplex transport implementation, it can be
used with any other implementation (such as the Coloc duplex transport).

[hol]: https://en.wikipedia.org/wiki/Head-of-line_blocking
[quic]: https://datatracker.ietf.org/doc/rfc9000
[duplex-transport]: ../protocols-and-transports/ice-duplex-transports
[multiplexed-transport]: ../protocols-and-transports/icerpc-multiplexed-transports
