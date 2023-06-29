---
title: Connection closure
description: Understand how a connection is closed
---

## What's connection closure?

Connection closure is a graceful close of the connection. It's initiated by the application and it informs the peer
that:

- it should stop accepting streams.

- all the opened streams can be considered closed.

Closing the connection doesn't wait for the streams to be closed by the application. The application is responsible to
close the connection after the streams are closed if it wants communication on the stream to cease first.

An application error code is transmitted to provide the reason of the connection closure. This error code is carried by
the [Close][close-frame] frame.

## Connection closure steps

The client follows these steps to close the Slic connection:

1. It sends a [Close][close-frame] frame to the server.

2. It shuts down the duplex connection.

3. It waits for the server to shutdown its side of the duplex connection.

And the server follows these steps to close the Slic connection:

1. It sends a [Close][close-frame] frame to the client.

2. It waits for the client to shutdown its side of the duplex connection.

3. It shuts down the duplex connection.

You'll note that the shutdown of the duplex connection is always initiated by the client. When using the TCP transport,
this ensures sockets won't be left in the TIME_WAIT state on the server.

[close-frame]: protocol-frames#close-frame
