---
title: Connection establishment
description: Learn how to establish a Slic connection.
---

## Features provided by connection establishment

Connection establishment serves several purposes:

- To provide Slic version negotiation.

- To provide the application protocol name to use over the connection. The server-side can use this information to implement port sharing for multiple application protocols.

- To communicate unilaterally transport parameters from both sides of the connection.

Connection establishment relies on the [Initialize](LINK), [Version](LINK) and [InitializeAck](LINK) frames.

## Connection establishment steps

A Slic connection is established as follows:

1. The client opens a duplex connection to the server.

2. The server accepts this duplex connection.

3. The client sends the Initialize frame to the server.

4. The server receives this frame and either sends back:

    - The InitializeAck frame if it supports the Slic protocol version specified in the Initialize frame.

    - The Version frame with the Slic protocol versions supported by the server.

5. If the client receives the InitializeAck frame, the connection is considered established. Otherwise if it receives the Version frame, it checks the versions advertised by the server:

    - If it doesn't support any, it aborts the duplex connection.

    - Otherwise, it sends again the Initialize frame and waits for the server to send back the InitializeAck frame.

Once the server sent the InitializeAck and the client received it, the connection is established and streams can be created or accepted.
