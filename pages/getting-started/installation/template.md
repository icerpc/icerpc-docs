---
title: Use the IceRPC .NET Project Templates
---

If you are starting a new project the recommended way to install IceRPC is via
.NET templates. These templates are available on NuGet.org and can be installed
using the `dotnet new` command:

```shell {% showTitle=false %}
dotnet new install IceRpc.Templates
```

If you are adding IceRPC to an existing project, see the
[Add IceRPC using using NuGet](./existing-project) page.

## Available templates

| Template name      | Description                                                                                                  |
| ------------------ | ------------------------------------------------------------------------------------------------------------ |
| `icerpc-client`    | A project template for creating an IceRPC + Slice client console application.                                |
| `icerpc-server`    | A project template for creating an IceRPC + Slice server console application.                                |
| `icerpc-di-client` | A project template for creating an IceRPC + Slice client console application using Microsoft's DI container. |
| `icerpc-di-server` | A project template for creating an IceRPC + Slice server console application using Microsoft's DI container. |

### Create a command line server application:

```shell {% showTitle=false %}
dotnet new icerpc-server -o MyServer
cd MyServer
dotnet build
dotnet run
```

### Create a command line client application:

```shell {% showTitle=false %}
dotnet new icerpc-client -o MyClient
cd MyClient
dotnet build
dotnet run
```

For additional information on the templates, see

- <https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-new>
- <https://github.com/dotnet/templating/wiki>

<!-- TODO: Add next steps section with links to the project structure page -->
