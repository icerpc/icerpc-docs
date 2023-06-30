---
title: IceRPC Core
description: RPCs without an IDL
showToc: false
---

The IceRPC Core provides everything you need to send and receive requests and responses over network connections. These
requests and responses carry byte streams—the encoding of these byte streams is outside the scope of the IceRPC Core.

{% grid %}

{% mini-card
   title="How to create a connection"
   description="Learn how to create and accept connections with IceRPC."
   href="/icerpc-core/connection/how-to-create-a-connection" /%}

{% mini-card
   title="Invocation"
   description="Learn how to send requests and receive responses."
   href="/icerpc-core/invocation/invocation-pipeline" /%}

{% mini-card
   title="Dispatch"
   description="Learn how to accept requests and return responses."
   href="/icerpc-core/dispatch/dispatch-pipeline" /%}

{% mini-card
   title="Server Address"
   description="Understand the server address concept and syntax."
   href="/icerpc-core/connection/server-address" /%}

{% mini-card
   title="Service Address"
   description="Understand the service address concept and syntax."
   href="/icerpc-core/invocation/service-address" /%}

{% mini-card
   title="Routing"
   description="Learn how to route incoming requests based on their path."
   href="/icerpc-core/dispatch/router" /%}
{% /grid %}

## C# examples

{% grid %}

{% mini-card
   title="Core Example"
   description="Using the IceRPC Core without an IDL."
   href="https://github.com/icerpc/icerpc-csharp/tree/main/examples/GreeterCore" /%}

{% mini-card
   title="JSON Example"
   description="Using the IceRPC Core with JSON."
   href="https://github.com/icerpc/icerpc-csharp/tree/main/examples/GreeterJson" /%}

{% mini-card
   title="Protobuf Example"
   description="Using the IceRPC Core with Protobuf."
   href="https://github.com/icerpc/icerpc-csharp/tree/main/examples/GreeterProtobuf" /%}

{% /grid %}
