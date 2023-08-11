---
title: Well-known types
description: Discover the built-in custom types.
---

A well-known type is a [custom type][custom] provided by Slice in all programming languages.

{% slice1 %}
There is no well-known type in Slice1 mode.
{% /slice1 %}

{% slice2 %}
All well-known types are defined in module `WellKnownTypes`:

- [Duration]\
  A length of time, encoded as a varint62 (precision = 100 nanoseconds).
- [TimeStamp]\
  A specific point in time, encoded as an int64.
- [Uri][uri-type]\
  A Uniform Resource Identifier ([URI]), encoded as a string.
  [Uuid][uuid-type]\
  A Universal Unique Identifier ([UUID], encoded as a 128-bit value.
{% /slice2 %}

[custom]: custom-types

[URI]: https://en.wikipedia.org/wiki/Uniform_Resource_Identifier
[UUID]: https://en.wikipedia.org/wiki/Universally_unique_identifier

[Duration]: https://github.com/icerpc/icerpc-slice/blob/main/WellKnownTypes/Duration.slice
[TimeStamp]: https://github.com/icerpc/icerpc-slice/blob/main/WellKnownTypes/TimeStamp.slice
[uri-type]: https://github.com/icerpc/icerpc-slice/blob/main/WellKnownTypes/Uri.slice
[uuid-type]: https://github.com/icerpc/icerpc-slice/blob/main/WellKnownTypes/Uuid.slice
