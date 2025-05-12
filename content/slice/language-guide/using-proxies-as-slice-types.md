---
title: Using proxies as Slice types.
description: Learn how to a create custom type to represent your proxy in Slice.
---

## Transmitting a proxy as a service address {% icerpcSlice=true %}

A proxy is a Slice language-mapping construct that allows you to call operations on a remote service using IceRPC. A
proxy is not a construct or type in the Slice language itself.

In each programming language, a proxy encapsulates an [invocation pipeline] and a [service address].

If you want to transmit a proxy through a Slice operation, you can easily transmit its service address using the
built-in custom type `IceRpc::ServiceAddress`:

```slice
mode = Slice1

[cs::namespace("IceRpc.Slice")]
module IceRpc

/// Represents the address of an RPC service that can be called using ice or icerpc. This custom type is
/// compatible with both Slice1 and Slice2.
[cs::type("IceRpc.ServiceAddress")]
custom ServiceAddress
```

The recipient can then decode this service address and use it to create a proxy with the correct type. It can also set
a suitable invoker and other options. For example:

```slice
interface Widget {
    spin(speed: int32)
}

interface WidgetFactory {
    /// Creates a new @Widget and returns its service address.
    createWidget() -> IceRpc::ServiceAddress
}
```

```csharp
// Recipient

ServiceAddress serviceAddress = await widgetFactoryProxy.CreateWidgetAsync();

// Create new Widget proxy. We keep the invoker and encode options of the factory proxy.
var widgetProxy = new WidgetProxy(
    widgetFactoryProxy.Invoker,
    serviceAddress,
    widgetFactoryProxy.EncodeOptions);
```

## Representing a proxy in Slice {% icerpcSlice=true %}

Transmitting a service address in Slice works well but results in a fairly untyped API both in Slice and in the mapped
programming languages.

A solution is to wrap the service address in a custom Slice type. This allows us to rewrite the example above as
follows:

```slice
interface Widget {
    spin(speed: int32)
}

interface WidgetFactory {
    /// Creates a new @Widget and returns a proxy to this new Widget.
    createWidget() -> WidgetProxy
}

// A proxy to a service that implements Widget; it's encoded as a service address.
[cs::type("Example.WidgetProxy")]
custom WidgetProxy
```

```csharp
// Recipient

WidgetProxy widgetProxy = await widgetFactoryProxy.CreateWidgetAsync();
```

The advantage with this custom proxy approach is we get a typed API and the invoker and other options can be set
automatically by the decoding code (see below).

When you define a custom type, you need to provide methods that encode and decode this type in each programming language
you want to support. See [Custom types] for details. As a convenience, the Slice compiler always generates these encode
and decode methods for *Name*Proxy. This way, if you decide to create a custom type *Name*Proxy (where *Name* is the
name of a Slice interface), you don't need to implement these methods. And that's exactly what we did in the example
above.

## Decoding a service address into a proxy {% icerpcSlice=true %}

The decode method generated for *Name*Proxy decodes a service address and then creates:

- on the client side, a proxy with the invoker and [SliceEncodeOptions] of the proxy that sent the request
- on the server side, a proxy with a null invoker and null `SliceEncodeOptions`

You can override this default behavior by configuring a [base proxy] in the [ISliceFeature] of your
[outgoing request features] or [incoming request features].

{% slice2 %}

## Relative proxy {% icerpcSlice=true %}

A relative proxy is a proxy that encapsulates a [relative service address]. You cannot use a relative proxy to send requests.

A relative service address is converted into a regular service address with the help of a base service address. This
base service address can be any absolute service address. The resulting service address is simply the base service
address with its path replaced by the path of the relative service address.

When the decode method generated for *Name*Proxy decodes a relative service address, it uses as base service address:

- the service address of the configured [base proxy] unless it's null or relative, or
- (client side) the service address of the proxy that sent the request

The decode method returns a relative proxy when there is no base service address to resolve the relative service
address.

{% /slice2 %}

[base proxy]: csharp:IceRpc.Slice.ISliceFeature#IceRpc_Slice_ISliceFeature_BaseProxy
[Custom types]: custom-types
[incoming request features]: /icerpc/dispatch/incoming-request#request-features
[invocation pipeline]: /icerpc/invocation/invocation-pipeline
[ISliceFeature]: csharp:IceRpc.Slice.ISliceFeature
[relative service address]: /icerpc/invocation/service-address#relative-service-address
[service address]: /icerpc/invocation/service-address
[outgoing request features]: /icerpc/invocation/outgoing-request#request-features
[SliceEncodeOptions]: csharp:IceRpc.Slice.SliceEncodeOptions
