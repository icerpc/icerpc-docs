---
title: Getting started
show_toc: false
---

Remote procedure call (RPC) is a fundamental paradigm for networked applications: a client sends a request to a server
over a network connection, the server processes this request and sends back a response to the client over the same
connection.

![RPC-diagram](diagrams/rpc.svg)

HTTP methods (GET, POST, PUT...) are all RPCs. A DNS resolution is a RPC. RPCs are literally everywhere!

An RPC framework like IceRPC helps you apply this paradigm to your own networked applications without reinventing the
wheel.

{% grid columns=4 %}

{% mini-card
   title="A modular RPC framework built for QUIC"
   description="See what sets IceRPC apart"
   href="/getting-started/raising-the-bar/modular-rpc-for-quic" /%}
{% mini-card
   title="A better IDL"
   description="Learn how to describe your RPCs with Slice"
   href="/getting-started/raising-the-bar/slice-better-idl" /%}
{% mini-card
   title="Tutorial"
   description="Write your first IceRPC application in C#"
   href="/getting-started/icerpc-csharp/tutorial" /%}
{% mini-card
   title="How-to"
   description="Add IceRPC to an existing C# project"
   icon="terminal"
   href="/getting-started/icerpc-csharp/how-to" /%}
{% mini-card
   title="Examples"
   description="See IceRPC for C# in action"
   icon="terminal"
   href="https://github.com/zeroc-ice/icerpc-csharp/tree/main/examples/README.md" /%}
{% /grid %}
