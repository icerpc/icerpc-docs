---
title: Well-known types
description: Discover the built-in custom types.
---

{% slice1 %}
IceRPC provides custom type [ServiceAddress][service-address-type] in module `WellKnownTypes`. This well-known type
represents a [service address][service-address] in Slice and is bundled with all IceRPC implementations.

See also the [service address encoding][service-address-encoding].
{% /slice1 %}

{% slice2 %}
IceRPC provides a number of [custom types](custom-types) in module `WellKnownTypes`:

- [Duration][duration]\
  A length of time, encoded as a varint62 (precision = 100 nanoseconds).
- [ServiceAddress][service-address]\
  A [service address][service-address], encoded as a string.
- [TimeStamp][time-stamp]\
  A specific point in time, encoded as an int64.
- [Uri][uri-type]\
  A Uniform Resource Identifier ([URI][uri]), encoded as a string.

These well-known types are bundled with all IceRPC implementations.
{% /slice2 %}

[duration]: https://github.com/icerpc/icerpc-slice/blob/main/WellKnownTypes/Duration.slice
[service-address-type]: https://github.com/icerpc/icerpc-slice/blob/main/WellKnownTypes/ServiceAddress.slice
[service-address]: ../../icerpc/invocation/service-address
[service-address-encoding]: ../encoding/constructed-types#proxy
[time-stamp]: https://github.com/icerpc/icerpc-slice/blob/main/WellKnownTypes/TimeStamp.slice
[uri]: https://en.wikipedia.org/wiki/Uniform_Resource_Identifier
[uri-type]: https://github.com/icerpc/icerpc-slice/blob/main/WellKnownTypes/Uri.slice
