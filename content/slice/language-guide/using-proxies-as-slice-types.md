---
title: Using proxies as Slice types
description: Learn how to create a custom type to represent your proxy in Slice.
---

## Representing a proxy in Slice {% icerpcSlice=true %}

A proxy is a construct that allows you to call operations on a remote service using IceRPC. While proxies can be used
to call operations defined in Slice, they are not a construct or type in the Slice language itself.

In each programming language, a proxy encapsulates an [invocation pipeline] and a [service address].

If you want to transmit a proxy through a Slice operation, you define a custom type for this proxy. For example:

```slice
interface Widget {
    spin(speed: int32)
}

interface WidgetFactory {
    /// Creates a new {@link Widget} and returns a proxy to this new Widget.
    createWidget() -> WidgetProxy
}

// A proxy to a service that implements Widget; it's encoded as a string.
[cs::type("Example.WidgetProxy")]
custom WidgetProxy
```

```csharp
// Recipient

WidgetProxy widgetProxy = await widgetFactoryProxy.CreateWidgetAsync();
```

With this custom type, you get a typed API, and the decoding code sets the invoker and other options of the proxy
automatically (see below).

The custom type encodes a proxy as a string. This string is the URI of the proxy's service address, such as
`icerpc://widgets.example.com/widget/7`, or the percent-escaped path of a [relative proxy], such as
`/widget/my%20widget`.

When you define a custom type, you need to provide methods that encode and decode this type in each programming language
you want to support. See [Custom types] for details. As a convenience, the code generator always generates these encode
and decode methods for *Name*Proxy. This way, if you decide to create a custom type *Name*Proxy (where _Name_ is the
name of a Slice interface), you don't need to implement these methods. And that's exactly what we did in the example
above.

## Relative proxy {% icerpcSlice=true %}

A relative proxy is a proxy that identifies its target service by a path only. You cannot use a relative proxy to send
requests.

A typical use case is a server that returns a proxy to one of its own services without knowing how the client reaches
it: the server returns a relative proxy, and the client resolves it into a regular proxy that uses the same route as
the request.

## Decoding a proxy {% icerpcSlice=true %}

The decode method generated for *Name*Proxy decodes a string, and then creates a proxy from this string and a base
proxy. The base proxy is:

- the [base proxy] configured in the [ISliceFeature] of your [outgoing request features] or
  [incoming request features], or
- (client side) the proxy that sent the request, when no base proxy is configured

On the server side, there is no base proxy unless you configure one. A base proxy cannot be a relative proxy.

The decoded string is either a service address URI or a path, which starts with `/`:

| Decoded string      | With a base proxy                                                                            | Without a base proxy                     |
| ------------------- | -------------------------------------------------------------------------------------------- | ---------------------------------------- |
| Service address URI | A proxy with the decoded service address                                                     | A proxy with the decoded service address |
| Path                | A proxy with the service address of the base proxy, where the decoded path replaces the path | A relative proxy with the decoded path   |

A proxy created with a base proxy has the invoker and [SliceEncodeOptions] of the base proxy. A proxy created without a
base proxy has the [InvalidInvoker] (an invoker that always throws) and null `SliceEncodeOptions`.

[base proxy]: csharp:IceRpc.Slice.ISliceFeature#IceRpc_Slice_ISliceFeature_BaseProxy
[Custom types]: custom-types
[incoming request features]: /icerpc/dispatch/incoming-request#request-features
[invocation pipeline]: /icerpc/invocation/invocation-pipeline
[InvalidInvoker]: csharp:IceRpc.InvalidInvoker
[ISliceFeature]: csharp:IceRpc.Slice.ISliceFeature
[service address]: /icerpc/invocation/service-address
[outgoing request features]: /icerpc/invocation/outgoing-request#request-features
[relative proxy]: /slice/language-guide/using-proxies-as-slice-types#relative-proxy
[SliceEncodeOptions]: csharp:IceRpc.Slice.SliceEncodeOptions
