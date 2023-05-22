---
title: Proxy types
description: Understand what proxy parameters and fields represent.
---

## Typed service address

It is fairly common to send a service address through a Slice operation, or return a service address from a Slice
operation. For example:

```slice {% addEncoding=true %}
interface Widget {
    spin(speed: int32)
}

interface WidgetFactory {
    createWidget(name: string) -> Widget
}
```

The WidgetFactory does not return a full-blown widget, but the address of the service it just created. This service can
be hosted on the same server as the widget factory or in a different server--we can't tell from the Slice definitions.

We describe this situation as `createWidget` returns a `Widget` proxy. This widget proxy is encoded/decoded as a service
address and nothing else; in particular, no type information is sent "over the wire".

Naturally, we expect there is a service at this service address and that this service implements Slice interface
`Widget`: that's what the widget factory promised us.

Returning a proxy (interface) type has the advantage of producing a typed API in the language mappings. For example,
in C#, `createWidget` maps to:

```csharp
// Client-side mapping
Task<WidgetProxy> CreateWidgetAsync(
    string name,
    IFeatureCollections? features = null,
    CancellationToken cancellationToken = default);
```

When you call `CreateWidgetAsync`, you get back a `WidgetProxy` instead of a plain
[ServiceAddress](csharp:IceRpc.ServiceAddress), even though the only information transmitted over the wire is the
service address.

{% slice2 %}
## Relative proxy

A relative proxy is a proxy that encapsulates a [relative service address](../../icerpc-core/invocation/service-address#relative-service-address). You cannot use a relative proxy to send requests.

When the Slice engine decodes a relative proxy from an incoming request payload, it produces a relative proxy by
default. You need to transform this proxy before you can use it to make requests.

On the client side, when the Slice engine decodes a relative proxy from an incoming response payload, it produces a
non-relative proxy. This decoded proxy is a clone of the proxy you used to send the request, except for its path and
type. The decoded proxy's path is the path carried by the relative proxy.

In other words, this decoded proxy is ready to go. You don't need to transform it further before making calls with this
proxy.
{% /slice2 %}

## C# mapping

Proxies are mapped to *Name*Proxy structs in C#, as described on the [interface page](interface#c-mapping).

When the Slice engine decodes a proxy from an incoming request payload, it produces by default a proxy with a null
invoker. You can change this default behavior by configuring a
[proxy factory](csharp:IceRpc.Slice.ISliceFeature.html#IceRpc_Slice_ISliceFeature_ProxyFactory) in the `ISliceFeature`
of your [incoming request features](../../icerpc-core/dispatch/incoming-request#request-features).

On the client side, when the Slice engine decodes a proxy from an incoming response payload, it gives this new proxy the
invoker and [SliceEncodeOptions](csharp:IceRpc.Slice.SliceEncodeOptions) of the proxy that sent the request. As a
result, you can make calls with this decoded proxy: it's all ready to go.
