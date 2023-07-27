---
title: IceRPC
description: A modular RPC framework built for QUIC
showAside: false
---

IceRPC provides everything you need to send and receive requests and responses over network connections. These requests
and responses carry byte streams—if you want a typed API, use [Slice][slice] or another [IDL] together with IceRPC.

{% grid %}

{% mini-card
   title="How to create a connection"
   description="Learn how to create and accept connections with IceRPC."
   href="/icerpc/connection/how-to-create-a-connection" /%}

{% mini-card
   title="Invocation"
   description="Learn how to send requests and receive responses."
   href="/icerpc/invocation/invocation-pipeline" /%}

{% mini-card
   title="Dispatch"
   description="Learn how to accept requests and return responses."
   href="/icerpc/dispatch/dispatch-pipeline" /%}

{% mini-card
   title="Server address"
   description="Understand the server address concept and syntax."
   href="/icerpc/connection/server-address" /%}

{% mini-card
   title="Service address"
   description="Understand the service address concept and syntax."
   href="/icerpc/invocation/service-address" /%}

{% mini-card
   title="Routing"
   description="Learn how to route incoming requests based on their path."
   href="/icerpc/dispatch/router" /%}
{% /grid %}

## C# examples

{% grid %}

{% mini-card
   title="Core example"
   description="Using IceRPC without an IDL."
   href="https://github.com/icerpc/icerpc-csharp/tree/main/examples/GreeterCore" /%}

{% mini-card
   title="JSON example"
   description="Using IceRPC with JSON."
   href="https://github.com/icerpc/icerpc-csharp/tree/main/examples/GreeterJson" /%}

{% mini-card
   title="Protobuf example"
   description="Using IceRPC with Protobuf."
   href="https://github.com/icerpc/icerpc-csharp/tree/main/examples/GreeterProtobuf" /%}

{% /grid %}

[idl]: https://en.wikipedia.org/wiki/Interface_description_language
[slice]: ../slice2
