---
title: Operation return value and exception
description: Learn how an operation's return value and exception is encoded with Slice.
---

{% title /%}

## Status code

The status code of a response determines the contents of the response payload. When the status code is `Success`,
the payload contains the encoded return value. When the status code is `ApplicationError`, the payload contains the
encoded Slice exception thrown by the implementation of the operation. For all other status codes, the payload is
usually empty and the Slice engine does not attempt to decode this payload.

TBD
