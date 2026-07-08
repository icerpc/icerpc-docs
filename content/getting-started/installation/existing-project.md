---
title: Adding IceRPC to an existing project
description: Learn how to get IceRPC set up in your existing project.
---

IceRPC for C# is distributed as [NuGet] packages. To add IceRPC to an existing C# project, just add one or more
[IceRpc NuGet packages][full-list] to this project.

## IceRPC and Slice packages

If you plan on using IceRPC together with [Slice], add the [IceRpc.Slice] and [IceRpc.Slice.Tools] packages to your
project with the following commands:

```shell {% showTitle=false %}
dotnet add package IceRpc.Slice
dotnet add package IceRpc.Slice.Tools
```

Adding [IceRpc.Slice] automatically pulls its dependencies, including the [IceRpc] and [ZeroC.Slice.Codec] packages.

{% callout %}
The Slice code generators included in `IceRpc.Slice.Tools` generate C# code that depends on the `ZeroC.Slice.Codec` and
`IceRpc.Slice` packages. You need `IceRpc.Slice.Tools` only during development.
{% /callout %}

## IceRPC and Protobuf packages

If you plan on using IceRPC together with [Protobuf], add the [IceRpc.Protobuf] and [IceRpc.Protobuf.Tools] packages to
your project with the following commands:

```shell {% showTitle=false %}
dotnet add package IceRpc.Protobuf
dotnet add package IceRpc.Protobuf.Tools
```

Adding [IceRpc.Protobuf] automatically pulls its dependencies, including the [IceRpc] and [Google.Protobuf] packages.

{% callout %}
The protoc compiler and the protoc-gen-icerpc-csharp generator included in `IceRpc.Protobuf.Tools` generate C# code
that depends on the `Google.Protobuf` and `IceRpc.Protobuf` packages. You need `IceRpc.Protobuf.Tools` only during
development.
{% /callout %}

## IceRPC and Ice packages

If you plan on using IceRPC to communicate with [Ice] applications—or to compile Ice's Slice (`.ice`) files
directly—add the [IceRpc.Ice] and [ZeroC.Ice.Slice.Tools] packages to your project with the following commands:

```shell {% showTitle=false %}
dotnet add package IceRpc.Ice
dotnet add package ZeroC.Ice.Slice.Tools
```

Adding [IceRpc.Ice] automatically pulls its dependencies, including the [IceRpc] package.

{% callout %}
[ZeroC.Ice.Slice.Tools] is an Ice package that provides the `slice2cs` compiler and the `SliceCompile` task. The code it
generates from your `.ice` files depends on the `IceRpc.Ice` package. You need `ZeroC.Ice.Slice.Tools` only during
development. See [Mapping Ice to C# with IceRPC][ice-mapping] for the project-file setup.
{% /callout %}

## IceRPC only

If you plan on using IceRPC with JSON, or some other serialization format, add the [IceRpc] package to your project with
the following command:

```shell {% showTitle=false %}
dotnet add package IceRpc
```

## Adding optional packages

Even though all the other packages are optional, it's likely you will want to add one or more of them to your project.
For example, you can add the package [IceRpc.Logger] to use the Logger interceptor and middleware:

```shell {% showTitle=false %}
dotnet add package IceRpc.Logger
```

The full list of IceRPC packages is available on the [next page][full-list].

## Build telemetry

The Slice and Protobuf toolchains—[IceRpc.Slice.Tools] and [IceRpc.Protobuf.Tools]—collect anonymous build telemetry by
default. During the compilation of your Slice or Protobuf files, a build plug-in sends anonymous data over a secure
connection to the IceRPC build telemetry server. This data includes:

- The versions of the compiler and code generators.
- The operating system, version, and platform architecture.
- The .NET SDK version used by the build.
- Whether the build ran in a continuous integration (CI) environment.
- Counts of the interfaces/services, operations/RPCs, and types/messages in the compilation.

The IceRPC team uses this data to understand how the tools are used and to prioritize future development; it is stored in
a private database and not shared with any third parties.

To opt out, set the `IceRpcBuildTelemetry` property to `false` in your project file:

```xml
<PropertyGroup>
  <IceRpcBuildTelemetry>false</IceRpcBuildTelemetry>
</PropertyGroup>
```

This suppresses all telemetry collection by removing the build telemetry plug-in from the compilation pipeline. For the
exact data collected by each toolchain, see the [IceRpc.Slice.Tools][slice-tools-readme] and
[IceRpc.Protobuf.Tools][protobuf-tools-readme] READMEs.

[full-list]: nuget-packages
[slice-tools-readme]: https://github.com/icerpc/icerpc-csharp/tree/0.6.x/src/IceRpc.Slice.Tools/README.md
[protobuf-tools-readme]: https://github.com/icerpc/icerpc-csharp/tree/0.6.x/src/IceRpc.Protobuf.Tools/README.md
[ice-mapping]: /icerpc-for-ice-users/ice-definitions/language-mapping
[IceRpc.Logger]: https://www.nuget.org/packages/IceRpc.Logger
[IceRpc.Ice]: https://www.nuget.org/packages/IceRpc.Ice
[ZeroC.Ice.Slice.Tools]: https://www.nuget.org/packages/ZeroC.Ice.Slice.Tools
[Ice]: /icerpc-for-ice-users
[Google.Protobuf]: https://www.nuget.org/packages/Google.Protobuf
[IceRpc.Protobuf.Tools]: https://www.nuget.org/packages/IceRpc.Protobuf.Tools
[IceRpc.Protobuf]: https://www.nuget.org/packages/IceRpc.Protobuf
[IceRpc.Slice.Tools]: https://www.nuget.org/packages/IceRpc.Slice.Tools
[IceRpc.Slice]: https://www.nuget.org/packages/IceRpc.Slice
[IceRpc]: https://www.nuget.org/packages/IceRpc
[nuget]: https://www.nuget.org/
[Protobuf]: https://protobuf.dev/
[Slice]: /slice
[ZeroC.Slice.Codec]: https://www.nuget.org/packages/ZeroC.Slice.Codec
