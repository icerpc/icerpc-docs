---
title: How to add IceRPC to an existing C# project?
---

IceRPC for C# is distributed as [NuGet][nuget] packages. To add IceRPC to an existing C# project, just add one or
more IceRpc NuGet packages to this project.

[Full list of IceRpc NuGet packages][full-list]

You always need the base package, `IceRpc`:

```shell
dotnet add package IceRpc
```

If you plan on using [Slice][slice], add package `IceRpc.Slice.Tools`:

```shell
dotnet add package IceRpc.Slice.Tools
```

{% callout %}
The Slice compiler included in `IceRpc.Slice.Tools` generates C# code that depends on the `IceRpc` package. You need
`IceRpc.Slice.Tools` only during development.
{% /callout %}

Even though all the other packages are optional, it's likely you will want to install one or more of them. For example,
add package `IceRpc.Transports.Quic` to use the QUIC transport:

```shell
dotnet add package IceRpc.Transport.Quic
```

And add package `IceRpc.Logger` to use the Logger interceptor or middleware:

```shell
dotnet add package IceRpc.Logger
```

[full-list]: nuget-packages
[nuget]: https://www.nuget.org/
[packages]: nuget-packages
[slice]: ../../slice
