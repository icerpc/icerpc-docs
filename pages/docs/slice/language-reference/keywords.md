---
title: Keywords
---

[comment]: <> (TODO: add a link to 'identifiers::escaping' to the first paragraph)
[comment]: <> (TODO: Change the formatting of the keyword table so it has vertical bars)
[comment]: <> (TODO: Can we allow header-less tables?)

Keywords are reserved identifiers that have special meanings in the Slice language. They can't be used as identifiers for your definitions unless they're prefixed with a `\` to escape it. For example `\struct`  is a valid identifier, but `struct` is not, since it's a keyword.

Keywords (like all identifiers) are case sensitive.

The following table lists all the keywords of the Slice language:

|              |            |           |           |
| ------------ | ---------- | --------- | --------- |
| AnyClass     | exception  | module    | uint16    |
| AnyException | float32    | sequence  | uint32    |
| bool         | float64    | stream    | uint64    |
| class        | idempotent | string    | unchecked |
| compact      | interface  | struct    | varint32  |
| custom       | int8       | tag       | varint62  |
| dictionary   | int16      | throws    | varuint32 |
| encoding     | int32      | typealias | varuint62 |
| enum         | int64      | uint8     |           |

{% callout type="information" %}
Note that keywords are allowed as identifiers within preprocessor directives and attributes, since they have no special meaning within those contexts.
{% /callout %}
