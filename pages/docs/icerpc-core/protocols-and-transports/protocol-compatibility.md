---
title: Protocol compatibility
description: How to mix and match ice and icerpc?
---

{% title /%}

## Incompatible protocols

Even though their names are similar, the ice and icerpc protocols are completely incompatible. A server listening for
ice connections accepts only ice connections. The same is true for icerpc: a server listening for icerpc connections
accepts only icerpc connections.

IceRPC does not provide an upgrade mechanism to upgrade an ice connection to a newer and more capable icerpc connection
in the event the server application supports both ice and icerpc.

## Listening for both ice and icerpc connections

A server application does not have to be ice-only or icerpc-only because it can easily create two servers:
 - one server for ice
 - another server for icerpc

These two servers can share the same [dispatch pipeline](../dispatch/dispatch-pipeline). This way, the server
application as a whole is reachable through ice and icerpc and provides the same services to all its clients.
