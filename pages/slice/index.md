---
title: Slice
description: A better IDL
showToc: false
---

The [IceRPC core][icerpc-core] provides all you need to create RPCs. When you use only the core, the payload of your
requests and responses are streams of bytes, and you need to manually encode and decode any typed data (such as strings
and integers) in these streams. This is doable but laborious.

Slice builds on the core's byte-oriented API to provide a higher-level API, with types. For example, the Thermostat
interface below defines 3 operations, or RPCs, in Slice:

```slice
interface Thermostat {
   getCurrentTemperature() -> float64
   getHistoricalTemperature(timeStamp: WellKnownTypes::TimeStamp) -> float64
   streamTemperature() -> stream float64
}
```

The Slice compiler parses this Slice interface and generates code in your favorite programming language. The resulting
generated code offers you a convenient typed RPC API implemented using IceRPC requests and responses.

{% grid %}

{% mini-card
   title="Slice components"
   description="A short description of each Slice component."
   href="/slice/basics/slice-components" /%}

{% mini-card
   title="Contract-first model"
   description="Learn how to create an application using IceRPC and Slice."
   href="/slice/basics/contract-first" /%}

{% mini-card
   title="Interface"
   description="Learn how to define interfaces in Slice."
   href="/slice/language-guide/interface" /%}

{% mini-card
   title="Struct"
   description="Learn how to define and use structs in Slice."
   href="/slice/language-guide/struct-types" /%}

{% mini-card
   title="Slice encoding"
   description="Learn how Slice encodes types into byte streams."
   href="/slice/encoding-reference/main-features" /%}

{% mini-card
   title="Examples"
   description="Discover the Slice syntax through a few examples"
   href="/slice/basics/examples" /%}

{% /grid %}

[icerpc-core]: ../icerpc-core
