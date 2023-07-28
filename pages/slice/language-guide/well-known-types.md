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

- [Duration][duration]\
  A length of time, encoded as a varint62 (precision = 100 nanoseconds).
- [TimeStamp][time-stamp]\
  A specific point in time, encoded as an int64.
- [Uri][uri-type]\
  A Uniform Resource Identifier ([URI][uri]), encoded as a string.
  [Uuid][uuid-type]
  A Universal Unique Identifier ([UUID][uuid], encoded as a 128-bit value.
{% /slice2 %}

[custom]: custom-types
[duration]: https://github.com/icerpc/icerpc-slice/blob/main/WellKnownTypes/Duration.slice
[time-stamp]: https://github.com/icerpc/icerpc-slice/blob/main/WellKnownTypes/TimeStamp.slice
[uri]: https://en.wikipedia.org/wiki/Uniform_Resource_Identifier
[uri-type]: https://github.com/icerpc/icerpc-slice/blob/main/WellKnownTypes/Uri.slice
[uuid]: https://en.wikipedia.org/wiki/Universally_unique_identifier
[uuid-type]: https://github.com/icerpc/icerpc-slice/blob/main/WellKnownTypes/Uuid.slice
