---
title: What is IceRPC?
---

This document provides an introduction to IceRPC, outlining its main characteristics and available resources for
learning how to start using IceRPC.

## Introduction

IceRPC is a modern RPC (remote procedure call) framework, with a focus on performance and ease of use. Its main
characteristics include:

- Powerful IDL language (Slice) for defining client server contracts.
- Modular API design, which allows easily adding new functionality to the framework.
- Supports modern network protocols, including QUIC.

## The client server contract

The [Slice language][slice-language] simplifies the definition of the contract agreed upon by IceRPC clients and
servers. IceRPC is a [contract first][contract-first] RPC, meaning that the messages exchanged between clients and
servers are strongly typed and defined beforehand. Slice is the IDL language used by IceRPC.

This contract allows for optimizations that would otherwise not be possible. Since the message format is known by both
clients and servers, there is no need to exchange additional metadata to describe the messages. This results in a more
compact encoding of the messages.

The contract-first approach enables Slice compilers to generate code in the target language mapping, simplifying
the creation of client and server applications.

## Extensibility

IceRPC allows customization of the [invocation][invocation-pipeline] and [dispatch][dispatch-pipeline] pipelines using
[interceptors][interceptor] and [middleware][middleware]. IceRPC provides a set of common interceptors and middleware,
but you can also add your own to tailor your invocation and dispatch pipelines.

In addition, new transports can be added to handle special cases where standard transports like TCP or QUIC are not
available.

## Networking

IceRPC supports a [multiplexed transport][multiplexed-transports] abstraction that fully leverages modern network
protocols like QUIC.

## Additional Resources

- [C# Examples](https://github.com:icerpc/icerpc-csharp/examples)
- [C# API Documentation](https://api.testing.zeroc.com/csharp)

[slice-language]: ../slice
[contract-first]: ../slice/basics/contract-first
[invocation-pipeline]: ../icerpc-core/invocation/invocation-pipeline
[interceptor]: ../icerpc-core/invocation/interceptor
[dispatch-pipeline]: ../icerpc-core/dispatch/dispatch-pipeline
[middleware]: ../icerpc-core/dispatch/middleware
[multiplexed-transports]: ../icerpc-core/protocols-and-transports/icerpc-multiplexed-transports
