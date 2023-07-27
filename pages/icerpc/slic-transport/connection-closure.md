---
title: Connection closure
description: Understand how a connection is closed.
---

## What's connection closure?

Connection closure is either graceful or abortive and can be initiated by the client or server. Violations of the protocol lead to an abortive close.

Once the connection closure is initiated, opened streams can be considered immediately closed. More specifically, [StreamReadsClosed][stream-reads-closed-frame] and [StreamWritesClosed][stream-writes-closed-frame] frames must not be exchanged for opened stream when the connection is closed.

## Graceful connection closure

A client closes the connection as follows:

1. Send a [Close][close-frame] frame to the server.

2. Shutdown writes on the duplex connection.

3. Wait for server to shutdown writes on the duplex connection.

Once the client gets the server's writes shutdown notification, it considers the connection closed.

The following sequence diagram shows the interactions between the client and server when the connection closure is initiated by the client:

```mermaid
sequenceDiagram
    Client-)Server: Close frame
    Client->>Server: Duplex connection shutdown
    Server-->>Client: Duplex connection shutdown
```

A server closes the connection as follows:

1. Send a Close frame to the client.

2. Wait for client to shutdown writes on the duplex connection.

3. Shutdown writes on the duplex connection.

Once the server gets the client's writes shutdown notification, it considers the connection closed.

The following sequence diagram shows the interactions between the client and server when the connection closure is initiated by the server:

```mermaid
sequenceDiagram
    Server->>Client: Close frame
    Client-->>Server: Duplex connection shutdown
    Server->>Client: Duplex connection shutdown
```

{% callout type="information" %}
The difference between the client and the server connection closure is the timing of the duplex connection writes shutdown. The duplex connection writes shutdown is always first initiated by the client. When using the TCP transport, this ensures sockets won't be left in the TIME_WAIT state on the server.
{% /callout %}

The Close frame carries an application error code. This error code provides the reason for the connection closure.

## Abortive connection closure

Abortive connection closure must abort the duplex connection.

[close-frame]: protocol-frames#close-frame
[stream-reads-closed-frame]: protocol-frames#streamreadsclosed-and-streamwritesclosed-frames
[stream-writes-closed-frame]: protocol-frames#streamreadsclosed-and-streamwritesclosed-frames
