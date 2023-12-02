---
title: Protobuf
description: Using Protocol Buffers with IceRPC
showReadingTime: false
---

## About Protocol Buffers

Protocol Buffers (Protobuf for short) is a popular [Interface Definition Language] (IDL) and serialization format
created by Google and available for many programming languages. [Protobuf] is the IDL for [gRPC] and several other RPC
frameworks.

This chapter describes the IceRPC + Protobuf integration, not Protobuf itself. The IceRPC + Protobuf integration uses
standard Protobuf files, with the regular Protobuf syntax and semantics.

## The IceRPC + Protobuf integration

The IceRPC + Protobuf integration helps you implement Protobuf services with IceRPC and call such services using (over)
IceRPC.

In practical terms, the IceRPC + Protobuf integration for C#:

- defines an IceRPC-specific client-side and server-side mapping for Protobuf services to C#
- provides a `protoc` code generator (`protoc-gen-icerpc-csharp`) that generates code for Protobuf services
- provides a support assembly used by this generated code, `IceRpc.Protobuf.dll`
- provides an MSBuild integration that helps you execute `protoc` with the `protoc-gen-icerpc-csharp` code generator in
MSBuild projects: `IceRpc.Protobuf.Tools`

User-defined Protobuf types such as messages and enums are handled by the `protoc` compiler and its built-in C# code
generator. The IceRPC + Protobuf integration does not customize this mapping in any way.

The net result is you need to write very little code to call or implement Protobuf services with IceRPC.

For example, let's take a typical Greeter example:

```protobuf
syntax = "proto3";

package visitor_center;
option csharp_namespace = "VisitorCenter";

// A simple Greeter service.
service Greeter {
    // Creates a personalized greeting.
    rpc Greet (GreetRequest) returns (GreetResponse);
}

// The request contains the name of the person to greet.
message GreetRequest {
    string name = 1;
}

// The response contains the greeting.
message GreetResponse {
    string greeting = 1;
}
```

`protoc`'s built-in code generator for C# generates classes for the `GreetRequest` and `GreetResponse` messages, while
`protoc-gen-icerpc-csharp` generates two interfaces and a struct for the `Greeter` service:

```csharp {% title="C# generated code - client-side" %}
namespace VisitorCenter;

public partial interface IGreeter
{
   Task<GreetResponse> GreetAsync(
      GreeterRequest message,
      IFeatureCollection? features = null,
      CancellationToken cancellationToken = default);
}

public readonly partial record struct GreeterClient : IGreeter, IProtobufClient
{
   public Task<GreetResponse> GreetAsync(
      GreetRequest message,
      IFeatureCollection? features = null,
      CancellationToken cancellationToken = default)
      {
          // implemented by the generated code using IceRPC...
      }
}
```

```csharp {% title="C# generated code - server-side" %}
namespace VisitorCenter;

public partial interface IGreeterService
{
   ValueTask<GreetResponse> GreetAsync(
      GreetRequest message,
      IFeatureCollection features,
      CancellationToken cancellationToken);
}
```

## Next steps

{% grid %}

{% mini-card
   title="Service mapping"
   description="Learn how to call and implement a Protobuf service with IceRPC in C#."
   href="/protobuf/language-mapping/service" /%}

{% mini-card
   title="Protocol Buffers Documentation"
   description="Google's documentation for Protocol Buffers."
   href="https://protobuf.dev/" /%}

{% mini-card
   title="Examples"
   description="See examples of the IceRPC + Protobuf integration for C#."
   href="https://github.com/icerpc/icerpc-csharp/tree/0.2.x/examples/protobuf" /%}

{% /grid %}

[gRPC]: https://grpc.io/
[Interface Definition Language]: https://en.wikipedia.org/wiki/Interface_description_language
[Protobuf]: https://en.wikipedia.org/wiki/Protocol_Buffers
