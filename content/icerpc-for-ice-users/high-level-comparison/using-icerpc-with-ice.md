---
title: Using IceRPC with an Ice application
description: Learn how to use IceRPC with an existing Ice application.
---

## Interop basics

IceRPC provides interop with Ice by implementing the `ice` protocol over the tcp/ssl duplex transport (with some
limitations), and by supporting the Ice encoding and Ice's Slice language.

In practice, this means you can write a new IceRPC client for an existing Ice server, reimplement an existing Ice server
using IceRPC, or use IceRPC to create new services for your Ice clients.

## Generating code for IceRPC

The Slice compiler and tooling provided by the Ice framework allow you to target IceRPC when compiling `.ice` files.
This way, you can very easily add IceRPC components to your existing Ice applications.

## Limitations

The main interop limitation for clients is IceRPC does not currently provide support for calling a server behind a
[Glacier2] router. So if you have an Ice client that calls a server through Glacier2, you cannot reimplement this client
with IceRPC. This is a [temporary] limitation, not a fundamental design choice within IceRPC.

The main interop limitations for servers are [batch requests] and [IceGrid] support.

If your Ice clients send batch requests, you can't reimplement the corresponding Ice server with IceRPC since IceRPC
does not accept batch requests.

If your Ice server is started by IceGrid, you can't reimplement this server with IceRPC. IceGrid generates Ice
configuration files for the Ice servers it starts and IceRPC provides no support for Ice configuration files.

[batch requests]: https://docs.zeroc.com/ice/3.8/csharp/batched-invocations
[Glacier2]: https://docs.zeroc.com/ice/3.8/csharp/glacier2
[IceGrid]: https://docs.zeroc.com/ice/3.8/csharp/icegrid
[temporary]: https://github.com/icerpc/icerpc-csharp/issues/3608
