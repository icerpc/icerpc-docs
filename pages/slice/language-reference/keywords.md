---
title: Keywords
---

-[comment]: <> (TODO: add a link to 'identifiers::escaping' to the first paragraph)

Keywords are reserved identifiers that have special meanings in the Slice language. A keyword can't be used as an identifier for your definitions unless it's prefixed with a `\` to escape it. For example `\struct` is a valid identifier, but `struct` is not, since it's a keyword.

Keywords (like all identifiers) are case sensitive.

The following table lists all the keywords of the Slice language:

{% table dividers=true %}
---

- [AnyClass](/slice/language-guide/primitive-types#anyclass)
- [exception](/slice/language-guide/exception)
- [module](/slice/language-guide/module)
- [uint16](/slice/language-guide/primitive-types#fixed-size-integral-types)

---

- [AnyException](/slice/language-guide/operation#exception-specification)
- [float32](/slice/language-guide/primitive-types#floating-point-types)
- [sequence](/slice/language-guide/sequence-types)
- [uint32](/slice/language-guide/primitive-types#fixed-size-integral-types)

---

- [bool](/slice/language-guide/primitive-types#bool)
- [float64](/slice/language-guide/primitive-types#floating-point-types)
- [stream](/slice/language-guide/parameters-and-fields#stream-parameters)
- [uint64](/slice/language-guide/primitive-types#fixed-size-integral-types)

---

- [class](/slice/language-guide/class-types)
- [idempotent](/slice/language-guide/operation#idempotent-operation)
- [string](/slice/language-guide/primitive-types#string)
- [unchecked](/slice/language-guide/enum-types)

---

- [compact](/slice/language-guide/struct-types#compact-struct)
- [interface](/slice/language-guide/interface)
- [struct](/slice/language-guide/struct-types)
- [varint32](/slice/language-guide/primitive-types#variable-size-integral-types)

---

- [custom](/slice/language-guide/custom-types)
- [int8](/slice/language-guide/primitive-types#fixed-size-integral-types)
- [tag](/slice/language-guide/parameters-and-fields#tagged-parameters-and-fields)
- [varint62](/slice/language-guide/primitive-types#variable-size-integral-types)

---

- [dictionary](/slice/language-guide/dictionary-types)
- [int16](/slice/language-guide/primitive-types#fixed-size-integral-types)
- [throws](/slice/language-guide/operation#exception-specification)
- [varuint32](/slice/language-guide/primitive-types#variable-size-integral-types)

---

- [encoding](/slice/language-guide/slice1-or-slice2#encoding-statement)
- [int32](/slice/language-guide/primitive-types#fixed-size-integral-types)
- [typealias](/slice/language-guide/type-alias)
- [varuint62](/slice/language-guide/primitive-types#variable-size-integral-types)

---

- [enum](/slice/language-guide/enum-types)
- [int64](/slice/language-guide/primitive-types#fixed-size-integral-types)
- [uint8](/slice/language-guide/primitive-types#fixed-size-integral-types)

{% /table %}

{% callout type="information" %}
Note that keywords are allowed as identifiers within preprocessor directives and attributes since they have no special meaning within those contexts.
{% /callout %}
