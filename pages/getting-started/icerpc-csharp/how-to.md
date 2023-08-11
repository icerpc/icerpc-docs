---
title: How to add IceRPC to an existing C# project?
---

IceRPC for C# is distributed as [NuGet] packages. To add IceRPC to an existing C# project, just add one or
more IceRpc NuGet packages to this project.

{% divider /%}

[Full list of IceRpc NuGet packages][full-list]

{% divider /%}

You always need the base package, [IceRpc]

```
dotnet add package IceRpc
```

If you plan on using [Slice], add the [IceRpc.Slice] and [IceRpc.Slice.Tools] packages.

```
dotnet add package IceRpc.Slice
dotnet add package IceRpc.Slice.Tools
```

{% callout %}
The Slice compiler included in `IceRpc.Slice.Tools` generates C# code that depends on the `IceRpc.Slice` package. You
need `IceRpc.Slice.Tools` only during development.
{% /callout %}

Even though all the other packages are optional, it's likely you will want to install one or more of them. For example,
add package [IceRpc.Transports.Quic] to use the QUIC transport:

```
dotnet add package IceRpc.Transports.Quic
```

[full-list]: nuget-packages
[Slice]: /slice

[nuget]: https://www.nuget.org/
[IceRpc]: https://www.nuget.org/packages/IceRpc
[IceRpc.Slice]: https://www.nuget.org/packages/IceRpc.Slice
[IceRpc.Slice.Tools]: https://www.nuget.org/packages/IceRpc.Slice.Tools
[IceRpc.Transports.Quic]: https://www.nuget.org/packages/IceRpc.Transports.Quic
