---
title: Overview
description: Everything except Slice
---

## Introduction

At its core, IceRPC is a framework of modular components that can be used to design networked applications. It does not prescribe a specific architecture or design pattern, but rather provides the building blocks to create your own.

The key components required to perform an RPC are:

- __Connection__ — The medium over which RPCs are transmitted, e.g. [QUIC](https://en.wikipedia.org/wiki/QUIC), TCP, etc.
- __Protocol__ — An [application layer protocol](https://en.wikipedia.org/wiki/Application_layer) that transmits RPCs over a connection.
- __Invocation__ — The process of sending a request and receiving the corresponding response.
- __Dispatch__ — The process of accepting a request and returning a response.
- __Payload__ — The data that is transmitted as part of an RPC request or response.

The specific encoding of the RPC payload is not specified by the protocol, but rather is left to the application. IceRPC does provide an IDL, [Slice](/docs/slice), that can be used describe the structure of data in your application and the operations that can be performed on it.

## Learn the basics

Each section of documentation covers a different component of the IceRPC core and how to use it.

{% grid %}

{% card
   title="Connection"
   description="Learn how to create and accept connections in IceRPC."
   icon="question"
   link="/docs/icerpc-core/connection/client-vs-server-connections" /%}

{% card
   title="Protocol"
   description="Learn about the icerpc protocol and multiplexing."
   icon="question"
   link="/docs/icerpc-core/protocols-and-transports/icerpc-multiplexed-transports" /%}

{% card
   title="Service Address"
   description="Understand the service address concept and syntax."
   icon="question"
   link="/docs/icerpc-core/invocation/service-address" /%}

{% card
   title="Invocation"
   description="Understand how to send requests and receive responses."
   icon="question"
   link="/docs/icerpc-core/invocation/invocation-pipeline" /%}

{% card
   title="Dispatch"
   description="Understand how to accept requests and return responses."
   icon="question"
   link="/docs/icerpc-core/dispatch/dispatch-pipeline" /%}

{% card
   title="Routing"
   description="Learn how to route incoming requests based on their path."
   icon="question"
   link="/docs/icerpc-core/dispatch/router" /%}

{% /grid %}

## Advanced Topics

The advanced topics section describes several topics that may be of interest to some users.

These topics are not required to use IceRPC, but may be useful for debugging or understanding how IceRPC works.

Some questions you may have that are answered in this section are:

- [How does the `icerpc` protocol multiplex requests and responses over a single connection?](/docs/icerpc-core/icerpc-protocol/mapping-rpcs-to-streams)
- What is the [connection establishment](/docs/icerpc-core/icerpc-protocol/connection-establishment) and [connection shutdown](/docs/icerpc-core/icerpc-protocol/connection-shutdown) process for the `icerpc` protocol?
- What is the [connection establishment](/docs/icerpc-core/ice-protocol/connection-establishment) and [connection shutdown](docs/icerpc-core/ice-protocol/connection-shutdown) process for the `ice` protocol?
