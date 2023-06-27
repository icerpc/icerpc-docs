---
title: IceRPC Core
description: Sending and receiving requests and responses without an IDL
showToc: false
---

## Learn the basics

Each section of documentation covers a different component of the IceRPC core and how to use it.

{% grid %}

{% mini-card
   title="Connection"
   description="Learn how to create and accept connections in IceRPC."
   href="/icerpc-core/connection/client-vs-server-connections" /%}

{% mini-card
   title="Protocol"
   description="Learn about the icerpc protocol and multiplexing."
   href="/icerpc-core/protocols-and-transports/icerpc-multiplexed-transports" /%}

{% mini-card
   title="Service Address"
   description="Understand the service address concept and syntax."
   href="/icerpc-core/invocation/service-address" /%}

{% mini-card
   title="Invocation"
   description="Understand how to send requests and receive responses."
   href="/icerpc-core/invocation/invocation-pipeline" /%}

{% mini-card
   title="Dispatch"
   description="Understand how to accept requests and return responses."
   href="/icerpc-core/dispatch/dispatch-pipeline" /%}

{% mini-card
   title="Routing"
   description="Learn how to route incoming requests based on their path."
   href="/icerpc-core/dispatch/router" /%}

{% /grid %}

## Advanced topics

The advanced topics section describes several topics that may be of interest to some users.

These topics are not required to use IceRPC, but may be useful for debugging or understanding how IceRPC works.

Some questions you may have that are answered in this section are:

- [How does the `icerpc` protocol multiplex requests and responses over a single connection?](/icerpc-core/icerpc-protocol/mapping-rpcs-to-streams)
- What is the [connection establishment](/icerpc-core/icerpc-protocol/connection-establishment) and [connection shutdown](/icerpc-core/icerpc-protocol/connection-shutdown) process for the `icerpc` protocol?
- What is the [connection establishment](/icerpc-core/ice-protocol/connection-establishment) and [connection shutdown](icerpc-core/ice-protocol/connection-shutdown) process for the `ice` protocol?
