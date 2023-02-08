---
title: What is IceRPC?
description: Learn about IceRPC, the RPC protocol.
breadcrumbs:
  - name: Overview
    href: /docs/getting-started
---

{% title /%}

{% callout type="critical" %}

TODO: This page contains placeholder content and needs to be replaced. Please remove this when you are done.

{% /callout %}

In this section, you'll get a brief introduction to the components of the IceRPC framework. Additional information
about each component will be explored in greater detail in the respective documentation sections.

## The icerpc Protocol and Slic Transport

The icerpc protocol is a lightweight application protocol that was designed from the ground up to act as a thin layer
on top of an underlying [multiplexed](https://en.wikipedia.org/wiki/Multiplexing) transport, with the prototypical
multiplexed transport being [QUIC](https://en.wikipedia.org/wiki/QUIC).

As a result of this design, IceRPC is a straightforward protocol that is unobtrusive and easy to understand. No framing
is required for sending requests and responses. A detailed description of the IceRPC protocol is available in the
[IceRPC Protocol Specification](/docs/ice-rpc-protocol-specification).

The Slic transport is a multiplexed transport designed to be used with the icerpc protocol. It is a simple
transport that acts as a pseudo "QUIC over TCP" for environments where the QUIC transport is unavailable.
A detailed description of the Slic transport is available in the
[Slic Transport Specification](/docs/slic-transport-specification).

## The Slice Language

```slice

module Foo;

interface Bar
{
  // This is a comment
  baz(a: int32?) -> string;
};

struct bar
{
  /* This is a comment */
  baz: int32;
};

```

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum mauris. Maecenas
congue ligula ac quam viverra nec consectetur ante hendrerit. Donec et mollis dolor. Praesent et diam eget libero
eget laoreet sit amet nec augue.

## The IceRPC Core

The IceRPC runtime is a flexible remote procedure call runtime built to leverage the IceRPC Protocol and the powerful
code generation capabilities of the Slice language. The IceRPC runtime is designed to be used in a variety of
environments, including embedded systems, mobile devices, and desktop applications.

## The Slice Encoding

## Combing the Pieces

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum mauris. Maecenas
congue ligula ac quam viverra nec consectetur ante hendrerit. Donec et mollis dolor. Praesent et diam eget libero.

```mermaid
stateDiagram-v2
    [*] --> s1
    s1 --> [*]

```
