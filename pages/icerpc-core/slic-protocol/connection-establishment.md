---
title: Connection establishment
description: Understand how a connection is established
---

## Features provided by connection establishment

Connection establishment serves several purposes:

- It implements Slic version negotiation.

- It communicates unilaterally transport parameters on both sides of the connection.

Connection establishment relies on the [Initialize][initialize-frame], [Version][version-frame] and [InitializeAck][initialize-ack-frame] frames.

## Connection establishment steps

A Slic connection is established as follows:

1. The client opens a duplex connection to the server.

2. The server accepts this duplex connection.

3. The client sends the [Initialize][initialize-frame] frame to the server.

4. The server receives this frame and either sends back:

    - The [InitializeAck][initialize-ack-frame] frame if it supports the Slic protocol version specified in the
      [Initialize][initialize-frame] frame.

    - The [Version][version-frame] frame with the Slic protocol versions supported by the server.

5. If the client receives the [InitializeAck][initialize-ack-frame] frame, the connection is considered established.
   Otherwise if it receives the [Version][version-frame] frame, it checks the versions advertised by the server:

    - If it doesn't support any, it shuts down the duplex connection.

    - Otherwise, it sends again the [Initialize][initialize-frame] frame with a supported version and waits for the
      server to send back the [InitializeAck][initialize-ack-frame] frame.

Once the server sent the [InitializeAck][initialize-ack-frame] frame and the client received it, the connection is
established and streams can be created or accepted.

## Connection establishment parameters

A number of parameters are exchanged with the [Initialize][initialize-frame] frame:

- The `MaxBidirectionalStreams` parameter specifies the maximum number of concurrent bidirectional streams the peer is
  allowed to open.

- The `MaxUnidirectionalStreams` parameter specifies the maximum number of concurrent unidirectional streams the peer is
  allowed to open.

- The `IdleTimeout` parameter specifies how long a connection can be inactive before it's aborted.

- The `PacketMaxSize` parameter specifies the maximum amount of data carried by a Stream or StreamLast frame.

- The `InitialStreamWindowSize` specifies the initial stream window size used for stream flow control.

[initialize-frame]: protocol-frames#initialize-frame
[initialize-ack-frame]: protocol-frames#initializeack-frame
[version-frame]: protocol-frames#version-frame
