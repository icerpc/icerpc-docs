---
title: Protocol frames
description: Understand the frames sent over a Slic connection.
---

## Frame layout

The Slic transport protocol sends data over a duplex connection in protocol frames. The reading and writing of these
frames are serialized on the duplex connection.

All the frames have the same layout: a header followed by a body.

The header begins with a frame type followed by a frame size. It's defined as the following compact struct:

```slice
compact struct FrameHeader {
    frameType: FrameType
    frameSize: varuint62
}
```

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

The `frameSize` represents the total number of bytes of the frame body. The format of the body depends on the frame type
and the Slic version. This page describes the frames from the first Slic version (V1) which is at present the only
version.

## Initialize frame

An Initialize frame carries parameters sent by a client to a server on connection establishment. It's defined as
follows:

```slice
compact struct InitializeFrame {
    frameType: FrameType // = FrameType::Initialize
    frameSize: varuint62
    version: varuint62 // = 1 (Slic V1)
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

## InitializeAck frame

An InitializeAck frame carries parameters. It's defined as follows:

```slice
compact struct InitializeAckFrame {
    frameType: FrameType // = FrameType::InitializeAck
    frameSize: varuint62
    parameters: ParameterFields
}
```

The parameters are used to configure the connection.

## Version frame

A Version frame carries a sequence of `varint62` values where each value specifies a Slic version. It is sent by a
server on connection establishment if the Slic version specified in the Initialize frame is not supported. It's defined
as follows:

```slice
compact struct VersionFrame {
    frameType: FrameType // = FrameType::Version
    frameSize: varuint62
    versions: sequence<varuint62>
}
```

## Close frame

A Close frame carries an application error code. It's defined as follows:

```slice
compact struct CloseFrame {
    frameType: FrameType // = FrameType::Close
    frameSize: varuint62
    applicationErrorCode: varuint62
}
```

The application error code is provided by the application on connection closure.

## Ping frame

A Ping frame carries an opaque payload. It's defined as follows:

```slice
compact struct PingFrame {
    frameType: FrameType // = FrameType::Ping
    frameSize: varuint62
    payload: OpaqueData
}

custom OpaqueData // 64-bits opaque data
```

A Pong frame with the same opaque payload must be sent after receiving a Ping frame.

## Pong frame

An Pong frame carries an opaque payload. It's defined as follows:

```slice
compact struct PongFrame {
    frameType: FrameType // = FrameType::Pong
    frameSize: varuint62
    payload: OpaqueData
}
```

A Pong frame is sent in response of a Ping frame. It must include the same payload as the Ping frame.

## Stream and StreamLast frames

A Stream or StreamLast frame carries the application payload. It consists of the frame header followed by the
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

A StreamReadsClosed or StreamWritesClosed frames doesn't carry any data. Both frames are defined as follows:

```slice
compact struct StreamClosedFrame {
    frameType: FrameType // = FrameType::StreamWritesClosed or FrameType::StreamReadsClosed
    frameSize: varuint62
    streamId: varuint62
}
```

These frames are used to notify the peer that the stream's reads or writes are closed.

## StreamWindowUpdate frame

A StreamWindowUpdate frame carries a window size increment value. It's defined as follows:

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
