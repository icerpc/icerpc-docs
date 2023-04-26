---
title: Writing your first IceRPC application in C#
---

This document explains how to create IceRPC client and server applications in C#, which communicate with each other using
RPC (remote procedure calls).

## Prerequisites

- [Visual Studio Code](https://code.visualstudio.com/download)
- [.NET 7 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/7.0)
- [IceRPC .NET Project Templates](https://www.nuget.org/packages/IceRpc.ProjectTemplates)

## Creating the server project

Open a command prompt and change to the directory that will contain your server project, then run the following command to
create the server project:

```shell
dotnet new icerpc-server -o GreeterServer
```

The `dotnet new` command creates a new IceRPC sever project using the `icerpc-server` project template in the
`GreeterSerer` folder.

Open the project in Visual Studio Code using the following command:

```shell
code -n GreeterServer
```

This will open the GreeterServer folder in a new Visual Studio Code window.

## Server project contents

The server project contains the following files:

- `Greeter.slice`: Slice source definitions for the `Greeter` IceRPC service.
- `Chatbot.cs`: C# implementation of the `Greeter` IceRPC service.
- `Program.cs`: Server application entry point.
- `Program.CancelKeyPressed.cs`: Program class extension for handling cancel key press events.
- `GreeterServer.csproj`: The project file.

## Running the server application

You can start the server application by running the following command:

```shell
dotnet run --project GreeterServer\GreeterServer.csproj
```

## Creating the client project

Open a command prompt and change to the directory that will contain your client project, then run the following command to
create the client project:

```shell
dotnet new icerpc-client -o GreeterClient
```

The `dotnet new` command creates a new IceRPC client project using the `icerpc-client` project template in the
`GreeterClient` folder.

Open the project in Visual Studio Code using the following command:

```shell
code -n GreeterClient
```

This will open the GreeterClient folder in a new Visual Studio Code window.

## Client Project Contents

The client project contains the following files:

- `Greeter.slice`: defines the API for the `Greeter` IceRPC service.
- `Program.cs`: the client application entry point.
- `GreeterClient.csproj`: The project file.

## Running the client application

You can start the client application by running the following command:

```shell
dotnet run --project GreeterClient\GreeterClient.csproj
```

The client sends a `Greet` request to the server, and the server responds with a custom greeting message.
