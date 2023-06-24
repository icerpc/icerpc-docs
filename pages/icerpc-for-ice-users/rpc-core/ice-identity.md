---
title: Ice identity
description: Learn how Ice identities are mapped to path in IceRPC.
---

In Ice, each Ice object has an identity represented by a Slice-defined struct:

```slice
encoding = Slice1

module Ice

compact struct Identity {
    name: string
    category: string
}
```

In IceRPC, Ice objects are called services, and each service has a URI-compatible absolute path. For interop with Ice,
the identity of Ice objects can be converted back and forth into URI-compatible percent-escaped path.

For simple identities with only ASCII letters and numbers, the conversion is straightforward:

- path `/category/name` is equivalent to Identity { name = "name", category = "category" }
- path `/name` is equivalent to Identity { name = "name", category = "" }
- path `/` is equivalent to the "null" Identity (with an empty name and empty category)

More generally, an identity is equivalent to a 1 or 2-segment absolute path, where each segment is
[percent-escaped](https://en.wikipedia.org/wiki/Percent-encoding):

- path `/percent-escaped-category/percent-escaped-name` is equivalent to Identity { name = "unescaped-name",
category = "unescaped-category" }
- path `/percent-escaped-name` is equivalent to Identity { name = "unescaped-name", category = "" }

Here are a few examples:

| Ice identity                      | Corresponding path |
| --------------------------------- | ------------------ |
| name = "hello"                    | `/hello`           |
| name = "hello", category = "Xyz"  | `/Xyz/hello`       |
| name = "hello "                   | `/hello%20`        |
| name = "hello", category = "Xyz/" | `/Xyz%2F/hello`    |
