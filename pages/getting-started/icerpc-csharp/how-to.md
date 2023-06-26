---
title: How to add IceRPC to an existing C# project?
---

IceRPC for C# is distributed as [NuGet packages][packages]. To add IceRPC to an existing C# project, just add one or
more NuGet packages to this project.

You always need the base package, `IceRpc`:

```shell
dotnet add package IceRpc
```

If you plan to use [Slice][slice], add the `IceRpc.Slice.Tools` package:

```shell
dotnet add package IceRpc.Slice.Tools
```

All the other packages are optional but it's likely you will want to install one or more of them. For example, add
`IceRpc.Transports.Quic` to use the QUIC transport:

```shell
dotnet add package IceRpc.Transport.Quic
```

And add `IceRpc.Logger` to use the Logger interceptor or middleware:

```shell
dotnet add package IceRpc.Logger
```

[packages]: nuget-packages
[slice]: ../../slice
