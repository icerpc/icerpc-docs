---
title: Using the IceRPC .NET project templates
---

## Template installation

The easiest way to create a new project configured for IceRPC is by using a .NET project template. You can install the
IceRPC project templates with the following [dotnet new] command:

```shell {% showTitle=false %}
dotnet new install IceRpc.Templates
```

## Template list

| Template name               | Description                                                                                                     |
|-----------------------------|-----------------------------------------------------------------------------------------------------------------|
| `icerpc-protobuf-client`    | A project template for creating an IceRPC + Protobuf client console application.                                |
| `icerpc-protobuf-server`    | A project template for creating an IceRPC + Protobuf server console application.                                |
| `icerpc-protobuf-di-client` | A project template for creating an IceRPC + Protobuf client console application using Microsoft's DI container. |
| `icerpc-protobuf-di-server` | A project template for creating an IceRPC + Protobuf server console application using Microsoft's DI container. |
| `icerpc-slice-client`       | A project template for creating an IceRPC + Slice client console application.                                   |
| `icerpc-slice-server`       | A project template for creating an IceRPC + Slice server console application.                                   |
| `icerpc-slice-di-client`    | A project template for creating an IceRPC + Slice client console application using Microsoft's DI container.    |
| `icerpc-slice-di-server`    | A project template for creating an IceRPC + Slice server console application using Microsoft's DI container.    |

## Using the templates

You use the IceRPC templates with the standard `dotnet new <template>` command.

For example, you can create a new project named `MyProtobufClient` for an IceRPC + Protobuf client application with:

```shell {% showTitle=false %}
dotnet new icerpc-protobuf-client -o MyProtobufClient
```
