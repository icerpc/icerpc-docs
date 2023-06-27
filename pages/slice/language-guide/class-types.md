---
title: Class types
description: Learn how to define and use classes in Slice.
---

{% slice2 %}
Classes are not supported with Slice2.
{% /slice2 %}

{% slice1 %}
## Super structs

A class is a constructed type that holds a list of fields, just like a [struct](struct-types). Classes also offer
capabilities not offered by structs:
 - extensibility\
   you can extend a class through inheritance and tagged fields
 - graph preservation\
   you can transmit a graph of class instances through a Slice operation
 - slicing\
   a recipient can decode a class instance into a base class by slicing off derived "slices" it does not know

We will review each of these capabilities below.

These extra capabilities are not free: the encoding/decoding of a class is much more complex and time consuming than the
encoding/decoding of a struct, and its binary representation is larger. As a result, you should only select a class over
a struct when these extra capabilities may be useful for your application.

{% callout type="information" %}
A class represents data that you transmit over the wire, just like a struct. You can't define operations on a Slice
class or implement an [interface](interface) with a Slice class.
{% /callout %}

## Extensibility

### Class inheritance

A class can derive from another class: in doing so, it appends its own fields to the fields of its base class. For
example:

```slice
class CarPart {
    id: string
}

class RearBumper : CarPart {
    color: Color
}
```

`RearBumper` has two fields: `id` (inherited from `CartPart`) and `color`.

A derived class cannot redefine a field of its base class: all the fields must have unique names.

You can then transmit a derived class as the base class type. For example:

```slice
interface CarPartShop {
    findPart(string: id) -> CarPart?
}
```

`findPart` can return an instance of the base class (`CarPart`) or any of its derived classes, such as `RearBumper`.

### Tagged fields

The fields of a class can be regular fields (like the fields shown earlier) or [tagged fields].

## Graph preservation

When you transmit a struct through a Slice operation, you make copies of this struct, and the recipient can't tell if
you used the same struct instance for multiple parameters. For example:

```slice
compact struct Coordinate { x: int32, y: int32 }

interface Router {
    createRoute(start: Coordinate, wayPoint: Coordinate, end: Coordinate) -> Route
}

interface Route { ... not important ... }
```

The implementation of `createRoute` can't tell if you passed the very same instance of `Coordinate` several times: it
receives a separate copy of `Coordinate` for each argument.

If you use a class instead of a struct, the "identity" of the instance is maintained when transmitting this instance
over the wire. For example:

```slice
class Coordinate { x: int32, y: int32 }

interface Router {
    createRoute(start: Coordinate, wayPoint: Coordinate, end: Coordinate) -> Route
}
```

With this revised version, if you pass the same instance of `Coordinate` for all 3 arguments, the implementation of
`createRoute` will get a single instance of the mapped `Coordinate` 3 times--it won't get 3 separate copies.

Classes allow you to transmit arbitrary graphs through Slice operations. For example, you can send a linked list with:

```slice
class Node { string: name, next: Node? }

interface NodePrinter {
    printList(head: Node) // sends a linked list
}
```

This linked list can even include a cycle, with the `next` field on some node pointing to an earlier node. The Slice
library always recreates an exact copy of the original class graph during decoding.

## Slicing

{% callout type="information" %}
This is an opt-in feature. It's not enabled by default.
{% /callout %}

When the generated code decodes a class instance received as part of a request or response payload, it tries to recreate
a class with the type used by the sender. This usually works because the application that encoded this class into a
payload and the application that decodes the payload share the same Slice definitions. With our earlier example, they
both know `CarPart` and `RearBumper`.

There is however a chance for these Slice definitions to get out of sync. For example, the service that implements
`CarPartShop` could return a `FrontBumper`:

```slice
class FrontBumper : CarPart {
    color: Color
    preDrilledHoles: bool
}
```

But the client application that calls `findPart` doesn't know `FrontBumper` so it can't decode it.

In this situation, the recipient will fail to decode this class instance unless you tell the sender to encode this
class in "sliced" format with the `slicedFormat` operation [attribute](attributes):

```slice
interface CarPartShop {
    [slicedFormat(Return)] findPart(string: id) -> CarPart?
}
```

The `slicedFormat` attribute instructs the generated code on the sending side to encode the payload in such a way the
recipient can slice-off any derived classes it does not know and construct instead a base class it knows. These
sliced-off portions are called class slices.

`slicedFormat` has an effect only on the side that encodes the payload. You can specify whether to encode the arguments,
the return value or both in this format. For example:

```slice
interface CarPartShop {
    [slicedFormat(Return)] findPart(string: id) -> CarPart?
    [slicedFormat(Args)] storePart(part: CarPart);
    [slicedFormat(Args, Return)] exchangePart(oldPart: CarPart) -> CarPart throws OutOfStockException
}
```

{% callout type="information" %}
The corresponding Slice attribute (metadata) in Ice is [`format:sliced`][format-metadata]. Unlike `slicedFormat`,
`format:sliced` always applies to both arguments and return value.
{% /callout %}

### Slice preservation

When the generated code decodes a class in sliced format and slices off derived slices, it does not discard these
slices: it keeps them in the decoded instance. If you later send this class instance to another application that knows
the derived class type, this application will decode successfully the full type.

## C# mapping

A Slice class maps to a public C# class with the same name. If the Slice class has no base class, the mapped class
derives from [`SliceClass`](csharp:IceRpc.Slice.SliceClass), the base class for all C# Slice classes.

For example:

{% side-by-side alignment="top" %}
```slice
class CarPart {
    id: string
    tag(1) shippingWeight: float64?
}
```

```csharp
public partial class CarPart : SliceClass
{
    public string Id;
    public double? ShippingWeight;

    // Primary constructor
    public CarPart(string id, double? shippingWeight)
    {
       ...
    }

    // Secondary constructor
    public CarPart(string id)
    {
       ...
    }

}
```
{% /side-by-side %}

The mapped class has a primary constructor which sets all the fields. If any field has an optional type, the mapped
class has a second constructor with a parameter for each non-nullable C# field.

Slice class inheritance maps the C# class inheritance as you would expect:

{% side-by-side alignment="top" %}
```slice
class FrontBumper : CarPart {
    color: Color
}
```

```csharp
public partial class RearBumper : CarPart
{
    public Color Color;

    // Primary constructor
    public RearBumper(
        string id,
        double? shippingWeight,
        Color color)
    {
        ...
    }

    // Secondary constructor
    public RearBumper(string id, Color color)
    {
        ...
    }
}
```
{% /side-by-side %}
{% /slice1 %}

[format-metadata]: https://doc.zeroc.com/ice/3.7/the-slice-language/slice-metadata-directives#id-.SliceMetadataDirectivesv3.7-format
[tagged-fields]: parameters-and-fields#tagged-parameters-and-fields
