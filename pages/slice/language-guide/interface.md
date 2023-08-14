---
title: Interface
description: Learn how to define interfaces in Slice.
---

## The i in IDL

The ultimate goal of the Slice language is to define operations and their enclosing scopes, interfaces. All other Slice
constructs and statements merely support the definition of interfaces.

An interface specifies an abstraction—a group of abstract operations. A client application calls these operations while
a server application hosts a service that implements this interface.

For example:

```slice {% addMode=true %}
module VisitorCenter

// An interface with a single operation.
interface Greeter {
    greet(name: string) -> string
}
```

All operations are abstract at the Slice level: you can't implement an operation in Slice.

When you create an application with Slice, these interfaces correspond to your entry point into Slice: you call and
implement the C# (or Rust, Python...) abstractions and concrete implementations that the Slice compiler generates from
your Slice interfaces.

## Interface inheritance

An interface can inherit from one or more interfaces, provided the operation names of all these interfaces are unique.

For example:

```slice {% addMode=true %}
module Draw

interface Shape {
    rotate(degrees: int16)
}

interface Fillable {
    idempotent setFillColor(newColor: Color)
}

interface Rectangle : Shape, Fillable {
    idempotent resize(x: int32, y: int32)
}
```

## Interface as a user-define type

An interface definition produces a new user-defined type: a [proxy type](proxy-types).

## C# mapping {% icerpcSlice=true %}

The Slice compiler for C# compiles Slice interface _Name_ into two C# interfaces (I*Name* and I*Name*Service) and one
C# struct (*Name*Proxy). The identifiers of the generated interfaces and struct are always in Pascal case, per the usual
C# naming conventions, even when _Name_ is not in Pascal case.

The attribute [`cs::identifier`][cs-identifier] allows you to remap _Name_ to an identifier of your choice.

### I*Name*

Interface I*Name* provides the client-side API that allows you to call the remote service that implements the associated
Slice interface. It's a minimal interface with an abstract method for each operation defined in this interface.

For example:

{% side-by-side alignment="top" %}

```slice {% addMode=true %}
module Example

interface Widget {
    spin(speed: int32)
}
```

```csharp
namespace Example;

public partial interface IWidget
{
    // One method per operation
    Task SpinAsync(
        int speed,
        IFeatureCollection? features = null,
        CancellationToken cancellationToken = default);
}
```

{% /side-by-side %}

Slice interface inheritance naturally maps to interface inheritance in C#. For example:

```slice {% addMode=true %}
module Draw

interface Rectangle : Shape, Fillable {
    idempotent resize(x: int32, y: int32)
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

### *Name*Proxy

The generated record struct *Name*Proxy implements I*Name* by sending requests to a remote service with IceRPC.

An instance of this struct is a local surrogate for the remote service that implements _Name_--in other words, a proxy
for this service.

In order to call a remote service, you need to construct a proxy struct using one of its "invoker" constructors:

```csharp
public readonly partial record struct WidgetProxy : IWidget, IProxy
{
    public WidgetProxy(
        IInvoker invoker,
        ServiceAddress? serviceAddress = null,
        SliceEncodeOptions? encodeOptions = null)
    {
        ...
    }

    public WidgetProxy(
        IInvoker invoker,
        System.Uri serviceAddressUri,
        SliceEncodeOptions? encodeOptions = null)
        : this(invoker, new ServiceAddress(serviceAddressUri), encodeOptions)
    {
    }
}
```

The `invoker` parameter represents your [invocation pipeline](/icerpc/invocation/invocation-pipeline), the
`serviceAddress` or `serviceAddressUri` parameter corresponds to the
[address](/icerpc/invocation/service-address) of the remote service, and the `encodeOptions` parameter allows
you to customize the Slice encoding of operation parameters. See
[SliceEncodeOptions] for details.

A `null` service address is equivalent to an icerpc service address with the default path of the associated Slice
interface.

{% callout type="information" %}
The default path of a Slice interface is `/` followed by its fully qualified name with `::` replaced by `.`.

For example, the default path of Slice interface `VisitorCenter::Greeter` is `/VisitorCenter.Greeter`.
{% /callout %}

{% slice2 %}
If you want to create a [relative proxy](proxy-types#relative-proxy), call the `FromPath` static method:

```csharp
public readonly partial record struct WidgetProxy : IWidget, IProxy
{
    public static WidgetProxy FromPath(string path) { ... }
}
```

The proxy struct also provides a parameterless constructor that creates a relative proxy with the default path.
{% /slice2 %}

When a Slice interface derives from another interface, its proxy struct provides an implicit conversion operator to be
base interface. For example:

```slice {% addMode=true %}
module Draw

interface Rectangle : Shape, Fillable {
    idempotent resize(x: int32, y: int32)
}
```

maps to:

```csharp
namespace Draw;

public readonly partial record struct RectangleProxy : IRectangle, IProxy
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
```

This way, you can pass a "derived" proxy to a method that expects a "base" proxy, even though there is naturally no
inheritance relationship between these proxy structs.

### I*Name*Service

Interface I*Name*Service is a server-side helper: it helps you create a service (a C# class) that implements Slice
interface _Name_.

The principle is straightforward: your service class must derive from class [`Service`](csharp:IceRpc.Slice.Service) and
must implement interface I*Name*Service. This generated Service interface defines an abstract method for each operation
on the Slice interface and you need to implement all these abstract methods.

For example:

{% side-by-side alignment="top" %}

```slice {% addMode=true %}
module Example

interface Widget {
    spin(speed: int32)
}
```

```csharp
namespace Example;

public partial interface IWidgetService
{
    // One method per operation
    ValueTask SpinAsync(
        int speed,
        IFeatureCollection features,
        CancellationToken cancellationToken);
}
```

{% /side-by-side %}

{% callout type="information" %}
Even though I*Name*Service is an interface, it's not used as an abstraction: you shouldn't make calls to this interface
or create decorators for this interface. It's just a model that your service class must implement.
{% /callout %}

Note that the same service class can implement any number of Slice interfaces provided their operations have unique
names. For example:

{% side-by-side alignment="top" %}

```slice {% addMode=true %}
module Example

interface Widget {
    spin(speed: int32)
}

interface Counter {
    getCount() -> int32
}
```

```csharp
// A service class that implements 2 Slice interfaces
internal class MyWidget :
    Service,
    IWidgetService,
    ICounterService
{
    // implements SpinAsync and GetCountAsync.
}
```

{% /side-by-side %}

[cs-identifier]: attributes#cs::identifier-attribute
[SliceEncodeOptions]: csharp:IceRpc.Slice.SliceEncodeOptions
