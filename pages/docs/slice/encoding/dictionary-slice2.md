---
title: Dictionary
description: Learn how to encode a dictionary with Slice.
---

{% title /%}

A dictionary with N entries is encoded like a [sequence](sequence-slice2) with N elements where the element type is a
[compact struct](struct-slice2#compact-struct):
```slice
compact struct Pair { key: Key, value: Value }
```

`Key` represents the dictionary's key type and `Value` the dictionary's value type. `Value` may be an optional type
such as a `string?`.
