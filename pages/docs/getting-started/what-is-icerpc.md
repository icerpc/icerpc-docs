---
title: What is IceRPC?
description: Learn about IceRPC, the RPC protocol.
breadcrumbs:
  - name: Overview
    href: /docs/getting-started
---

{% title /%}

IceRPC is a protocol for remote procedure calls. It is a binary protocol that uses a compact representation for data
types and operations. It is designed to be efficient and to minimize the amount of data that needs to be transferred
over the network.

The design philosophy of IceRPC is built ontop of the following vision:

- multi-transport, multi-language, multi-platform
- easy to use generated typed API
- elegant modern API
- fast binary encoding
- lean protocol on top of TCP, QUIC, Bluetooth and more, with support for streaming and firewall traversal
