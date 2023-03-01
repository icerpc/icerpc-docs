---
title: Why use Slice?
description: Understand the problem that Slice solves.
---

{% title /%}

The IceRPC core provides all you need to make RPCs. When you use just the core, the payload of your requests and
responses are streams of bytes, and you need to manually encode and decode any typed data (such as strings and integers)
in these streams. This is doable but laborious.

Slice builds on the core's byte-oriented API to offer you a higher-level API, with types. With Slice, you can easily
send a request with a string and an int32 parameter and get back a response with a double return value. Slice allows you
to format the payloads of your requests and responses in a way that is meaningful for your application.

For example, you can describe the RPC `op` in Slice as follows:

```slice
op(message: string, count: int32) -> double
```

The syntax is intuitive: it means the request's payload holds a string and an int32, and when this RPC succeeds, the
response's payload holds a double.

While Slice's primary mission is to format the payloads of your requests and responses by generating code, a secondary
mission is to offer you a more convenient API for making and implementing RPCs. As illustrated by the [Hello]() and
[HelloCore]() examples, you need to write much less code with Slice.
