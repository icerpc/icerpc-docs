---
title: Framework and language
description: Understand what Slice is about.
---

{% title /%}

## The Slice framework and language

You can easily make RPCs using the IceRPC core and skip this entire chapter. With the IceRPC core API, the payload of
your requests and responses are streams of bytes, and you can manually encode and decode any data in these streams.

Slice builds on the core's byte-oriented API to offer you a higher-level API, with types. With Slice, you can easily
send a request with a string and an int32 parameter and get back a response with a double return value. Slice allows you
to format the payloads of your requests and responses in a way that is meaningful for your application.

Slice is both a framework, with APIs to encode and decode strings, int32, double and more, and a language to describe
RPCs.

For example, you can describe the RPC `op` as follows:
```slice
op(message: string, count: int32) -> double
```

The syntax is intuitive: it means the request's payload holds a string and an int32, and when this RPC succeeds, the
response's payload holds a double.

## An IDL for IceRPC

Slice-the-language is purely about defining RPCs. It's a simple language without any execution logic: no if, no while,
no print. Its focus is specifying the exact format of the payloads of your requests and responses.

This type of language is called an
[Interface Definition Language](https://en.wikipedia.org/wiki/Interface_description_language) or IDL, and Slice is
indeed about defining interfaces.

In Slice, a RPC corresponds to an operation (such as `op` earlier), and an operation can only be defined inside a Slice
interface. In the example below, interface `Greeter` defines two operations, `sayHello` and `sayGoodbye`:
```slice
interface Greeter {
    sayHello(to: string) -> string
    sayGoodbye(to: string) -> string
}
```

Slice is bundled with IceRPC and is naturally IceRPC's preferred IDL. Nevertheless, you don't have to use Slice when
you use IceRPC: you can use IceRPC core's byte-oriented API without Slice, or you can use another IDL together with the
IceRPC core.

## Slice compiler and language mapping

TBD

## Contract first model

TBD
