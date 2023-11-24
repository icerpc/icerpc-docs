---
title: Adding IceRPC to an existing project
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

Adding [IceRpc.Slice] automatically pulls its dependencies, including the [IceRpc] and [ZeroC.Slice] packages.

{% callout %}
The Slice compiler included in `IceRpc.Slice.Tools` generates C# code that depends on the `ZeroC.Slice` and
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
The protoc compiler included in `IceRpc.Protobuf.Tools` generates C# code that depends on the `Google.Protobuf` and
`IceRpc.Protobuf` packages. You need `IceRpc.Protobuf.Tools` only during development.
{% /callout %}

## IceRPC only

If you plan on using IceRPC with JSON, Protobuf, or some other serialization format, add the [IceRpc] package to your
project with the following command:

```shell {% showTitle=false %}
dotnet add package IceRpc
```

## Adding optional packages

Even though all the other packages are optional, it's likely you will want to
add one or more of them to your project. For example, you can add the package
[IceRpc.Transports.Quic] to use the QUIC transport with the following command:

```shell {% showTitle=false %}
dotnet add package IceRpc.Transports.Quic
```

The full list of IceRPC packages is available on the [next page][full-list].

[full-list]: nuget-packages
[Google.Protobuf]: https://www.nuget.org/packages/Google.Protobuf
[IceRpc.Protobuf.Tools]: https://www.nuget.org/packages/IceRpc.Protobuf.Tools
[IceRpc.Protobuf]: https://www.nuget.org/packages/IceRpc.Protobuf
[IceRpc.Slice.Tools]: https://www.nuget.org/packages/IceRpc.Slice.Tools
[IceRpc.Slice]: https://www.nuget.org/packages/IceRpc.Slice
[IceRpc.Transports.Quic]: https://www.nuget.org/packages/IceRpc.Transports.Quic
[IceRpc]: https://www.nuget.org/packages/IceRpc
[nuget]: https://www.nuget.org/
[Protobuf]: https://protobuf.dev/
[Slice]: /slice
[ZeroC.Slice]: https://www.nuget.org/packages/ZeroC.Slice
