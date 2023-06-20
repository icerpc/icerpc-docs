---
title: Keywords
---

-[comment]: <> (TODO: add a link to 'identifiers::escaping' to the first paragraph)

Keywords are reserved identifiers that have special meanings in the Slice language. A keyword can't be used as an identifier for your definitions unless it's prefixed with a `\` to escape it. For example `\struct` is a valid identifier, but `struct` is not, since it's a keyword.

Keywords (like all identifiers) are case sensitive.

The following table lists all the keywords of the Slice language:

{% table dividers=true %}
---

- [AnyClass](/docs/slice/language-guide/primitive-types#anyclass)
- [exception](/docs/slice/language-guide/exception)
- [module](/docs/slice/language-guide/module)
- [uint16](/docs/slice/language-guide/primitive-types#fixed-size-integral-types)

---

- [AnyException](/docs/slice/language-guide/operation#exception-specification)
- [float32](/docs/slice/language-guide/primitive-types#floating-point-types)
- [sequence](/docs/slice/language-guide/sequence-types)
- [uint32](/docs/slice/language-guide/primitive-types#fixed-size-integral-types)

---

- [bool](/docs/slice/language-guide/primitive-types#bool)
- [float64](/docs/slice/language-guide/primitive-types#floating-point-types)
- [stream](/docs/slice/language-guide/parameters-and-fields#stream-parameters)
- [uint64](/docs/slice/language-guide/primitive-types#fixed-size-integral-types)

---

- [class](/docs/slice/language-guide/class-types)
- [idempotent](/docs/slice/language-guide/operation#idempotent-operation)
- [string](/docs/slice/language-guide/primitive-types#string)
- [unchecked](/docs/slice/language-guide/enum-types)

---

- [compact](/docs/slice/language-guide/struct-types#compact-struct)
- [interface](/docs/slice/language-guide/interface)
- [struct](/docs/slice/language-guide/struct-types)
- [varint32](/docs/slice/language-guide/primitive-types#variable-size-integral-types)

---

- [custom](/docs/slice/language-guide/custom-types)
- [int8](/docs/slice/language-guide/primitive-types#fixed-size-integral-types)
- [tag](/docs/slice/language-guide/parameters-and-fields#tagged-parameters-and-fields)
- [varint62](/docs/slice/language-guide/primitive-types#variable-size-integral-types)

---

- [dictionary](/docs/slice/language-guide/dictionary-types)
- [int16](/docs/slice/language-guide/primitive-types#fixed-size-integral-types)
- [throws](/docs/slice/language-guide/operation#exception-specification)
- [varuint32](/docs/slice/language-guide/primitive-types#variable-size-integral-types)

---

- [encoding](/docs/slice/language-guide/slice1-or-slice2#encoding-statement)
- [int32](/docs/slice/language-guide/primitive-types#fixed-size-integral-types)
- [typealias](/docs/slice/language-guide/type-alias)
- [varuint62](/docs/slice/language-guide/primitive-types#variable-size-integral-types)

---

- [enum](/docs/slice/language-guide/enum-types)
- [int64](/docs/slice/language-guide/primitive-types#fixed-size-integral-types)
- [uint8](/docs/slice/language-guide/primitive-types#fixed-size-integral-types)

{% /table %}

{% callout type="information" %}
Note that keywords are allowed as identifiers within preprocessor directives and attributes since they have no special meaning within those contexts.
{% /callout %}
