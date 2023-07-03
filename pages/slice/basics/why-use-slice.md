---
title: Why use Slice?
description: Understand the problem that Slice solves.
---

The [IceRPC core][icerpc-core] provides all you need to make RPCs. When you use just the core, the payload of your
requests and responses are streams of bytes, and you need to manually encode and decode any typed data (such as strings
and integers) in these streams. This is doable but laborious.

Slice builds on the core's byte-oriented API to offer you a higher-level API, with types. With Slice, you can easily
send a request with a string and an integer parameter and get back a response with a floating-point value. Slice allows
you to format the payloads of your requests and responses in a way that is meaningful for your application.

For example, you can describe the RPC `compute` with this Slice operation:

```slice
compute(message: string, count: int32) -> float64
```

The syntax is intuitive: it means the request's payload holds a string and a 32-bit integer, and when this RPC succeeds,
the response's payload holds a 64-bit (or double-precision) floating point number.

While Slice's primary mission is to encode and decode the payloads of your requests and responses by generating code, a
secondary mission is to offer you a convenient API for making and implementing RPCs. The Slice compiler generates this
convenient API in the programming language of your choice from your Slice definitions.

[icerpc-core]: ../../icerpc-core
