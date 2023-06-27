---
title: Connection establishment
description: Learn how a client connects to a server with icerpc.
---

## Connection establishment steps

The icerpc connection establishment is the same for a client creating a connection and for a server accepting a
connection, except for the very first steps:

1. The client opens a multiplexed connection to the server.

2. The server accepts this multiplexed connection.

3. The client and server open a unidirectional stream: the outbound control stream.

4. The client and server accept this unidirectional stream: the inbound control stream.

5. The client and server send the Settings frame to each other over the outbound control stream. They typically send this frame at about the same time.

6. The client and server receive this Settings frame over the inbound control stream.

Once the client or the server receives the Settings frame from the peer, it considers the connection to be established
and the local application code can start sending requests (creating streams) and dispatching requests (accepting
streams) on this connection.

## Settings frame

The Settings frame is used to configure an icerpc connection during connection establishment. Each side of the
connection must send a Settings frame and wait until it receives a Settings frame from the peer; there is however no
requirement to specify any setting.

There is currently only one setting, `MaxHeaderSize`. It specifies the maximum size of the header of a request or
response sent over this connection.

Not specifying the `MaxHeaderSize` setting is equivalent to specifying its default value, 16,383. This default value
allows to encode the size of request and response headers on no more than 2 bytes.

If a client or a server does not want to use this default value, it sends its desired value to the peer in the Settings
frame. Each side then agrees to use the smallest `MaxHeaderSize` value. It is uncommon to change this setting.

The Settings frame is specified in Slice [Slice](../../slice) and encoded with Slice2:

```slice
enum ControlFrameType : uint8 {
    Settings = 0,
    GoAway = 1,
}

compact struct SettingsFrame {
    type: ControlFrameType, // value is ControlFrameType::Settings
    bodySize: varuint62,    // the number of bytes in body
    body: dictionary<SettingKey, varuint62>,
}

unchecked enum SettingKey : varuint62 {
    MaxHeaderSize = 0,
}
```
