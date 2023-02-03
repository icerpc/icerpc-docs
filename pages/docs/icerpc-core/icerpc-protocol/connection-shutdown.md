---
title: Connection shutdown
description: Understand connection shutdown with icerpc.
---

{% title /%}

## What's a connection shutdown?

A shutdown is a graceful closure of a connection. Each side wants to maximize the chances that outstanding requests
complete successfully. During shutdown, each side tells the other side which requests it guarantees to not accept.

## Shutdown steps

When a client or server wants to shutdown a connection, it proceeds as follows:

1. Stop sending new requests (creating new streams) to the peer, and stop accepting new requests (accepting new streams)
from the peer.

2. Send a GoAway frame to the peer over its control stream:

The GoAway frame contains 2 stream IDs:
 - `bidirectionalStreamId`: any bidirectional stream ID greater than or equal to this ID will not be accepted by the
 sender
 - `unidirectionalStreamId`: any unidirectional stream ID greater than or equal to this ID will not be accepted by the
 sender

This way, the peer can identify the outstanding requests it has sent (or is sending) and cancel these requests: they
won't be accepted so it's pointless to let them continue. It's also safe to resend these requests over another
connection, if possible.

Outstanding requests with lower stream IDs were accepted and the connection shutdown lets them proceed unimpeded.

The GoAway frame is all about the requests (streams) that the GoAway sender accepts. It says nothing about the requests
sent or being sent by the GoAway sender.

3. Wait to receive the peer's GoAway frame over the control stream created by the peer, and then cancel any outstanding
requests that the peer won't accept.

4. Wait for all local stream activity to complete (control streams aside).

5. Close its control stream (the control stream created by the local application). This tells the peer: "all done on
my side, you can close the connection".

6. Wait for the peer to close its control stream, which means it's done (see above).

7. Close the transport connection with the 0 (success) error code.
This step can fail because the peer closed the transport connection first with error code 0. This remains a successful
shutdown.

## GoAway frame

The GoAway frame is specified in Slice (LINK) and encoded with Slice2:
```slice
enum ControlFrameType : uint8
{
    Settings = 0,
    GoAway = 1,
}

compact struct GoAwayFrame
{
    type: ControlFrameType,            // value is ControlFrameType::GoAway
    bodySize: varuint62,               // the number of bytes in the remainder of the frame (between 2 and 16)
    bidirectionalStreamId: varuint62,
    unidirectionalStreamId: varuint62
}
```
