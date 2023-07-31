---
title: Fields
description: Learn how to define fields in Slice.
---

## Syntax

A field is defined as `name: Type`, where `name` is the field's name, and `Type` is the field's type. For example:

```slice
name: string
image: sequence<uint8>
address: WellKnownType::Uri
```

Fields can be separated by either whitespace or a single comma. You would typically use a comma when fields are on the
same line, as in:

```slice
compact struct Point { x: int32, y: int32 }
```

The type of a field can be a [primitive type](primitive-types) (such an int32 or a string), a constructed type (such an
[enum](enum-types) or a [struct](struct-types)) or a [proxy type](proxy-types).

## Optional type

When you define a field, you can specify whether this field must hold a value of its type, or if holding a special "not
set" value is also acceptable. In this latter situation, you would give the field an optional type, with a `?` suffix.

This special "not set" value corresponds to null in C#, `std::nullopt` in C++, nil in Swift, etc.

For example:

{% slice1 %}
```slice
mode = Slice1

class Person {
    name: string
    spouse: Person?
}
```

Here, a person may have a spouse (a "pointer" to another Person instance) or a "not set" value for its spouse field.

Leaving tagged fields aside, only a few field types can be marked optional with Slice1:
 - [classes][class-types] (like in the example above)
 - [proxies][proxy-types]
 - [custom types][custom-types]
{% /slice1 %}

{% slice2 %}
```slice
struct Person {
    name: string
    dob: WellKnownTypes::TimeStamp?
}
```

The field `dob` may have a value or a "not set" value (when the date of birth is unknown).
{% /slice2 %}

{% callout %}
A regular field with an optional type, as shown in the example above, is a mandatory field. It just happens that a valid
value for this field is "not set". On the other hand, a tagged field (described below) is a truly optional field that
the sender or recipient may not know at all.
{% /callout %}

## Tagged fields

A field can have a tag before its name, which makes this field a "tagged field". A tag consists of the `tag` keyword
followed by a tag number in parenthesis. For example:

{% slice1 %}
```slice
mode = Slice1

class Person {
    name: string
    tag(1) favoriteFood: Food? // tagged field
}
```
{% /slice1 %}
{% slice2 %}
```slice
struct Person {
    name: string
    tag(1) favoriteFood: Food? // tagged field
}
```
{% /slice2 %}

Tagged fields allow you to change your Slice definitions while maintaining on the wire compatibility with applications
that use older or newer Slice definitions without these tagged fields.

A tagged field can have any type, provided this type is marked optional, as shown in the example above.

### Tag number

A tag number is a positive integer, such as 0, 1, 77.

The scope of a tag number is the enclosing type. For example, the following definitions are correct, with several
`tag(1)` in different scopes:

```slice
exception MyException {
    tag(1) errorCode: int32?
}

exception MyOtherException {
    tag(1) message: string?
}
```

### Tag sorting

A tagged field can appear anywhere in the enclosing type's field list, in particular before or after a non-tagged field.
You don't need to sort tagged fields by tag number. For instance, the `Person` below has a valid though unusual field
list:

{% slice1 %}
```slice
class Person {
    tag(5) emailAddress: string?
    name: string
    tag(1) favoriteFood: Food?
}
```
{% /slice1 %}
{% slice2 %}
```slice
struct Person {
    tag(5) emailAddress: string?
    name: string
    tag(1) favoriteFood: Food?
}
```
{% /slice2 %}

### Tag semantics

A regular (non-tagged) field is mandatory: it's always encoded by the sender, even when its type is optional. Later on,
the recipient expects to find one or more bytes for this field in the byte stream. If the sender and recipient don't
agree on this field—their Slice definitions are not the same—the decoding will fail.

On the other hand, a tagged field tolerates mismatches. The sender can encode a tagged field that the recipient doesn't
know about (it will be ignored), and the recipient can expect a tagged field that the sender doesn't know (the recipient
gets a "not set" value in this case).

You can add, remove and reorder tagged fields over time while maintaining on the wire compatibility. The only constraint
is you can never change the type associated with a tag number. If the type associated with tag 7 is a string, it must
always remain a string; if you were to reuse tag 7 with another type, you would break on the wire compatibility with
applications that expect tag 7 fields (in this tag number scope) to be encoded as strings.

## C# mapping

A field `name: Type` is mapped to a C# field with the same name, with name converted to Pascal case. The type of the C#
field is the mapped C# type for `Type`.

Tagged fields are mapped just like regular fields. The tag and tag number don't appear in the mapped C# API.

### Optional type in C#

Optional types are mapped to nullable C# types. For example, `int32?` is mapped to `int?` in C#.
