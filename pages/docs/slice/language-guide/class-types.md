---
title: Class types
description: Learn how to define and use classes in Slice.
---

{% slice2 %}
Classes are not supported with Slice2.
{% /slice2 %}

{% slice1 %}
## Super structs

A class is a constructed data type that holds a list of fields, just like a [struct](struct-types). Unlike a struct, a
class may have no field at all. Classes also offer capabilities not offered by structs:
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

`findPart` can return an instance of the base class (`CarPart`) or any of its derived classes.

### Tagged fields

The fields of a class can be regular fields (like the fields shown earlier) or tagged fields. A tagged field has a tag
number and an optional type, for example:

```slice
class CarPart {
    id: string
    tag(1) shippingWeight: float64?
 }
```

Tagged fields allow you to change (usually augment) a class while maintaining on the wire compatibility.

{% callout type="information" %}
A tag number is a positive integer, such as 0, 1, 77. The scope of a tag number is the enclosing class; its base class
(if any) is in a different scope for tag numbers.
{% /callout %}

A regular field is a mandatory field: it's always encoded by the sender and decoded by the recipient. If the sender and
recipient don't agree on the class definition--their Slice definitions are not the same--the decoding of the enclosing
payload will fail.

On the other hand, a tagged field tolerates mismatches. The sender can send a tagged field that the recipient doesn't
know about (it will be ignored), and the recipient can expect a tagged field that the sender doesn't know (the recipient
will get a "not set" value).

{% callout type="information" %}
You can add and remove tagged fields over time while maintaining on the wire compatibility for your class. The only
constraint is you can never change the type associated with a tag number. If the type associated with tag 7 is a string,
it must always remain a string; if you were to reuse tag 7 with another type, you would break on the wire compatibility
with applications that expect tag 7 fields to be encoded as strings.
{% /callout %}

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

This linked list can include a cycle, with the `next` field on some node pointing to an earlier node. The Slice engine
always recreates an exact copy of the original class graph during decoding.

## Slicing

{% callout type="information" %}
This is an opt-in feature. It's not enabled by default.
{% /callout %}

When the Slice engine decodes a class instance received as part of a request or response payload, it tries to recreate a
class with the type used by the sender. This usually works because the application that encoded this class into a
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

In this situation, the Slice engine will fail to decode the class instance _unless_ you tell the sender to encode this
class in "sliced" format with the `slicedFormat` operation attribute:

```slice
interface CarPartShop {
    [slicedFormat(Return)] findPart(string: id) -> CarPart?
}
```

The `slicedFormat` attribute instructs the Slice engine on the sending side to encode the payload in such a way the
recipient can slice-off any derived classes it does not know and construct instead a base class it knows. These
sliced-off portions are called class slices.

`slicedFormat` has an effect only on the side that encodes the payload, and you can specify whether to encode the
arguments, the return value or both in this format. For example:

```slice
interface CarPartShop {
    [slicedFormat(Return)] findPart(string: id) -> CarPart?
    [slicedFormat(Args)] storePart(part: CarPart);
    [slicedFormat(Args, Return)] exchangePart(oldPart: CarPart) -> CarPart?
}
```

### Slice preservation

When the Slice engine decodes a class in sliced format and slices off derived slices, it does not discard these slices:
it keeps them in the decoded instance. If you later send this class instance to another application that knows the
derived class type, this application will decode successfully the full type.

## C# mapping

A Slice class maps to a public C# class with the same name, and each Slice field maps to a public C# field with the same
name (converted to Pascal case).

Regular fields and tagged fields are mapped the same way: you can't tell if a field is tagged or not by looking at the
API of the generated record class.

If the Slice class has no base class, the mapped class derives from [`SliceClass`](csharp:IceRpc.Slice.SliceClass).
The Slice `AnyClass` keyword maps to `SliceClass` as well.

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
