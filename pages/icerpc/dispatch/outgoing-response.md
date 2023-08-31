---
title: Outgoing response
description: Learn how to create outgoing responses.
---

## Creating an outgoing response

A [dispatcher](dispatch-pipeline#the-dispatcher-abstraction) returns an outgoing response asynchronously. Since you're
implementing this dispatcher, you are responsible to create this outgoing response.

An outgoing response carries:

- a [status code]
- an error message, set only when the status code is not `Ok`
- response [fields]
- the [payload](#response-payload) of the response

## Response payload

The payload of a response is a stream of bytes that represents the return value of an operation. The caller (the
connection that dispatched the incoming request) reads and logically copies these bytes to the network connection until
there is no more byte to read.

In C#, the payload of an outgoing response is split in a payload and a payload continuation, just like the payload of an
[outgoing request]. This split makes the encoding of a response payload more convenient and efficient for the [Slice]
generated code, but is otherwise unnecessary. An outgoing response payload is conceptually one continuous stream of bytes.

[fields]: ../invocation/incoming-response#response-fields
[outgoing request]: ../invocation/outgoing-request
[status code]: ../invocation/incoming-response#status-code
[Slice]: /slice
