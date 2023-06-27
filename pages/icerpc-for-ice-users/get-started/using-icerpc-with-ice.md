---
title: Using IceRPC with an Ice application
description: Learn how to use IceRPC together with an existing Ice application.
---

## Interop basics

IceRPC provides interop with Ice by implementing the ice protocol over the tcp/ssl duplex transport (with some
limitations), and by supporting the Ice encoding version 1.1 (called Slice1 in IceRPC).

In practice, this means you can write a new IceRPC client for an existing Ice server, reimplement an existing Ice server
using IceRPC, or use IceRPC to create new services for your Ice clients.

If you start from an existing Ice client or server, the first step is convert your Slice definitions to the new Slice
syntax. The converted Slice files must specify the Slice1 encoding:
```slice
encoding = Slice1 // required for interop with Ice
...

```

Make sure to use the `.slice` extension for these new files.

If you use IceRPC to create new services for your Ice client, you should start by defining your Slice interfaces with
the new .slice syntax (and `encoding = Slice1`), before converting these definitions to the .ice syntax. The new syntax
allows you to mark a proxy or class parameter/field as nullable or non-nullable; with the .ice syntax, you can't make
this distinction.

## Limitations

The main interop limitation for clients is IceRPC does not support Ice routers. As a result, an IceRPC client cannot
call an Ice server through a Glacier2 router.

The main interop limitations for servers is batch requests and IceGrid support.

If your clients send batches requests, you can't reimplement the corresponding Ice server with IceRPC since IceRPC does
not accept batch requests.

If your Ice server is managed (especially started) by IceGrid, you can't reimplement this server with IceRPC. IceGrid
generates Ice configuration files for the Ice servers it starts and IceRPC provides no support for Ice configuration
files.
