---
title: Choosing between Slice and Protobuf
description: Learn why you need an IDL and which IDL makes the most sense for you.
---

## What are Slice and Protobuf?

IceRPC is at its core a byte-oriented RPC framework: it allows you to easily send requests that carry bytes and receive
responses that carry more bytes.

This byte-centric architecture and API is exactly what you want if you are moving bytes around. However, it's not
particularly convenient if you want to define a typed network API for your RPC services.

In the context of RPCs, it is very common to use an [Interface Definition Language] (IDL) to specify your RPCs. These
definitions are also known as the "contract" between your client and your server.

A code generator then produces code from these definitions. This generated code:

- provides a typed API in the programming language of your choice
- implements this API by encoding/decoding typed data (integers, strings, structs, etc.) into and from stream of bytes
in a well-defined format

With an IDL, you don't need to worry about encoding and decoding data structures into and from a portable binary format:
it's all handled by the generated code and its supporting libraries.

IceRPC includes full support for two IDLs and their associated encoding format: [Slice] and [Protobuf].

Most applications using IceRPC also use either Slice or Protobuf. Let's figure out which one you should pick!

## Slice

Slice is modern IDL and encoding format that was developed in tandem with IceRPC. It takes full advantage of all IceRPC
features and is very compact, both in terms of code size and bandwidth usage.

For example, IceRPC supports one-way RPCs (fire and forget with no response), and Slice provides one-way operations that
map to these one-way RPCs. On the other hand, a Protobuf RPC method always returns a response; as a result, you can't
send a one-way RPC using Protobuf.

You could see Slice as the default IDL for IceRPC: use Slice unless you have a compelling reason to go with Protobuf.

## Protobuf

Protobuf (or Protocol Buffers) is a widely used IDL and encoding format created by Google. It has become the "lingua
franca" for binary messages transmitted by Web applications.

If you are already familiar with Protobuf or your application interacts with other applications that consume or send
Protobuf messages, you should use IceRPC together with Protobuf.

[Interface Definition Language]: https://en.wikipedia.org/wiki/Interface_description_language
[Protobuf]: https://en.wikipedia.org/wiki/Protocol_Buffers
[Slice]: ../slice
