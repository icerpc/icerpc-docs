---
title: Keywords
---

-[comment]: <> (TODO: add a link to 'identifiers::escaping' to the first paragraph)

Keywords are reserved identifiers that have special meanings in the Slice language. A keyword can't be used as an identifier for your definitions unless it's prefixed with a `\` to escape it. For example `\struct` is a valid identifier, but `struct` is not, since it's a keyword.

Keywords (like all identifiers) are case sensitive.

The following table lists all the keywords of the Slice language:

{% table dividers=true %}
---

- [AnyClass](/slice1/language-guide/primitive-types#anyclass)
- [exception](/slice2/language-guide/exception)
- [module](/slice2/language-guide/module)
- [uint16](/slice2/language-guide/primitive-types#fixed-size-integral-types)

---

- [AnyException](/slice2/language-guide/operation#exception-specification)
- [float32](/slice2/language-guide/primitive-types#floating-point-types)
- [sequence](/slice2/language-guide/sequence-types)
- [uint32](/slice2/language-guide/primitive-types#fixed-size-integral-types)

---

- [bool](/slice2/language-guide/primitive-types#bool)
- [float64](/slice2/language-guide/primitive-types#floating-point-types)
- [stream](/slice2/language-guide/parameters#stream-parameters)
- [uint64](/slice2/language-guide/primitive-types#fixed-size-integral-types)

---

- [class](/slice1/language-guide/class-types)
- [idempotent](/slice2/language-guide/operation#idempotent-operation)
- [string](/slice2/language-guide/primitive-types#string)
- [unchecked](/slice2/language-guide/enum-types)

---

- [compact](/slice2/language-guide/struct-types#compact-struct)
- [interface](/slice2/language-guide/interface)
- [struct](/slice2/language-guide/struct-types)
- [varint32](/slice2/language-guide/primitive-types#variable-size-integral-types)

---

- [custom](/slice2/language-guide/custom-types)
- [int8](/slice2/language-guide/primitive-types#fixed-size-integral-types)
- [tag](/slice2/language-guide/fields#tagged-fields)
- [varint62](/slice2/language-guide/primitive-types#variable-size-integral-types)

---

- [dictionary](/slice2/language-guide/dictionary-types)
- [int16](/slice2/language-guide/primitive-types#fixed-size-integral-types)
- [throws](/slice2/language-guide/operation#exception-specification)
- [varuint32](/slice2/language-guide/primitive-types#variable-size-integral-types)

---

- [mode](/slice2/language-guide/compilation-mode)
- [int32](/slice2/language-guide/primitive-types#fixed-size-integral-types)
- [typealias](/slice2/language-guide/type-alias)
- [varuint62](/slice2/language-guide/primitive-types#variable-size-integral-types)

---

- [enum](/slice2/language-guide/enum-types)
- [int64](/slice2/language-guide/primitive-types#fixed-size-integral-types)
- [uint8](/slice2/language-guide/primitive-types#fixed-size-integral-types)

{% /table %}

{% callout type="information" %}
Note that keywords are allowed as identifiers within preprocessor directives and attributes since they have no special meaning within those contexts.
{% /callout %}
