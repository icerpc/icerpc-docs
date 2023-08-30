---
title: Getting started
description: Welcome to the IceRPC Documentation
showReadingTime: false
showAside: false
showDividers: false
---

{% homeTitle title="What is IceRPC" description="Understanding the framework" /%}

Remote Procedure Call (RPC) is a fundamental paradigm for networked
applications: a client sends a request to a server over a network connection,
the server processes this request and then sends back a response to the client
over the same connection.

An RPC framework like IceRPC helps you apply this paradigm to your own networked
applications without reinventing the wheel.

{% divider /%}

{% homeTitle title="Try an Example" description="Get started in minutes" /%}

{% examples /%}

{% divider /%}

{% homeTitle title="Main Features" description="What it offers" /%}

Some of IceRPC's main features include:

| Feature                | Description                                                                                  |
|------------------------|----------------------------------------------------------------------------------------------|
| [Invocation pipeline]  | Enhanced client-side request processing with a composable invocation pipeline.               |
| [Dispatch pipeline]    | Enhanced server-side request processing with a composable dispatch pipeline.                 |
| [Routing]              | A router with support for nested routers that allows direct requests to the target services. |
| [Dependency injection] | Designed to be both DI-friendly and DI-container agnostic.                                   |
| [QUIC]                 | Leverage QUIC's benefits with IceRPC's QUIC multiplexed transport.                           |
| [Slice]                | Best-in-class IDL for defining your network API.                                             |

{% divider /%}

{% homeTitle title="Explore the Docs" description="Ready to jump in?" /%}

{% explore /%}

[Dependency injection]: /icerpc/dependency-injection/di-and-icerpc-for-csharp
[Dispatch pipeline]: /icerpc/dispatch/dispatch-pipeline
[Invocation pipeline]: /icerpc/invocation/invocation-pipeline
[QUIC]: /icerpc/multiplexed-transport
[Routing]: /icerpc/dispatch/router
[Slice]: /slice
