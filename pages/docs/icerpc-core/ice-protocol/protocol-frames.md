---
title: Protocol frames
description: Understand how requests and responses are sent over ice.
---

{% title /%}

## Ice interop

This section describes the ice protocol _as implemented_ by the IceRPC core. The ice protocol as implemented by Ice is
described in the [Ice Manual](https://doc.zeroc.com/ice/3.7/ice-protocol-and-encoding).

Both implementations are naturally compatible to allow Ice and IceRPC applications to communicate with each others.

The ice protocol implementation in IceRPC does not support a few secondary features that Ice supports, namely:
 - batch requests
 - protocol frame compression
 - datagram transports (i.e., UDP)

## Frame layout

The ice protocol sends requests, responses and other information over a duplex connection in protocol frames.

All ice protocol frames have the same layout: a header followed by a body. The format of the body depends on the frame
type.

The header is a compact struct defined as follows:

```slice
encoding = Slice1

compact struct HeaderData {
    magic: int32               // always 0x49 0x63 0x65 0x50 i.e. "IceP".
    protocolMajor: uint8       // always 1
    protocolMinor: uint8       // always 0
    encodingMajor: uint8       // always 1
    encodingMinor: uint8       // always 0
    frameType: FrameType
    compressionStatus: uint8
    frameSize: int32
}

enum FrameType {              // encoded on a single byte
    Request = 0
    BatchRequest = 1
    Reply = 2
    ValidateConnection = 3
    CloseConnection = 4
}
```

The compressionStatus is not used or supported by IceRPC. It must be set to 0.

The frameSize represents the total number of bytes in the frame, including the frame header.

## Request frame

A request frame carries an ice request. It consists of a header with the Request type followed by a RequestData body:

```slice
encoding = Slice1

compact struct RequestData {
    requestId: int32
    id: Identity
    facet: sequence<string>
    operation: string
    mode: OperationMode
    context: dictionary<string, string>
    params: Encapsulation
}

compact struct Identity {
    name: string
    category: string
}

enum OperationMode { Normal = 0, Idempotent = 2 } // encoded on 1 byte
```

The requestId 0 is reserved for use in oneway requests and indicates this request has no corresponding response. A
requestId greater than 0 uniquely identifies the request on a connection, and must not be reused while a response for
this requestId is outstanding.

The id corresponds to the path of the outgoing request's service address encoded as an Identity.

The facet corresponds to the fragment of the outgoing request's service address encoded as a `sequence<string>`. This
sequence is empty when the fragment is empty; otherwise, it has a single element with the fragment.

The mode encodes the value of the Idempotent
[request field](../invocation/outgoing-request#request-fields). The default is Normal.

The context encodes the value of the Context request field. The default is an empty dictionary.

The params carry the request payload inside an [encapsulation](#encapsulation).

## Batch request frame

A batch request corresponds to one or more oneway ice requests "batched" together in a single frame. IceRPC does not
send batch requests and does not accept incoming batch request frames.

## Response frame

A response frame carries an ice response. It consists of a header with the Reply type followed by a ReplyData body:

```slice
encoding = Slice1

compact struct ReplyData {
    requestId: int32
    replyStatus: ReplyStatus
    replyPayload: uint8[...] // pseudo-Slice
}

enum ReplyStatus { // encoded on 1 byte
    Ok = 0
    UserException = 1
    ObjectNotExistException = 2
    FacetNotExistException = 3
    OperationNotExistException = 4
    UnknownLocalException = 5
    UnknownUserException = 6
    UnknownException = 7
}
```

The requestId identifies the request associated with this response.

The replyStatus encodes the response's [status code](../invocation/incoming-response#status-code):

| Status code        | Encoded as reply status    |
|--------------------|----------------------------|
| Success            | Ok                         |
| ApplicationError   | UserException              |
| ServiceNotFound    | ObjectNotExistException    |
| OperationNotFound  | OperationNotExistException |
| UnhandledException | UnknownException           |

When IceRPC receives a response frame, it creates an incoming response with a status code decoded from the reply status:

| Reply status               | Decoded as status code |
|----------------------------|------------------------|
| Ok                         | Success                |
| UserException              | ApplicationError       |
| ObjectNotExistException    | ServiceNotFound        |
| FacetNotExistException     | ServiceNotFound        |
| OperationNotExistException | OperationNotFound      |
| Unknown exceptions         | UnknownException       |

The format of the replyPayload depends on the reply status:

| Reply status        | Format of the reply payload                                           |
|---------------------|-----------------------------------------------------------------------|
| Ok                  | An [encapsulation](#encapsulation) that holds the response's payload. |
| UserException       | An [encapsulation](#encapsulation) that holds the response's payload. |
| NotExist exceptions | A RequestFailedData encoded with Slice1.                              |                                                  |
| Unknown exceptions  | The response's error message encoded with Slice1.                     |

RequestFailedData is a struct that holds the request's path, fragment and operation. The path is encoded as an Identity
and the fragment is encoded as a sequence<string>:

```slice
encoding = 1

compact struct RequestFailedData {
    path: Identity
    facet: sequence<string>
    operation: string
}
```

## Encapsulation

An encapsulation is a holder for a request or response payload. In addition to the payload itself, it encodes the
payload size (as the encapsulation size, equal to the payload size plus 6) and an encoding version:

```slice
encoding = Slice1

compact struct Encapsulation {
    size: int32              // payload size + 6
    encodingMajor: uint8     // always 1
    encodingMinor: uint8     // always 1
    payload: uint8[...]      // pseudo-Slice
}
```

The IceRPC core does not know (and does not want to know) how a request or response payload is encoded. As far as the
IceRPC core is concerned, the payload is just a stream of bytes. It's the user of the IceRPC core that knows how these
payloads are encoded; a typical user is the code generated by the Slice compiler.

With Ice, there is no encoding-agnostic Ice core. Requests and responses always specify the version of the Ice/Slice
encoding used to encode their payloads.

For compatibility with Ice, the IceRPC core always encodes 1.1 (on 2 bytes) as the Ice/Slice encoding version in
encapsulations even though the IceRPC core doesn't know anything about payload encoding. That's because:
- if this encapsulation is received by an Ice application, the only encoding supported by both Ice and IceRPC is Slice1
aka Ice/Slice encoding version 1.1.
- if this encapsulation is received by an IceRPC application, this 1.1 version is ignored.

For the same reason, when the IceRPC core receives an encapsulation, it makes sure the encoding version in this
encapsulation is set to 1.1.
