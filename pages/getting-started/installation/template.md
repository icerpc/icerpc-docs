---
title: Installing via .NET templates
---

The recommended way to install IceRPC is via .NET templates. These templates
are available on NuGet.org and can be installed using the `dotnet new` command:

```shell {% showTitle=false %}
dotnet new install IceRpc.Templates

## Available templates

| Template name      | Description                                                                                          |
| ------------------ | ---------------------------------------------------------------------------------------------------- |
| `icerpc-client`    | A project template for creating an IceRPC client console application.                                |
| `icerpc-server`    | A project template for creating an IceRPC server console application.                                |
| `icerpc-di-client` | A project template for creating an IceRPC client console application using Microsoft's DI container. |
| `icerpc-di-server` | A project template for creating an IceRPC server console application using Microsoft's DI container. |

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

<!-- TODO: Add next steps section with links to the project structure page -->
