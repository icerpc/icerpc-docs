---
title: Ice::Object and checked cast
description: Understand how to provide interoperable services with IceRPC + Slice.
---

## The Ice::Object interface

With Ice, all Slice interfaces implicitly derive from the `Ice::Object` interface, which provides four operations:
`ice_id`, `ice_ids`, `ice_ping` and `ice_isA`.

The generated code implements these operations automatically. As an application developer using Ice, you typically don't
think about these built-in operations.

With IceRPC, a Slice interface does not have any implicit base interface, and `Ice::Object` is just a regular interface:

```slice
mode = Slice1

[cs::namespace("IceRpc.Slice.Ice")]
module Ice

/// Provides 3 ice_ operations. Services implemented with Ice or that offer compatibility with Ice implement this
/// interface.
[cs::identifier("IceObject")]
interface Object {
    /// Gets the Slice type IDs of all the interfaces implemented by the target service.
    /// @returns: The Slice type IDs of all these interfaces, sorted alphabetically.
    idempotent ice_ids() -> Sequence<string>

    /// Tests whether the target service implements the specified interface.
    /// @param id: The Slice type ID of the interface to test against.
    /// @returns: True when the target service implements this interface; otherwise, false.
    idempotent ice_isA(id: string) -> bool

    /// Pings the service.
    idempotent ice_ping()
}
```

{% callout %}
IceRPC does not provide the fourth operation, `ice_id`. With IceRPC + Slice, a service can implement multiple Slice
interfaces and does not always have a single most-derived Slice interface / type ID.
{% /callout %}

When you implement a service with IceRPC + Slice, you decide if you want to implement this interface.

In C#, you implement `Ice::Object` like any other interface, except you don't need to actually implement any of the
mapped interface methods. The IceRPC + Slice integration provides a default implementation for all these methods.
For example:

```csharp
using IceRpc.Features;
using IceRpc.Slice; // for SliceService
using IceRpc.Slice.Ice; // for IIceObjectService (Slice Ice::Object)

[SliceService]
internal partial class HelloService : IHelloService, IIceObjectService
{
    // IIceObjectService provides default implementations for all the ice_ operations.

    public ValueTask SayHelloAsync(IFeatureCollection features, CancellationToken cancellationToken)
    {
        ...
    }
}
```

## Checked cast

With Ice, you can call built-in `Ice::Object` operations using any proxy, but it is unusual to do so. There is however
one hidden exception: `ice_isA`.

The Ice client demos, including the most basic Minimal demo, all start with a call to `checkedCast`.

`checkedCast` is a helper method that calls the `ice_isA` operation on the proxy being "checked cast": it asks the
target service (Ice object with Ice's terminology) if it implements a specific Slice interface. While this check is
unnecessary (`uncheckedCast` works just as well), it's shown by all Ice demos and is therefore very common.

The net result is: if you reimplement an existing Ice server with IceRPC, your services need to implement `Ice::Object`
when they are being "checked cast" by existing Ice client applications.

## Checked cast and unchecked cast in IceRPC for C\#

If you like `checkedCast` and want to keep check-casting your proxies, the IceRPC + Slice integration provides an
equivalent API: [AsAsync]. The target service must implement `Ice::Object`; otherwise, `AsAsync` will fail with a
[DispatchException] with status code [NotImplemented].

There is no need for an `uncheckedCast` API in IceRPC + Slice, because you can construct a proxy directly with its
constructor. For example:

{% aside %}

```csharp {% title="Ice client in C#" %}
using var communicator = Ice.Util.initialize(ref args);

ObjectPrx proxy = communicator.stringToProxy(
    "hello:default -h localhost -p 10000");
HelloPrx helloProxy =
    HelloPrxHelper.uncheckedCast(proxy);
helloProxy.sayHello();
```

```csharp {% title="IceRPC + Slice client in C#" %}
await using var connection = new ClientConnection(
    new Uri("ice://localhost:10000"));

var helloProxy = new HelloProxy(
    connection,
    new Uri("ice:/hello"));

await helloProxy.SayHelloAsync();
```

{% /aside %}

[AsAsync]: csharp:IceRpc.Slice.Ice.ProxyExtensions#IceRpc_Slice_Ice_ProxyExtensions_AsAsync__1_IceRpc_Slice_IProxy_IceRpc_Features_IFeatureCollection_System_Threading_CancellationToken_
[DispatchException]:  csharp:IceRpc.DispatchException
[NotImplemented]:  csharp:IceRpc.StatusCode#NotImplemented
