---
title: Proxy types
description: What does it mean to use an interface as a type in Slice?
---

## Using an interface as a type

Each time you define an [interface](interface) in Slice, you define a proxy type named after this interface. This proxy
type is a constructed type comparable to a struct. An instance of this type is a local object that represents a
(remote) service that implements this interface.

The exact meaning of a proxy depends on the RPC framework you're using. If you're using IceRPC, a proxy is a local
object that encapsulates an IceRPC [service address][service-address] and an [invocation pipeline][invocation-pipeline].

You can use this proxy type just like any other type in Slice; you can for instance define a return parameter with this
type:

```slice
interface Widget {
    spin(speed: int32)
}

interface WidgetFactory {
    createWidget(name: string) -> Widget
}
```

Here, `createWidget` returns a `Widget` proxy: a local representative for a remote service that implements the `Widget`
interface.

Returning a proxy type has the advantage of producing a typed API in the generated code. For example, in C# with IceRPC,
`createWidget` maps to:

```csharp
// Client-side mapping
Task<WidgetProxy> CreateWidgetAsync(
    string name,
    IFeatureCollections? features = null,
    CancellationToken cancellationToken = default);
```

When you call `CreateWidgetAsync`, you get back a `WidgetProxy` instead of a plain
[ServiceAddress][csharp-service-address], even though the only information transmitted over the wire with IceRPC is the
service address.

{% slice2 %}

## Relative proxy

{% callout %}
This section is specific to the IceRPC-Slice integration.
{% /callout %}

A relative proxy is a proxy that encapsulates a [relative service address][relative-service-address]. You cannot use a
relative proxy to send requests.

On the client side, when the generated code decodes a relative proxy from an incoming response payload, it produces a
regular proxy with:

- an absolute service address
- an invocation pipeline

This decoded proxy is a clone of the proxy you used to send the request, except for its path and type. The decoded
proxy's path is the path carried by the relative proxy. You can then use this decoded proxy to make invocations on the
remote service.

On the server side, when the generated code decodes a relative proxy from an incoming request payload, it produces a
relative proxy by default. You need convert this proxy into an absolute proxy before you can use it to make invocations.
{% /slice2 %}

## C# mapping

{% callout %}
This section is specific to the IceRPC-Slice integration.
{% /callout %}

Proxies are mapped to *Name*Proxy record structs in C#, as described on the [interface page](interface#c#-mapping).

When the generated code decodes a proxy from an incoming request payload, it produces by default a proxy with a null
invoker. You can change this default behavior by configuring a [proxy factory][proxy-factory] in the
[`ISliceFeature`][slice-feature] of your [incoming request features][incoming-request-features].

On the client side, when the generated code decodes a proxy from an incoming response payload, it gives this new proxy
the invoker and [`SliceEncodeOptions`][encode-options] of the proxy that sent the request. As a result, you can make
calls with this decoded proxy: it's ready to go.

[csharp-service-address]: csharp:IceRpc.ServiceAddress
[encode-options]: csharp:IceRpc.Slice.SliceEncodeOptions
<<<<<<< HEAD
[incoming-request-features]: ../../icerpc-core/dispatch/incoming-request#request-features
[invocation-pipeline]: ../../icerpc-core/invocation/invocation-pipeline
[proxy-factory]: csharp:IceRpc.Slice.ISliceFeature#IceRpc_Slice_ISliceFeature_ProxyFactory
[relative-service-address]: ../../icerpc-core/invocation/service-address#relative-service-address
[service-address]: ../../icerpc-core/invocation/service-address
=======
[incoming-request-features]: ../../icerpc/dispatch/incoming-request#request-features
[proxy-factory]: csharp:IceRpc.Slice.ISliceFeature#IceRpc_Slice_ISliceFeature_ProxyFactory
[relative-service-address]: ../../icerpc/invocation/service-address#relative-service-address
>>>>>>> 19f32cea376310452ecd42c1b244f23f730e01b8
[slice-feature]: csharp:IceRpc.Slice.ISliceFeature
