---
title: Mapping Ice to C# with IceRPC
description: An overview of how Ice definitions are mapped to C#.
---

IceRPC provides full support for Ice's original Slice language, with definitions stored in `.ice` files.

Throughout this chapter, we use the term "Ice" to describe constructs in Ice's Slice language, in order to avoid
confusion with the new [Slice] language. For example, an "Ice struct" is short for a struct defined using Ice's Slice
language.

Ice's Slice language is described in the [Ice Manual].

## Targeting IceRPC

The Ice compiler for C# (`slice2cs`) allows you to generate code for IceRPC. If you build your project with MSBuild, add
your `.ice` files with the `SliceCompile` item type and set its `IceRpc` attribute to true, then reference the
[ZeroC.Ice.Slice.Tools] and [IceRpc.Ice] packages:

```xml
<ItemGroup>
  <SliceCompile Include="../slice/Greeter.ice" IceRpc="true" />
  <PackageReference Include="ZeroC.Ice.Slice.Tools" PrivateAssets="All" />
  <PackageReference Include="IceRpc.Ice" />
</ItemGroup>
```

Instead of setting `IceRpc="true"` on each `SliceCompile` item, you can make IceRPC the default RPC framework for all
`.ice` files in your project:

```xml
<!-- Set the default RPC framework for .ice file compilation to IceRPC -->
<ItemDefinitionGroup>
  <SliceCompile>
    <IceRpc>true</IceRpc>
  </SliceCompile>
</ItemDefinitionGroup>
```

In IceRPC mode, `slice2cs` generates C# files with the extension `.IceRpc.cs`.

{% callout %}
The [ZeroC.Ice.Slice.Tools] NuGet package provides the `slice2cs` compiler and the `SliceCompile` task; it is a
build-time-only dependency, hence `PrivateAssets="All"`. The [IceRpc.Ice] package provides the runtime integration
between IceRPC's core APIs and the generated `.IceRpc.cs` code—without it, the generated integration code does not
compile.
{% /callout %}

## Including Ice definitions shipped with IceRpc.Ice

Starting with version 0.6.1, the [IceRpc.Ice] package ships the following Ice definition files. The C# code for these
definitions is already part of the IceRpc.Ice and [IceRpc.Locator] assemblies:

| File                      | C# code in     |
| ------------------------- | -------------- |
| `Ice/Identity.ice`        | IceRpc.Ice     |
| `Ice/Locator.ice`         | IceRpc.Locator |
| `Ice/LocatorRegistry.ice` | IceRpc.Locator |
| `Ice/Process.ice`         | IceRpc.Locator |

The package adds the directory holding these files to the include directories of your `SliceCompile` items, so you can
include them in your own `.ice` files without further configuration:

```ice
#include <Ice/Identity.ice>

module Inventory
{
    interface ItemRegistry
    {
        Object* findItem(Ice::Identity identity);
        Ice::IdentitySeq listItems();
    }
}
```

Include these files, but don't add them as `SliceCompile` items: `slice2cs` generates code only for the files you
compile, and your generated code uses the existing C# types. The `Ice` module of these definitions maps to the
`IceRpc.Ice` namespace: for example, `Ice::Identity` maps to `IceRpc.Ice.Identity`, and `Ice::Locator*` maps to
`IceRpc.Ice.LocatorProxy`. If you use a definition from `Locator.ice`, `LocatorRegistry.ice` or `Process.ice`, your
project also needs a reference to the [IceRpc.Locator] package.

If you set the `IncludeDirectories` metadata on a `SliceCompile` item, keep `%(IncludeDirectories)` in its value.
Otherwise, your value replaces the include directory added by IceRpc.Ice:

```xml
<SliceCompile Include="../slice/Greeter.ice" IceRpc="true" IncludeDirectories="%(IncludeDirectories);../slice" />
```

## C# language mapping

This chapter describes how Ice definitions map to C# when targeting IceRPC. As you would expect, an Ice struct
maps to a C# record struct, an Ice class maps to a C# class, an Ice enum maps to a C# enum, an Ice field maps to a
C# property, and so on.

There are a few notable differences between the original C# mapping (when targeting Ice) and the new mapping for IceRPC:

|                        | Ice target (default)                  | IceRPC target                                            |
| ---------------------- | ------------------------------------- | -------------------------------------------------------- |
| C# identifier          | Same as the Ice identifier            | Follows C# conventions (Pascal case, camel case)         |
| C# interface           | Same as the Ice interface name        | C# interface with an `I` prefix as per C# conventions    |
| Mapping for operations | Sync and async C# methods             | Only async methods                                       |
| Mapping for fields     | C# field (default), C# property       | C# property                                              |
| Client-side mapping    | Prx interface such as `GreeterPrx`    | Interface (`IGreeter`) and proxy struct (`GreeterProxy`) |
| Server-side mapping    | Skeleton class such as `GreeterDisp_` | Service interface such as `IGreeterService`              |

[Ice Manual]: https://docs.zeroc.com/ice/3.8/csharp/the-slice-language
[Slice]: /slice
[ZeroC.Ice.Slice.Tools]: https://www.nuget.org/packages/ZeroC.Ice.Slice.Tools
[IceRpc.Ice]: https://www.nuget.org/packages/IceRpc.Ice
[IceRpc.Locator]: https://www.nuget.org/packages/IceRpc.Locator
