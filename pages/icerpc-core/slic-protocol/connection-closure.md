---
title: Connection closure
description: Understand how a connection is closed
---

## What's connection closure?

Connection closure is initiated by the application protocol. It informs the peer that:

- it can stop accepting streams.

- all the opened streams can be considered closed.

An application error code is also transmitted to provide the reason of the connection closure. This error code is carried by the [Close](LINK) frame.

## Closure steps

The client-side follows these steps to close the Slic connection:

1. It sends a Close frame to the peer.

2. It shuts down the duplex connection.

3. It waits for the peer to shutdown its side of the duplex connection.

And the server-side follows these steps to close the Slic connection:

1. It sends a Close frame to the peer.

2. It waits for the server to shutdown its side of the duplex connection.

3. It shuts down the duplex connection.

The shutdown of the duplex connection is always initiated by the client-side of the Slic connection. When using the TCP
transport, this ensures that sockets won't be left in the TIME_WAIT state for a long time on the server-side.
