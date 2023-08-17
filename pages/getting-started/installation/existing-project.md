---
title: Adding IceRPC to an existing project
---

IceRPC for C# is distributed as [NuGet] packages. To add IceRPC to an existing
C# project, just add one or more [IceRpc NuGet packages][full-list] to this
project.

## Installing the Base Package

If you plan on using IceRPC without Slice you need to install the
base package: [IceRpc]. To install it, use the following
command:

```shell {% showTitle=false %}
dotnet add package IceRpc
```

## Using Slice with IceRPC

If you plan on using [Slice], install the [IceRpc.Slice] and
[IceRpc.Slice.Tools] packages with the following commands:

```shell {% showTitle=false %}
dotnet add package IceRpc.Slice
dotnet add package IceRpc.Slice.Tools
```

[IceRpc.Slice] will automatically install the [IceRpc] package as a
dependency.

{% callout %}
The Slice compiler included in `IceRpc.Slice.Tools` generates C# code that
depends on the `IceRpc.Slice` package. You need `IceRpc.Slice.Tools` only during
development.
{% /callout %}

## Adding optional packages

Even though all the other packages are optional, it's likely you will want to
install one or more of them. For example, you can add the package
[IceRpc.Transports.Quic] to use the QUIC transport with the following command:

```shell {% showTitle=false %}
dotnet add package IceRpc.Transports.Quic
```

The full list of IceRPC packages is available [here][full-list].

[full-list]: nuget-packages
[Slice]: /slice
[nuget]: https://www.nuget.org/
[IceRpc]: https://www.nuget.org/packages/IceRpc
[IceRpc.Slice]: https://www.nuget.org/packages/IceRpc.Slice
[IceRpc.Slice.Tools]: https://www.nuget.org/packages/IceRpc.Slice.Tools
[IceRpc.Transports.Quic]: https://www.nuget.org/packages/IceRpc.Transports.Quic
