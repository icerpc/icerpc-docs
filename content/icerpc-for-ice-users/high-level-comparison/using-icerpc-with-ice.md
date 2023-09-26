---
title: Using IceRPC with an Ice application
description: Learn how to use IceRPC with an existing Ice application.
---

## Interop basics

IceRPC provides interop with Ice by implementing the `ice` protocol over the tcp/ssl duplex transport (with some
limitations), and by supporting the Ice encoding and the Slice language.

In practice, this means you can write a new IceRPC client for an existing Ice server, reimplement an existing Ice server
using IceRPC, or use IceRPC to create new services for your Ice clients.

If you start from an existing Ice client or server, the first step is to convert your Slice definitions (in `.ice`
files) to the new Slice syntax. The converted Slice files must specify `Slice1` mode:
```slice
mode = Slice1 // required for interop with Ice
...

```

Make sure to use the `.slice` extension for these new Slice files.

If you use IceRPC to create new services for your Ice client, you should start by defining your Slice interfaces with
the new Slice syntax (and `mode = Slice1`) before converting these definitions to the `.ice` Slice syntax. The new
syntax allows you to mark a proxy or class parameter/field as optional or non-optional, for example:

```slice {% title="Slice with the .slice syntax" %}
interface ContactRegistry {
    // The new contact cannot be null / not-set.
    addContact(contact: Contact)

    // Returns null/not-set when not found.
    findContact(name: string) -> Contact?
}

class Contact {
    name: string
    ...
}
```

With the `.ice` Slice syntax, you can't make this distinction: a proxy or class parameter/field is always optional.

## Limitations

The main interop limitation for clients is IceRPC does not currently provide support for calling a server behind a
[Glacier2] router. So if you have an Ice client that calls a server through Glacier2, you cannot reimplement this client
with IceRPC.

This is a [temporary] limitation, not a fundamental design choice within IceRPC.

The main interop limitations for servers is [batch requests] and [IceGrid] support.

If your Ice clients send batches requests, you can't reimplement the corresponding Ice server with IceRPC since IceRPC
does not accept batch requests.

If your Ice server is managed (especially started) by IceGrid, you can't reimplement this server with IceRPC. IceGrid
generates Ice configuration files for the Ice servers it starts and IceRPC provides no support for Ice configuration
files.

[batch requests]: https://doc.zeroc.com/ice/3.7/client-side-features/batched-invocations
[Glacier2]: https://doc.zeroc.com/ice/3.7/ice-services/glacier2
[IceGrid]: https://doc.zeroc.com/ice/3.7/ice-services/icegrid
[temporary]: https://github.com/icerpc/icerpc-csharp/issues/3608
