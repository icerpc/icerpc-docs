---
title: Protocol frames
description: Understand the frames sent over a Slic connection.
---

## Frame layout

The Slic protocol sends data over a duplex connection in protocol frames. The reading and writing of these frames are
serialized on the duplex connection.

All the frames have the same layout: a header followed by a body.

The format of the header differs depending on the frame type. The header can be a connection frame header or a stream frame header. Both headers are compact structs defined as follows:

```slice
compact struct ConnectionFrameHeader {
    frameType: FrameType   // frameType < FrameType::Stream
    frameSize: varuint62
}

compact struct StreamFrameHeader {
    frameType: FrameType   // frameType >= FrameType::Stream
    frameSize: varuint62
    streamId: varuint62
}

enum FrameType : uint8 {
    // connection frames
    Initialize = 1
    InitializeAck
    Version
    Close
    Ping
    Pong
    // stream frames
    Stream
    StreamLast
    StreamReadsClosed
    StreamWindowUpdate
    StreamWritesClosed
}
```

The `frameSize` represents the total number of bytes in the frame. The size of the header is not included.

The format of the body depends on the frame type and the Slic version. This page describes the frames from the first
Slic version (V1) which is at present the only version.

## Initialize frame

An Initialize frame carries parameters sent by a client to a server on connection establishment. It consists of a header
with the Initialize type followed by:
- a version encoded as a `varuint62`
- an Initialize body

The Initialize body is defined as follows:

```slice
compact struct InitializeBody {
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

When the server receives the Initialize frame, it reads the Slic version. If supported, it reads the Initialize frame
body. Otherwise, it skips its reading.

{% callout %}

The Slic version is not part of the Initialize frame body because an upcoming Slic version might update the definition
of the Initialize frame body.

{% /callout %}

## InitializeAck frame

An InitializeAck frame carries parameters. It consists of a header with the InitializeAck type followed by an
InitializeAck body:

```slice
compact struct InitializeAckBody {
    parameters: ParameterFields
}
```

The parameters are used to configure the connection.

## Version frame

A Version frame carries a sequence of `varint62` values where each value specifies a Slic version. It is sent by a
server on connection establishment if the Slic version specified in the Initialize frame is not supported.

```slice
compact struct VersionBody {
    versions: sequence<varuint62>
}
```

## Close frame

A Close frame carries an application error code. It consists of a header with the Close type followed by a Close body:

```slice
compact struct CloseBody {
    applicationErrorCode: varuint62
}
```

The application error code is provided by the application on connection closure.

## Ping frame

A Ping frame carries an opaque payload. It consists of a header with the Ping type followed by a Ping body:

```slice
compact struct PingBody {
    payload: OpaqueData
}

custom OpaqueData // 64-bits opaque data
```

A Pong frame with the same opaque payload must be sent after receiving a Ping frame.

## Pong frame

An Pong frame carries an opaque payload. It consists of a header with the Pong type followed by a Pong body:

```slice
compact struct PongBody {
    payload: OpaqueData
}
```

A Pong frame is sent in response of a Ping frame. It must include the same payload as the Ping frame.

## Stream and StreamLast frames

A Stream or StreamLast frame carries the application payload. It consists of a header with the Stream or StreamLast
type. The stream frame header is followed by the application data.

## StreamReadsClosed and StreamWritesClosed frames

A StreamReadsClosed or StreamWritesClosed consists of a header with the StreamReadsClosed or StreamWritesClosed type. It
doesn't have a body.

These two frames are sent to notify the receiver that reads or writes are closed.

## StreamWindowUpdate frame

A StreamWindowUpdate frame carries a window size increment value. It consists of a header with the StreamWindowUpdate
type followed by an StreamWindowUpdateBody body:

```slice
compact struct StreamWindowUpdateBody {
    windowSizeIncrement: varuint62
}
```

The window size increment specifies the additional number of bytes that can be sent in addition to the existing window
size.
