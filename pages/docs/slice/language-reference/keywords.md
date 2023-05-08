---
title: Keywords
---

[comment]: <> (TODO: add a link to 'identifiers::escaping' to the first paragraph)
[comment]: <> (TODO: add links for each keyword to the page where it's talked about)

Keywords are reserved identifiers that have special meanings in the Slice language. A keyword can't be used as an identifier for your definitions unless it's prefixed with a `\` to escape it. For example `\struct` is a valid identifier, but `struct` is not, since it's a keyword.

Keywords (like all identifiers) are case sensitive.

The following table lists all the keywords of the Slice language:

{% table dividers=true %}
-
-
-
-
---
- [AnyClass](#todo)
- [exception](#todo)
- [module](#todo)
- [uint16](#todo)
---
- [AnyException](#todo)
- [float32](#todo)
- [sequence](#todo)
- [uint32](#todo)
---
- [bool](#todo)
- [float64](#todo)
- [stream](#todo)
- [uint64](#todo)
---
- [class](#todo)
- [idempotent](#todo)
- [string](#todo)
- [unchecked](#todo)
---
- [compact](#todo)
- [interface](#todo)
- [struct](#todo)
- [varint32](#todo)
---
- [custom](#todo)
- [int8](#todo)
- [tag](#todo)
- [varint62](#todo)
---
- [dictionary](#todo)
- [int16](#todo)
- [throws](#todo)
- [varuint32](#todo)
---
- [encoding](#todo)
- [int32](#todo)
- [typealias](#todo)
- [varuint62](#todo)
---
- [enum](#todo)
- [int64](#todo)
- [uint8](#todo)
{% /table %}

{% callout type="information" %}
Note that keywords are allowed as identifiers within preprocessor directives and attributes since they have no special meaning within those contexts.
{% /callout %}
