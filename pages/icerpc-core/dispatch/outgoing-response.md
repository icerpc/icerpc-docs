---
title: Outgoing response
description: Learn how to create outgoing responses.
---

## Creating an outgoing response

The `dispatch` method of a [dispatcher](dispatch-pipeline#the-dispatcher-abstraction) returns an outgoing response
asynchronously. Since you're implementing this `dispatch` method, you are responsible to create this outgoing response.

An outgoing response carries:

- a [status code](../invocation/incoming-response#status-code)
- an error message, set only when the status code is not `Success`
- response [fields](../invocation/incoming-response#response-fields)
- the [payload](#response-payload) of the response

## Response payload

The payload of a response is a stream of bytes that represents the return value of an operation. The caller (the
connection that dispatched the incoming request) reads and logically copies these bytes to the network connection until
there is no more byte to read.

In C#, the payload of an outgoing response is split in a payload and a payload continuation, just like the payload
of an [outgoing request](../invocation/outgoing-request). This split makes the [Slice encoding][slice-encoding] more
convenient and efficient, but is otherwise unnecessary. An outgoing response payload is conceptually one continuous
stream of bytes.

[slice-encoding]: ../../slice/encoding/main-features
