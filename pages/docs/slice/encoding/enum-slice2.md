---
title: Enum
description: Learn how to encode an enumerator with Slice.
---

{% title /%}

An enumerator is encoded as its associated numeric value, using the encoding of the parent enumeration's underlying
type.

For example:
```slice
enum Fruit : uint8 { Apple, Strawberry, Orange = 5}
```

A `Fruit::Strawberry` is encoded as 1 in an uint8 (a byte), while a `Fruit::Orange` is encoded as 5.

An enum without an underlying type is treated like an enum with the varint32 underlying type.

For example:
```slice
enum Cake { RedVelvet, Sponge, BlackForrest }
// is 100% equivalent to:
enum Cake : varint32 { RedVelvet, Sponge, BlackForrest }
```

The encoding is the same for checked and unchecked enums. When decoding an enumerator in a checked enum, the decoding
fails if the decoded value does not correspond to an existing enumerator.
