---
title: Class types
description: Learn how to define and use classes in Slice.
---

{% slice2 %}
Classes are not supported with Slice2.
{% /slice2 %}

{% slice1 %}
## Struct on steroid

A class is a constructed data type that holds a list of fields, just like a [struct](struct-types). Unlike a struct, it
provides these additional capabilities:
 - extensibility\
   you can extend a class through inheritance and tagged fields
 - reference semantics\
   two class parameters or fields can point to the same instance
 - slicing\
   a recipient can decode a class instance into a base class by slicing away bits it does know

We will review each of these capabilities below.

These extra capabilities are not free: the encoding/decoding of a class is much more complex and time consuming than the
encoding/decoding of a struct, and its encoded representation is larger. As a result, you should only select a class
over a struct when these extra capabilities may be useful for your application.
{% /slice1 %}

## Extensibility

## Reference semantics

## Slicing and slice preservation

## C# mapping
