---
title: Getting started
showAside: false
showReadingTime: false
---

Remote procedure call (RPC) is a fundamental paradigm for networked applications: a client sends a request to a server
over a network connection, the server processes this request and then sends back a response to the client over the same
connection.

{% light-mode %}
![RPC diagram (light mode)](diagrams/rpc-light.svg)
{% /light-mode %}

{% dark-mode %}
![RPC diagram (dark mode)](diagrams/rpc-dark.svg)
{% /dark-mode %}

An RPC framework like IceRPC helps you apply this paradigm to your own networked applications without reinventing the
wheel.

{% grid columns=3 %}

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
