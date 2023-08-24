---
title: Keywords
---

Keywords are reserved identifiers that have special meanings in the Slice language. A keyword can't be used as an identifier for your definitions unless it's prefixed with a `\` to escape it. For example `\struct` is a valid identifier, but `struct` is not, since it's a keyword.

Keywords (like all identifiers) are case sensitive.

The following table lists all the keywords of the Slice language:

{% table dividers=true %}

- [AnyClass](/slice1/language-guide/primitive-types#anyclass)
- [float64](/slice2/language-guide/primitive-types#floating-point-types)
- [Sequence](/slice2/language-guide/sequence-types)
- [uint32](/slice2/language-guide/primitive-types#fixed-size-integral-types)

---

- [bool](/slice2/language-guide/primitive-types#bool)
- [idempotent](/slice2/language-guide/operation#idempotent-operation)
- [stream](/slice2/language-guide/parameters#stream-parameters)
- [uint64](/slice2/language-guide/primitive-types#fixed-size-integral-types)

---

- [class](/slice1/language-guide/class-types)
- [interface](/slice2/language-guide/interface)
- [string](/slice2/language-guide/primitive-types#string)
- [unchecked](/slice2/language-guide/enum-types)

---

- [compact](/slice2/language-guide/struct-types#compact-struct)
- [int8](/slice2/language-guide/primitive-types#fixed-size-integral-types)
- [struct](/slice2/language-guide/struct-types)
- [varint32](/slice2/language-guide/primitive-types#variable-size-integral-types)

---

- [custom](/slice2/language-guide/custom-types)
- [int16](/slice2/language-guide/primitive-types#fixed-size-integral-types)
- [tag](/slice2/language-guide/fields#tagged-fields)
- [varint62](/slice2/language-guide/primitive-types#variable-size-integral-types)

---

- [Dictionary](/slice2/language-guide/dictionary-types)
- [int32](/slice2/language-guide/primitive-types#fixed-size-integral-types)
- [throws](/slice2/language-guide/operation#exception-specification)
- [varuint32](/slice2/language-guide/primitive-types#variable-size-integral-types)

---

- [enum](/slice2/language-guide/enum-types)
- [int64](/slice2/language-guide/primitive-types#fixed-size-integral-types)
- [typealias](/slice2/language-guide/type-alias)
- [varuint62](/slice2/language-guide/primitive-types#variable-size-integral-types)

---

- [exception](/slice2/language-guide/exception)
- [mode](/slice2/language-guide/compilation-mode)
- [uint8](/slice2/language-guide/primitive-types#fixed-size-integral-types)

---

- [float32](/slice2/language-guide/primitive-types#floating-point-types)
- [module](/slice2/language-guide/module)
- [uint16](/slice2/language-guide/primitive-types#fixed-size-integral-types)

{% /table %}

{% callout type="note" %}
Note that keywords are allowed as identifiers within preprocessor directives and attributes since they have no special meaning within those contexts.
{% /callout %}
