---
title: Proxy types
description: Learn how to transmit proxies using Slice.
---

## Typed service address

Each time you define an [interface](interface) in Slice, you also define a proxy type named after this interface. This
proxy type is a constructed type comparable to a [struct](struct-types). It represents the address of a (remote) service
that implements this interface.

Conceptually, you can think of:

```slice
interface Widget { ... }
```

as a shortcut for:

```slice
// The contract between my client and server applications.
interface Widget { ... }

// The associated proxy type.
compact struct Widget { address: WellKnownType::ServiceAddress }
```

You can use this proxy type just like any other type; you can for instance define a return parameter with this type:

```slice
interface Widget {
    spin(speed: int32)
}

interface WidgetFactory {
    createWidget(name: string) -> Widget
}
```

Here, `createWidget` returns a `Widget` proxy: the address of a service that implements the `Widget` interface.

Returning a proxy type has the advantage of producing a typed API in the mapped APIs. For example, in C#, `createWidget`
maps to:

```csharp
// Client-side mapping
Task<WidgetProxy> CreateWidgetAsync(
    string name,
    IFeatureCollections? features = null,
    CancellationToken cancellationToken = default);
```

When you call `CreateWidgetAsync`, you get back a `WidgetProxy` instead of a plain
[ServiceAddress][csharp-service-address], even though the only information transmitted over the wire is the service
address.

{% slice2 %}
## Relative proxy

A relative proxy is a proxy that encapsulates a [relative service address][relative-service-address]. You cannot use a
relative proxy to send requests.

When the generated code decodes a relative proxy from an incoming request payload, it produces a relative proxy by
default. You need convert this proxy into a regular proxy before you can use it to make invocations. A regular proxy
has:
 - a service address with a protocol
 - an invocation pipeline

On the client side, when the generated code decodes a relative proxy from an incoming response payload, it produces a
regular proxy. This decoded proxy is a clone of the proxy you used to send the request, except for its path and type.
The decoded proxy's path is the path carried by the relative proxy.

This decoded proxy is ready to go: you can use it immediately make invocations on the remote service.
{% /slice2 %}

## C# mapping

Proxies are mapped to *Name*Proxy record structs in C#, as described on the [interface page](interface#c#-mapping).

When the generated code decodes a proxy from an incoming request payload, it produces by default a proxy with a null
invoker. You can change this default behavior by configuring a [proxy factory][proxy-factory] in the
[`ISliceFeature`][slice-feature] of your [incoming request features][incoming-request-features].

On the client side, when the generated code decodes a proxy from an incoming response payload, it gives this new proxy
the invoker and [`SliceEncodeOptions`][encode-options] of the proxy that sent the request. As a result, you can make
calls with this decoded proxy: it's all ready to go.

[csharp-service-address]: csharp:IceRpc.ServiceAddress
[encode-options]: csharp:IceRpc.Slice.SliceEncodeOptions
[incoming-request-features]: ../../icerpc-core/dispatch/incoming-request#request-features
[proxy-factory]: csharp:IceRpc.Slice.ISliceFeature#IceRpc_Slice_ISliceFeature_ProxyFactory
[relative-service-address]: ../../icerpc-core/invocation/service-address#relative-service-address
[slice-feature]: csharp:IceRpc.Slice.ISliceFeature
