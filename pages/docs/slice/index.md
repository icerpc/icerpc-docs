---
title: Overview
description: An introduction to Slice
---

Slice is the IDL (Interface Definition Language) used by IceRPC. The Slice language allows you to define the contract
to which clients and servers agree. You use Slice to define this contract in a platform-agnostic way.

The Slice language has been specifically designed for defining RPC-based services. You define your service's
operations using Slice. Slice is also used to define these operations' parameters and return values.

The Slice compiler takes Slice definitions as inputs and generates code in the target programming language. Your client and
server applications use the generated code to communicate using the operations and types defined in the Slice definitions.

The Slice language mapping defines how the different Slice language constructions are represented in a programming language.
The Slice encoding defines how these constructions are encoded into a stream of bytes that can be sent over the network.
