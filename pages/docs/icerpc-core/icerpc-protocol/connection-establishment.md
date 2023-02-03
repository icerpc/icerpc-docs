---
title: Connection establishment
description: Learn how a client connects to a server with icerpc.
---

{% title /%}

## Client side

A client follows these steps to establish a connection with icerpc:

1. Establish a multiplexed transport connection to the server.
This transport-level connection establishment includes a TLS handshake when the transport connection uses TLS.

2. Open a unidirectional stream to the server: the client control stream

3. Accept a unidirectional stream from the server: the server control stream

4. Send a Settings frame to the server using the client control stream

5. Receive a Settings frame from the server over the server control stream

Once the client receives the Settings frame from the server, it considers the connection to be established and the
application start sending requests (creating streams) and dispatching requests (accepting streams) on this connection.

## Server side

A server follows these steps to accept a connection with icerpc:

1. Accept a multiplexed transport connection from a client.
This transport-level connection "accept" includes a TLS handshake when the transport connection uses TLS.

2. Open a unidirectional stream to the client: the server control stream

3. Accept a unidirectional stream from the client: the client control stream

4. Send a Settings frame to the client using the server control stream

5. Receive a Settings frame from the client over the client control stream

Once the server receives the Settings frame from the client, it considers the connection to be established and the
application start sending requests (creating streams) and dispatching requests (accepting streams) on this connection.

## Settings frame

The Settings frame is used to configure an icerpc connection during connection establishment. Each side must send this
frame and expects to receive this frame from its peer; there is however no requirement to specify any setting.

There is currently only one setting, `MaxHeaderSize`. It specifies the maximum size of the header of a request or
response sent over this connection. If a client or server does not want to use the default value for `MaxHeaderSize`
(16,383), it sends its desired value to the peer in Settings. Each side must then use the smallest `MaxHeaderSize`
value. It is uncommon to change this setting.

The Setting frame is specified in Slice (LINK) and encoded with Slice2:
```slice
enum ControlFrameType : uint8
{
    Settings = 0,
    GoAway = 1,
}

compact struct SettingsFrame
{
    type: ControlFrameType, // value is ControlFrameType::Settings
    bodySize: varuint62,    // the number of bytes in body
    body: dictionary<SettingKey, varuint62>,
}

unchecked enum SettingKey : varuint62
{
    MaxHeaderSize = 0,
}
```
