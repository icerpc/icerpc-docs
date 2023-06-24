---
title: "Tutorial: Writing your first IceRPC application in C#"
---

This document explains how to create IceRPC client and server applications in C#, which communicate with each other using
RPC (remote procedure calls).

## Prerequisites

- [.NET 7 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/7.0)
- [IceRPC .NET Project Templates](https://www.nuget.org/packages/IceRpc.ProjectTemplates)

## Creating the server project

Open a command prompt and change to the directory that will contain your server project, then run the following command to
create the server project:

```shell
dotnet new icerpc-server -o MyServer
```

The `dotnet new` command creates a new IceRPC server command line application using the `icerpc-server` project template in
`MyServer` folder.

## Server project contents

The server project contains the following files:

- `Greeter.slice`: Slice source definitions for the `Greeter` IceRPC service.
- `Chatbot.cs`: C# implementation of the `Greeter` IceRPC service.
- `Program.cs`: Server application entry point.
- `Program.CancelKeyPressed.cs`: Program class extension for handling cancel key press events.
- `MyServer.csproj`: The project file.

## Running the server application

You can start the server application by running the following command:

```shell
dotnet run --project MyServer\MyServer.csproj
```

The log shows the server started accepting connections:

```shell
dbug: IceRpc.Server[11]
      Listener 'icerpc://[::0]?transport=tcp' has started accepting connections
```

## Creating the client project

Open a command prompt and change to the directory that will contain your client project, then run the following command to
create the client project:

```shell
dotnet new icerpc-client -o MyClient
```

The `dotnet new` command creates a new IceRPC client command line application using the `icerpc-client` project template in
`MyClient` folder.

## Client Project Contents

The client project contains the following files:

- `Greeter.slice`: defines the API for the `Greeter` IceRPC service.
- `Program.cs`: the client application entry point.
- `MyClient.csproj`: The project file.

## Running the client application

You can start the client application by running the following command:

```shell
dotnet run --project MyClient\MyClient.csproj
```

The client sends a `Greet` request to the server, and the server responds with a custom greeting message. The logs shows the
client creates a connection, sends a request, and shutdown the connection.

```shell
dbug: IceRpc.ClientConnection[3]
      Client connection from '[::1]:61582' to '[::1]:4062' connected
info: IceRpc.Logger.LoggerInterceptor[0]
      Sent request greet to icerpc:/GreeterExample.Greeter over [::1]:61582<->[::1]:4062 and received a response with status code Success
Hello, jose!
dbug: IceRpc.ClientConnection[6]
      Client connection from '[::1]:61582' to '[::1]:4062' shutdown
dbug: IceRpc.ClientConnection[5]
      Client connection from '[::1]:61582' to '[::1]:4062' disposed
```
