---
title: icerpc vs http3
description: Understand how the icerpc protocol compares to http3.
---

{% title /%}

When you create a client connection to server address `icerpc://hello.zeroc.com`, you instruct IceRPC to use the icerpc
protocol. Let's have a closer look at what it means to use this protocol.

{% callout type="information" %}
We always spell icerpc in lowercase when we talk about the icerpc protocol. This avoids confusion with the IceRPC
framework.
{% /callout %}

## An http3 sibling

The latest version of http, http3 ([RFC9114](https://www.rfc-editor.org/rfc/rfc9114.html)), is built over QUIC
([RFC9000](https://www.rfc-editor.org/rfc/rfc9000.html)), a new multiplexed transport that uses UDP.

icerpc is a sibling of http3: a protocol in the application layer built over QUIC. While http3's focus is the web,
icerpc's focus is RPCs, and this narrow focus makes icerpc much simpler than http3.

Diagram: http3 icerpc siblings over quic and udp

## Multiplexed transport abstraction

icerpc is actually not built directly over QUIC but over a "multiplexed transport", where this multiplexed transport is
an abstraction of a QUIC-like transport.

A multiplexed transport provides streams, stream IDs, flow control, security and more, just like QUIC does. And it's
naturally easy to implement this multiplexed transport abstraction using QUIC.

Diagram: icerpc + multiplexed abstraction + thin implementation + QUIC

QUIC is still a very new transport and you may want to use icerpc with another transport - typically tcp. But tcp is
not multiplexed: it's a classic duplex transport, without streams. The solution is Slic, an adapter that implements the
multiplexed transport abstraction over any duplex transport. See LINK Slic.

Diagram: icerpc + multiplexed transport abstraction + Slic + duplex transport abstraction + tcp

## IceRPC's preferred protocol

icerpc is naturally IceRPC's preferred protocol.

icerpc provides the most direct realization of IceRPC's APIs. For example, an IceRPC response has a status code that
indicates whether the response corresponds to a successful RPC (status code Success) or a failure (status code greater
than Success). The very same status code is encoded in the header of icerpc responses.
