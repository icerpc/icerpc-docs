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

You use the IceRPC templates with the standard `dotnet new <template>` command. All IceRPC templates offer the
following template options:

```
-F, --Framework <net8.0|net9.0>  The target framework for the project.
                                 Type: choice
                                   net8.0  Target net8.0
                                   net9.0  Target net9.0
                                 Default: net8.0
--no-restore                     If specified, skips the automatic restore of the project on create.
                                 Type: bool
                                 Default: false
-tr, --transport <quic|tcp>      The transport to use for IceRPC connections.
                                 Type: choice
                                   quic  Use the QUIC transport
                                   tcp   Use the TCP transport
                                 Default: tcp
```

For example, you can create a new project named `MyProtobufClient` for an IceRPC + Protobuf client application that
targets the .NET 9.0 framework and uses the QUIC transport with the following command:

```shell {% showTitle=false %}
dotnet new icerpc-protobuf-client -o MyProtobufClient -F net9.0 --transport quic
```

[dotnet new]: https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-new
