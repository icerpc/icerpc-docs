---
title: Home
description: IceRPC documentation
showReadingTime: false
showAside: false
showDividers: false
---

{% homeTitle title="Welcome" /%}

Welcome to the IceRPC documentation! You will find on this site a wide range of materials, including installation
instructions, tutorials, programming guides, and more.

Want to make RPCs without reinventing the wheel? Want to take advantage of QUIC through a convenient, modern API? You've
come to the right place.

IceRPC is currently available for C# / .NET. We plan on adding support for more languages soon, starting with Rust.

{% divider /%}

{% homeTitle title="Key features" description="Discover IceRPC" /%}

Jump directly to the documentation of these distinctive features:

| Feature                | Description                                                                                  |
|------------------------|----------------------------------------------------------------------------------------------|
| [Invocation pipeline]  | Customize your client-side processing by composing interceptors into an invocation pipeline. |
| [Dispatch pipeline]    | Compose middleware and services into your own custom server-side dispatch pipeline.          |
| [Path-based routing]   | Learn how to route a request to the right service based on the request's path.               |
| [Slice]                | A modern IDL and serialization format developed in tandem with IceRPC.                       |
| [Dependency injection] | Learn how to use IceRPC with a DI container.                                                 |
| [Security with TLS]    | Learn how to secure your communications with TLS.                                            |

{% divider /%}

{% homeTitle title="IceRPC by example" description="See IceRPC in action" /%}

{% examples /%}

{% divider /%}

{% homeTitle title="Explore the docs" description="Let's go!" /%}

{% explore /%}

{% divider /%}

{% homeTitle title="License" /%}

{% license /%}

[Dependency injection]: /icerpc/dependency-injection/di-and-icerpc-for-csharp
[Dispatch pipeline]: /icerpc/dispatch/dispatch-pipeline
[Invocation pipeline]: /icerpc/invocation/invocation-pipeline
[Path-based routing]: /icerpc/dispatch/router
[Slice]: /slice
[Security with TLS]: /icerpc/connection/security-with-tls
