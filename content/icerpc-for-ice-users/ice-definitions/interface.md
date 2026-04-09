---
title: Interface
description: Learn how Ice interfaces are mapped to C#
---

The Ice compiler for C# compiles Ice interface _Name_ into two C# interfaces (I*Name* and I*Name*Service) and one
C# struct (*Name*Proxy). The identifiers of the generated interfaces and struct are always in Pascal case, per the usual
C# naming conventions, even when _Name_ is not in Pascal case.

The metadata directive [`"cs:identifier"`][cs-identifier] allows you to remap _Name_ to an identifier of your choice.

## I*Name* interface

Interface I*Name* provides the client-side API that allows you to call the remote service that implements the associated
Ice interface. It's a minimal interface with an abstract method for each operation defined in this interface.

For example:

{% aside alignment="top" %}

```ice
module Example
{
    interface Widget
    {
        void spin(int speed);
    }
}
```

```csharp
namespace Example
{
    public partial interface IWidget
    {
        // One method per operation
        Task SpinAsync(
            int speed,
            IFeatureCollection? features = null,
            CancellationToken cancellationToken =
                default);
    }
}
```

{% /aside %}

Ice interface inheritance naturally maps to interface inheritance in C#. For example:

```ice
module Draw
{
    interface Rectangle extends Shape, Fillable
    {
        idempotent void resize(int x, int y);
    }
}
```

maps to:

```csharp
namespace Draw;

public partial interface IRectangle : IShape, IFillable
{
    Task ResizeAsync(
        int x,
        int y,
        IFeatureCollection? features = null,
        CancellationToken cancellationToken = default);
}
```

## *Name*Proxy struct

The generated record struct *Name*Proxy implements I*Name* by sending requests to a remote service with IceRPC.

An instance of this struct is a local surrogate for the remote service that implements _Name_—in other words, a proxy
for this service.

In order to call a remote service, you need to construct a proxy struct using one of its "invoker" constructors:

```csharp
public readonly partial record struct WidgetProxy : IWidget, IIceProxy
{
    public WidgetProxy(
        IInvoker invoker,
        ServiceAddress? serviceAddress = null,
        IceEncodeOptions? encodeOptions = null)
    {
        ...
    }

    public WidgetProxy(
        IInvoker invoker,
        System.Uri serviceAddressUri,
        IceEncodeOptions? encodeOptions = null)
        : this(invoker, new ServiceAddress(serviceAddressUri), encodeOptions)
    {
    }
}
```

The `invoker` parameter represents your [invocation pipeline](/icerpc/invocation/invocation-pipeline), the
`serviceAddress` or `serviceAddressUri` parameter corresponds to the
[address](/icerpc/invocation/service-address) of the remote service, and the `encodeOptions` parameter allows
you to customize the encoding of operation parameters. See [IceEncodeOptions] for details.

A `null` service address is equivalent to a service address for the ice protocol with the default service path of the
associated Ice interface.

The default service path of an Ice interface is `/` followed by its fully qualified name with `::` replaced by `.`. For
example, the default service path of Ice interface `VisitorCenter::Greeter` is `/VisitorCenter.Greeter`. It's also
available as the constant `DefaultServicePath` in the generated proxy struct:

```csharp
public readonly partial record struct WidgetProxy : IWidget, IIceProxy
{
    public const string DefaultServicePath = "/Example.Widget";
}
```

The generated proxy struct also provides a parameterless constructor that initializes the proxy's service address to
an ice-protocol service address with the default service path. If you call this constructor directly, you also need to
initialize the invoker, for example:

```csharp
// Calls WidgetProxy's parameterless constructor
var proxy = new WidgetProxy { Invoker = connection };

// The above is equivalent to:
var proxy = new WidgetProxy(connection);
```

When an Ice interface derives from another interface, its proxy struct provides an implicit conversion operator to the
base interface. For example:

```ice
module Draw
{
    interface Rectangle extends Shape, Fillable
    {
        idempotent void resize(int x, int y);
    }
}
```

maps to:

```csharp
namespace Draw
{
    public readonly partial record struct RectangleProxy : IRectangle, IIceProxy
    {
        public static implicit operator ShapeProxy(RectangleProxy proxy)
        {
            ...
        }

        public static implicit operator FillableProxy(RectangleProxy proxy)
        {
            ...
        }
    }
}
```

This way, you can pass a "derived" proxy to a method that expects a "base" proxy, even though there is naturally no
inheritance relationship between these proxy structs.

## I*Name*Service interface

Interface I*Name*Service is a server-side helper: it helps you create a service (a C# class) that implements Ice
interface _Name_.

The principle is straightforward: your service class must be a partial class that implements I*Name*Service. It must
also carry the [Service] attribute.

The `Service` attribute instructs the Service Generator to implement interface [IDispatcher] by directing incoming
requests to I*Name*Service methods based on the operation names.

The Service Generator is a [C# source generator] provided by the [IceRpc.ServiceGenerator] NuGet package.

For example:

{% aside alignment="top" %}

```ice
module Example
{
    interface Widget
    {
        void spin(int speed);
    }
}
```

```csharp
namespace Example
{
    // Generated code
    public partial interface IWidgetService
    {
        // One method per operation
        ValueTask SpinAsync(
            int speed,
            IFeatureCollection features,
            CancellationToken cancellationToken);
    }

    // Application code
    [Service]
    internal partial class MyWidget : IWidgetService
    {
        // implement SpinAsync ...
    }
}
```

{% /aside %}

{% callout type="note" %}
Even though I*Name*Service is an interface, it's not used as an abstraction: you shouldn't make calls to this interface
or create decorators for this interface. It's just a model that your service class must implement.
{% /callout %}

Note that the same service class can implement any number of Ice interfaces provided their operations have unique
names. You can even mix Ice, Slice, and Protobuf. For example:

{% aside alignment="top" %}

```ice
module Example
{
    interface Widget
    {
        void spin(int speed);
    }

    interface Counter
    {
        int getCount();
    }
}
```

```csharp
// Implements two Ice interfaces
[Service]
internal partial class MyWidget : IWidgetService,
                                  ICounterService
{
    // implements SpinAsync and GetCountAsync.
}
```

{% /aside %}

[C# source generator]: https://learn.microsoft.com/en-us/dotnet/csharp/roslyn-sdk/#source-generators
[cs-identifier]: https://docs.zeroc.com/ice/3.8/csharp/slice-metadata-directives#SliceMetadataDirectives-cs:identifier:csharp-identifier
[IceEncodeOptions]: csharp:IceRpc.Ice.IceEncodeOptions
[IceRpc.ServiceGenerator]: https://www.nuget.org/packages/IceRpc.ServiceGenerator
[IDispatcher]: csharp:IceRpc.IDispatcher
[Service]: csharp:IceRpc.ServiceAttribute
