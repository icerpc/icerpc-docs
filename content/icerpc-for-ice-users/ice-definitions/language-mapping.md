---
title: Mapping Ice to C# with IceRPC
---

IceRPC provides full support for Ice's original Slice language, with definitions stored in `.ice` files.

Throughout this chapter, we use the term "Ice" to describe constructs in Ice's Slice language, in order to avoid
confusion with the new [Slice] language. For example, an "Ice struct" is short for a struct defined using Ice's Slice
language.

Ice's Slice language is described in the [Ice Manual].

## Targeting IceRPC

The Ice compiler for C# (`slice2cs`) allows you to generate code for IceRPC. If you build your project with MSBuild, you
can set the `IceRpc` attribute to true:

```xml
<ItemGroup>
  <SliceCompile Include="../slice/Greeter.ice" IceRpc="true" />
</ItemGroup>
```

or

```xml
  <!-- Set the default Rpc framework for .ice file compilation to icerpc -->
<ItemDefinitionGroup>
  <SliceCompile>
    <IceRpc>true</IceRpc>
  </SliceCompile>
</ItemDefinitionGroup>
```

In IceRPC mode, `slice2cs` generates C# files with the extension `.IceRpc.cs`.

{% callout %}
The [ZeroC.Ice.Slice.Tools] NuGet package provides the `slice2cs` compiler and the `SliceCompile` task.
{% /callout %}

## C# language mapping

This chapter describe how Ice definitions map to C# when targeting IceRPC. As you would expect, an Ice struct
maps to C# record struct, an Ice class maps to a C# class, an Ice enum maps to a C# enum, an Ice field maps to a
C# property, and so on.

There are a few notable differences between the original C# mapping (when targeting Ice) and the new mapping for IceRPC:

|                        | Ice target (default)                 | IceRPC target                                            |
|------------------------|--------------------------------------|----------------------------------------------------------|
| C# identifier          | Same as the Ice identifier           | Follows C# conventions (Pascal case, camel case)         |
| C# interface           | Same as the Ice interface name       | C# interface with na `I` prefix as per C# conventions    |
| Mapping for operations | Sync and async C# methods            | Only async methods                                       |
| Mapping for fields     | C# field (default), C# property      | C# property                                              |
| Client-side mapping    | Prx interface such as `GreeterPrx`   | Interface (`IGreeter`) and proxy struct (`GreeterProxy`) |
| Server-side Mapping    | Skeleton class such as `GreeterDisp_`| Service interface such as `IGreeterService`              |

[Ice Manual]: https://docs.zeroc.com/ice/3.8/csharp/the-slice-language
[Slice]: ../../slice/
[ZeroC.Ice.Slice.Tools]: https://www.nuget.org/packages/ZeroC.Ice.Slice.Tools
