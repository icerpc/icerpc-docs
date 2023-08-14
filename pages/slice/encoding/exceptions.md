---
title: Exceptions
description: Learn how to encode an exception with Slice.
---

{% slice2 %}
Exceptions are not supported with Slice1.
{% /slice2 %}

{% slice1 %}
An exception is encoded like a [class](constructed-types#class) with the same fields. Slice always encodes exceptions
in sliced format; for interoperability with Ice, it can decode exceptions in any format.

Exception slices are not preserved during decoding: if Slice encounters an exception slice it doesn't know while
decoding an exception in sliced format, this slice is dropped.
{% /slice1 %}
