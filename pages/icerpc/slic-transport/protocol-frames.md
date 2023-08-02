---
title: Protocol frames
description: Understand the frames sent over a Slic connection.
---

## Frame layout

The Slic transport protocol sends data over a duplex connection in protocol frames. The reading and writing of these
frames are serialized on the underlying duplex connection.

Frames and types from this page are defined using [Slice][slice].

All the frames have a header and a body. The header layout is common to all Slic versions and is composed of the
following fields:
- a frame type defined as an `uint8` enumeration
- a frame size defined as a `varuint62` representing the size of the frame body.

The frame type is defined as follows:
```slice
enum FrameType : uint8 {
    Initialize = 1
    InitializeAck
    Version
    Close
    Ping
    Pong
    Stream
    StreamLast
    StreamReadsClosed
    StreamWindowUpdate
    StreamWritesClosed
}
```

All Slic versions support the `Initialize` and `Version` frames. All the other frames are version-specific.

## Initialize frame

An `Initialize` frame carries parameters sent by a client to a server on connection establishment. It's defined as
follows:

```slice
compact struct InitializeFrame {
    frameType: FrameType // = FrameType::Initialize
    frameSize: varuint62
    version: varuint62 // = 1 (Slic version 1)
    parameters: ParameterFields
}

unchecked enum ParameterKey : varuint62 {
    MaxBidirectionalStreams = 0
    MaxUnidirectionalStreams = 1
    IdleTimeout = 2
    InitialStreamWindowSize = 3
    MaxStreamFrameSize = 4
}

typealias ParameterFields = dictionary<ParameterKey, sequence<uint8>>
```

The parameters are used to configure the connection.

All Slic versions support an `Initialize` frame with a body that starts with a version field. The remainder of the
body is version-specific. If the server doesn't support the version from the `Initialize` frame, it must respond with a
`Version` frame that specifies the versions it supports.

## InitializeAck frame

An `InitializeAck` frame carries parameters. It's defined as follows:

```slice
compact struct InitializeAckFrame {
    frameType: FrameType // = FrameType::InitializeAck
    frameSize: varuint62
    parameters: ParameterFields
}
```

The parameters are used to configure the connection.

## Version frame

A `Version` frame carries a sequence of `varint62` values where each value specifies a Slic version. It is sent by a
server on connection establishment if the Slic version specified in the Initialize frame is not supported. It's defined
as follows:

```slice
compact struct VersionFrame {
    frameType: FrameType // = FrameType::Version
    frameSize: varuint62
    versions: sequence<varuint62>
}
```

All Slic versions support this frame.

## Close frame

A `Close` frame carries an application error code. It's defined as follows:

```slice
compact struct CloseFrame {
    frameType: FrameType // = FrameType::Close
    frameSize: varuint62
    applicationErrorCode: varuint62
}
```

The application error code is provided by the application on connection closure.

## Ping frame

A `Ping` frame carries an opaque payload. It's defined as follows:

```slice
compact struct PingFrame {
    frameType: FrameType // = FrameType::Ping
    frameSize: varuint62
    payload: OpaqueData
}

custom OpaqueData // 64-bits opaque data
```

A `Pong` frame with the same opaque payload must be sent after receiving a `Ping` frame.

## Pong frame

An Pong frame carries an opaque payload. It's defined as follows:

```slice
compact struct PongFrame {
    frameType: FrameType // = FrameType::Pong
    frameSize: varuint62
    payload: OpaqueData
}
```

A `Pong` frame is sent in response of a `Ping` frame. It must include the same payload as the `Ping` frame.

## Stream and StreamLast frames

A `Stream` or `StreamLast` frame carries the application payload. It consists of the frame header followed by the
stream ID and application data. It's defined as follows:

```slice
compact struct StreamFrame {
    frameType: FrameType // = FrameType::Stream or FrameType::StreamLast
    frameSize: varuint62
    streamId: varuint62
    // Application payload bytes
}
```

## StreamReadsClosed and StreamWritesClosed frames

A `StreamReadsClosed` or `StreamWritesClosed` frame doesn't carry any data. Both frames are defined as follows:

```slice
compact struct StreamClosedFrame {
    frameType: FrameType // = FrameType::StreamWritesClosed or FrameType::StreamReadsClosed
    frameSize: varuint62
    streamId: varuint62
}
```

These frames are sent when reads or writes are closed on the stream.

## StreamWindowUpdate frame

A `StreamWindowUpdate` frame carries a window size increment value. It's defined as follows:

```slice
compact struct StreamWindowUpdateFrame {
    frameType: FrameType // = FrameType::StreamWindowUpdate
    frameSize: varuint62
    streamId: varuint62
    windowSizeIncrement: varuint62
}
```

The window size increment specifies the additional number of bytes that can be sent in addition to the existing window
size.

[slice]: ../../slice2
