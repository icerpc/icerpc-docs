---
title: Getting started
description: Welcome to the IceRPC Documentation
showReadingTime: false
showAside: false
showDividers: false
---

{% homeTitle title="What is IceRPC" description="Next-Gen RPC" /%}

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

{% homeTitle title="Main Features" description="Everything you expected" /%}

Some of IceRPC's main features include:

| Feature                                                   | Description                                                                                                                                                                        |
| --------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Security with TLS](/icerpc/connection/security-with-tls) | Establish and enhance secure communication channels using advanced TLS protocols.                                                                                                  |
| [Middleware](/icerpc/dispatch/middleware)                 | Integrate custom code seamlessly into the dispatching process, executing it before the request reaches completion.                                                                 |
| [Router](/icerpc/dispatch/router)                         | Direct requests to appropriate dispatchers via a router, with middleware integration in the routing flow.                                                                          |
| [Slice](/slice)                                           | Employ Slice as IceRPC's IDL for effortless serialization. Instead of manual byte stream handling, define structures and let Slice's compiler manage efficient binary conversions. |

{% divider /%}

{% homeTitle title="Explore the Docs" description="Ready to jump in?" /%}

{% explore /%}
