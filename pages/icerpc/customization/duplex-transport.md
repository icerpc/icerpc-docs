---
title: Duplex transport
description: Understand how to implement a duplex transport
---

## The duplex transport requirements

IceRPC requires a duplex transport to be a [connection-oriented] transport that supports the following features:
- [full-duplex] communication
- [flow-control]
- half-closure where each side of the connection can be closed independently
- abortive closure

## The duplex transport abstraction

Implementing a duplex transport consists of implementing the duplex transport abstraction provided from the IceRPC-core.

[connection-oriented]: https://en.wikipedia.org/wiki/Connection-oriented_communication
[full-duplex]: https://en.wikipedia.org/wiki/Duplex_(telecommunications)#Full_duplex
[flow-control]: https://en.wikipedia.org/wiki/Flow_control_(data)
