---
title: The Slic multiplexed transport
---

Slic is a [multiplexed transport][multiplexed-transport] that emulates [QUIC] while relying on a traditional duplex
transport (such as TCP) for data transmission.

Like QUIC, Slic provides independent streams and flow control, and helps monitor the connection's health.

This chapter documents version 1 of the Slic multiplexed transport.

## QUIC vs Slic

Because Slic relies on a duplex transport—just like HTTP/2 relies on TCP—it can be affected by
[head-of-line blocking][hol] (HOL). The streams within a connection are not truly independent: the retransmission of an
IP packet in a TCP connection affects all the streams, not just one stream.

There is no such issue with QUIC connections, so when HOL is a concern, prefer QUIC over Slic.

Unlike QUIC, Slic doesn't require the use of TLS.

## Slic's underlying transport

Slic can convert any [duplex transport][duplex-transport] into a multiplexed transport. You would typically use Slic
with the TCP duplex transport, but you are not limited to TCP. For instance, in C#, you can use Slic with the Coloc
duplex transport too.

The name of the new multiplexed transport created with Slic is typically the name of the underlying duplex transport.
For example, Slic over TCP is the "tcp" multiplexed transport.

[hol]: https://en.wikipedia.org/wiki/Head-of-line_blocking
[QUIC]: https://datatracker.ietf.org/doc/rfc9000
[duplex-transport]: duplex-transport
[multiplexed-transport]: multiplexed-transport
