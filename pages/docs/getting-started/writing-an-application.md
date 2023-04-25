---
title: Writing your first IceRPC .NET application
---

This document explains how to create IceRPC .NET server and client application that communicate with each other using
RPC (remote procedure calls).

## Prerequisites

- [Visual Studio Code](https://code.visualstudio.com/download)
- [.NET 7 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/7.0)
- [IceRPC .NET Project Templates](https://www.nuget.org/packages/IceRpc.ProjectTemplates)

## Creating a Server Application

- Open a command prompt and change to the directory that will contain the project.
- Run the following command to create the server project:

```shell
dotnet new icerpc-server -o GreeterServer
code -n GreeterServer
```

- The `dotnet new` command creates a new IceRPC sever project using the `icerpc-server` template in the `GreeterSerer`
folder.

- The `code -n GreeterServer` opens the GreeterServer folder in a new Visual Studio Code window.

## Server Project Contents

- `Greeter.slice`: defines the API for the `Greeter` IceRPC service.
- `Chatbot.cs`: implements the `Greeter` IceRPC service.
- `Program.cs`: the server application entry point.
- `Program.CancelKeyPressed.cs`: a program extension for handling cancel key press events.

## Running the Server

```shell
dotnet run --project GreeterServer\GreeterServer.csproj
```

## Creating a Client Application

- Open a command prompt and change to the directory that will contain the project.
- Run the following command to create the client project:

```shell
dotnet new icerpc-client -o GreeterClient
code -n GreeterClient
```

- The `dotnet new` command creates a new IceRPC client project using the `icerpc-client` template in the `GreeterClient`
folder.

- The `code -n GreeterClient` opens the GreeterClient folder in a new Visual Studio Code window.

## Client Project Contents

- `Greeter.slice`: defines the API for the `Greeter` IceRPC service.
- `Program.cs`: the client application entry point.

## Running the Client

```shell
dotnet run --project GreeterClient\GreeterClient.csproj
```

The client sends a `Greet` request to the server, and the server responds with a custom greeting message.