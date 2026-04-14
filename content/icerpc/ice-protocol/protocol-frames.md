---
title: Protocol frames
description: Understand how requests and responses are sent over ice.
---

## Ice interop

This section describes the ice protocol as implemented by IceRPC. The ice protocol as implemented by Ice is described
in the [Ice Manual][ice-protocol], where it's known as version 1.0 of the Ice protocol.

Both implementations are naturally compatible to allow Ice and IceRPC applications to communicate with each others.

The ice protocol implementation provided by IceRPC does not support a few non-essential features that Ice supports,
namely:

- batch requests
- protocol frame compression
- datagram transports (i.e., UDP)

## Frame layout

The ice protocol sends requests, responses and other information over a duplex connection in protocol frames.

All ice protocol frames have the same layout: a header followed by a body. The format of the body depends on the frame
type.

Frames and types from this page are defined using [Ice's interface definition language][ice-slice].

The header is an Ice struct defined as follows:

```ice
enum FrameType
{
    Request = 0,
    RequestBatch = 1,
    Reply = 2,
    ValidateConnection = 3,
    CloseConnection = 4,
}

struct HeaderData
{
    int magic;                 // always the bytes 0x49 0x63 0x65 0x50 ("IceP"), i.e. 0x50656349 in little-endian.
    byte protocolMajor;        // always 1
    byte protocolMinor;        // always 0
    byte encodingMajor;        // always 1
    byte encodingMinor;        // always 0
    FrameType frameType;
    byte compressionStatus;
    int frameSize;
}
```

The `compressionStatus` field is not used or supported by IceRPC. It must be set to 0.

The `frameSize` represents the total number of bytes in the frame, including the frame header.

## Request frame

A request frame carries an ice request. It consists of a header with the `Request` type followed by a `RequestData`
body:

```ice
enum OperationMode { Normal = 0, Idempotent = 2 }

struct Identity
{
    string name;
    string category;
}

sequence<string> Facet;
dictionary<string, string> Context;

struct RequestData
{
    int requestId;
    Identity id;
    Facet facet;
    string operation;
    OperationMode mode;
    Context context;
    Encapsulation params;
}
```

A `requestId` with a value greater than 0 uniquely identifies a two-way request on a connection, and must not be reused
while a response for this request is outstanding. The `requestId` 0 is reserved for one-way requests; a one-way request
has no corresponding response.

The `id` field corresponds to the path of the outgoing request's service address encoded as an
[Ice identity](/icerpc-for-ice-users/rpc-core/ice-identity).

The `facet` field corresponds to the fragment of the outgoing request's service address encoded as a `sequence<string>`.
This sequence is empty when the fragment is empty; otherwise, it has a single element with the fragment.

The `mode` encodes the value of the `Idempotent` [request field][request-fields]. The default is `Normal`.

The `context` encodes the value of the `Context` request field. The default is an empty dictionary.

The `params` field carries the request payload inside an [encapsulation](#encapsulation).

## Batch request frame

A batch request corresponds to one or more one-way ice requests "batched" together in a single frame. IceRPC does not
send batch requests and does not accept incoming batch request frames.

## Response frame

A response frame carries an ice response. It consists of a header with the `Reply` type followed by a `ReplyData` body:

```ice
enum ReplyStatus
{
    Ok = 0,
    UserException,
    ObjectNotExist,
    FacetNotExist,
    OperationNotExist,
    UnknownLocalException,
    UnknownUserException,
    UnknownException,
    InvalidData,
    Unauthorized
}

struct ReplyData
{
    int requestId;
    ReplyStatus replyStatus;
    byte[...] replyPayload; // pseudo-Ice
}
```

The `requestId` field identifies the request associated with this response.

The `replyStatus` encodes the response's [status code][status-code] as follows:

| Status code           | Encoded as reply status |
| --------------------- | ------------------------|
| Ok                    | Ok                      |
| ApplicationError      | UserException           |
| NotFound              | ObjectNotExist          |
| NotImplemented        | OperationNotExist       |
| InvalidData           | InvalidData             |
| Unauthorized          | Unauthorized            |
| Any other status code | UnknownException        |

When IceRPC receives a response frame, it creates an incoming response with a status code decoded from the reply status:

| Reply status      | Decoded as status code |
| ------------------| ---------------------- |
| Ok                | Ok                     |
| UserException     | ApplicationError       |
| ObjectNotExist    | NotFound               |
| FacetNotExist     | NotFound               |
| OperationNotExist | NotImplemented         |
| InvalidData       | InvalidData            |
| Unauthorized      | Unauthorized           |
| All other values  | InternalError          |

The format of the `replyPayload` depends on the reply status:

| Reply status                 | Format of the reply payload                                           |
| ----------------------------| --------------------------------------------------------------------- |
| Ok                           | An [encapsulation](#encapsulation) that holds the response's payload. |
| UserException                | An [encapsulation](#encapsulation) that holds the response's payload. |
| Any *NotExist* reply status | A `RequestFailedData` encoded with the Ice encoding.                  |
| Other values                 | The response's error message encoded with the Ice encoding.           |

### RequestFailedData

`RequestFailedData` is a struct that holds the request's path, fragment and operation. The path is encoded as an
`Identity` and the fragment is encoded as a `sequence<string>`:

```ice
struct RequestFailedData
{
    Identity path;
    Facet facet;
    string operation;
}
```

IceRPC always encodes the path, fragment and operation of the current incoming request in `RequestFailedData` when
sending a response with status code `NotFound` or `NotImplemented` in an ice response frame.

When IceRPC receives an ice response with a `NotExist` reply status, it decodes the `RequestFailedData` to create the
response's error message and then discards this `RequestFailedData`.

### Error message

When the response's status code is `ApplicationError`, `NotFound` or `NotImplemented`, the ice protocol does not provide
a mechanism to transmit the response's error message. As a result, the error message is not sent to the peer or received
from the peer with these status codes.

## Encapsulation

An encapsulation is a holder for a request or response payload. It holds the payload and encodes the payload size (as
the encapsulation size, equal to the payload size plus 6) and an encoding version:

```ice
struct Encapsulation
{
    int size;               // payload size + 6
    byte encodingMajor;     // always 1
    byte encodingMinor;     // always 1
    byte[...] payload;      // pseudo-Ice
}
```

IceRPC does not know (and does not want to know) how a request or response payload is encoded. As far as IceRPC is
concerned, the payload is just a stream of bytes. It's the user of IceRPC that knows how these payloads are encoded; a
typical user is the code generated by the Slice compiler.

Conversely, with Ice, requests and responses always specify the version of the Ice encoding used to encode their
payloads. When an Ice application decodes a request or response payload, it can rely on this information.

For compatibility with Ice, IceRPC always encodes 1.1 (on 2 bytes) as the Ice encoding version in encapsulations even
though IceRPC doesn't know anything about payload encoding. That's because:

- if this encapsulation is received by an Ice application, the only encoding supported by both Ice and IceRPC is the
Ice encoding version 1.1.
- if this encapsulation is received by an IceRPC application, this 1.1 version is ignored.

For the same reason, when IceRPC receives an encapsulation, it makes sure the encoding version in this encapsulation is
set to 1.1.

[ice-protocol]: https://docs.zeroc.com/ice/3.8/cpp/ice-protocol
[ice-slice]: https://docs.zeroc.com/ice/3.8/csharp/the-slice-language
[status-code]: ../invocation/incoming-response#status-code
[request-fields]: ../invocation/outgoing-request#request-field
