---
title: 'Quickstart'
description: 'Writing your first IceRPC application in C#'
---

This tutorial shows how to create a complete application with IceRPC for C#
using the IceRPC .NET Project Templates. We start from scratch—you just need to
have the .NET 7 SDK or .NET 8 SDK installed on your computer.

If you would like to jump into building the same application without using the
templates, you can follow the [Writing your first application][csharp-tutorial]
tutorial instead.

The networked application we are building together consists of:

- a server that hosts a single service (a simple greeter service)
- a client that establishes a connection to the server and calls `greet` on
  this greeter service

The client and server are console applications that use plain .NET (no ASP.NET,
no Dependency Injection).

Let's jump right in:

{% step title="Install the dotnet-new templates for IceRPC" %}

We will use the `IceRPC Client` and `IceRPC Server` .NET project templates for
this tutorial.

```shell {% showTitle=false %}
dotnet new install IceRpc.Templates
```

{% /step %}

{% step title="Create the server" %}

Now, let's create the server application by using the template we installed in
the previous step:

```shell
dotnet new icerpc-server -o MyServer
```

This command creates a new IceRPC server application in directory `MyServer`.

![MyServer in Visual Studio Code](/images/MyServer.png)

{% /step %}

{% step title="Create the client" %}

Similarly, let's create the client application:

```shell
dotnet new icerpc-client -o MyClient
```

This command creates a new IceRPC client application in directory `MyClient`.

![MyClient in Visual Studio Code](/images/MyClient.png)

{% /step %}

{% step title="Run the application" %}

Now that we have created both the client and server applications, we can run
them.

### Start the server

Navigate to the server directory and run the server:

```shell
cd MyServer
dotnet run
```

The server is now listening for new connections from clients:

```
dbug: IceRpc.Server[11]
      Listener 'icerpc://[::0]?transport=tcp' has started accepting connections
```

### Start the client

Now, navigate to the client directory and run the client:

```shell
cd MyClient
dotnet run
```

The client sends a single `greet` request to the service hosted by our server:

```
dbug: IceRpc.ClientConnection[3]
      Client connection from '[::1]:61582' to '[::1]:4062' connected
info: IceRpc.Logger.LoggerInterceptor[0]
      Sent request greet to icerpc:/VisitorCenter.Greeter over
      [::1]:61582<->[::1]:4062 and received a response with status code Ok
Hello, jose!
dbug: IceRpc.ClientConnection[6]
      Client connection from '[::1]:61582' to '[::1]:4062' shutdown
dbug: IceRpc.ClientConnection[5]
      Client connection from '[::1]:61582' to '[::1]:4062' disposed
```

### Shutdown the server

Press Ctrl+C on the server console to shut it down.

```
dbug: IceRpc.Server[12]
      Listener 'icerpc://[::0]?transport=tcp' has stopped accepting connections
```

{% /step %}

[csharp-tutorial]: /getting-started/using-icerpc/tutorial
[dispatch-pipeline]: /icerpc/dispatch/dispatch-pipeline
[service-address]: /icerpc/invocation/service-address
[Slice]: /slice
[IceRpc.Slice]: https://www.nuget.org/packages/IceRpc.Slice
[IceRpc.Slice.Tools]: https://www.nuget.org/packages/IceRpc.Slice.Tools
[IceRpc.Deadline]: https://www.nuget.org/packages/IceRpc.Deadline
[IceRpc.Logger]: https://www.nuget.org/packages/IceRpc.Logger
[Deadline]: csharp:IceRpc.Deadline
[Logger]: csharp:IceRpc.Logger
[Router]: csharp:IceRpc.Router
[Server]: csharp:IceRpc.Server
[NotFound]: csharp:IceRpc.StatusCode#NotFound
