---
title: Using the IceRPC .NET Project Templates
---

The easiest way to create a new project configured for IceRPC is by using a .NET
project template. You can install the IceRPC project templates using the
following `dotnet new` command:

```shell {% showTitle=false %}
dotnet new install IceRpc.Templates
```

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
```

### Create a command line client application:

```shell {% showTitle=false %}
dotnet new icerpc-client -o MyClient
```

For additional information on the templates, see

- <https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-new>
- <https://github.com/dotnet/templating/wiki>

<!-- TODO: Add next steps section with links to the project structure page -->
