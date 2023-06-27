---
title: Overview
description: The Slic multiplexed stream protocol
show_toc: false
---

## The Slic multiplexed transport adapter

Slic is a multiplexed stream protocol designed to provide the same functionality as Quic. Instead of relying on UDP, it
relies on a connection oriented full-duplex transport (such as TCP) for the data transmission.

Like Quic, Slic implements the IceRPC [multiplexed transport](../protocols-and-transports/icerpc-multiplexed-transports)
abstraction. It relies on a duplex transport for the data transmission. So while it is typically used with the TCP
 transport, it can be used with any other implementation of the [duplex transport](../protocols-and-transports/ice-duplex-transports) abstraction (such as the Coloc transport).

## Quic vs Slic

Because it relies on a full-duplex transport, it is subject to [head-of-line blocking](https://en.wikipedia.org/wiki/Head-of-line_blocking). Quic doesn't have this problem so the use of Quic should always be privileged in deployments where it is supported.

Unlike Quic, Slic doesn't require the use of TLS.
