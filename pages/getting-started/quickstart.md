---
title: Quickstart
description: Effortlessly jump into IceRPC
---

This quickstart shows how to quickly get up and running with a complete
application with IceRPC for C# using the IceRPC .NET Project Templates.
We start from scratch—you just need to have the .NET 7 SDK installed on your
computer.

If you would like a more in-depth tutorial, you can follow

- [Writing your first server application][server-tutorial]
- [Writing your first client application][client-tutorial]

---

The networked application we are building together consists of:

- a server that hosts a single service (a simple greeter service)
- a client that establishes a connection to the server and calls `greet` on
  this greeter service

The client and server are console applications that use plain .NET (no ASP.NET,
no Dependency Injection).

Let's jump right in:

{% step title="Install the dotnet-new templates for IceRPC" %}

```shell {% showTitle=false %}
dotnet new install IceRpc.Templates
```

{% /step %}

{% step title="Create the server" %}

Now, let's create the server application by using the `icerpc-slice-server`
template we installed in the previous step:

```shell
dotnet new icerpc-slice-server -o MyServer
```

This command creates a new IceRPC + Slice server application application in
directory `MyServer`.

![MyServer in Visual Studio Code](/images/MyServer.png)

{% /step %}

{% step title="Create the client" %}

Similarly, let's create the client application:

```shell
dotnet new icerpc-slice-client -o MyClient
```

This command creates a new IceRPC + Slice client application in directory
`MyClient`.

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
Hello, Reece!
dbug: IceRpc.ClientConnection[6]
      Client connection from '[::1]:61582' to '[::1]:4062' shutdown
dbug: IceRpc.ClientConnection[5]
      Client connection from '[::1]:61582' to '[::1]:4062' disposed
```

{% /step %}

## Next steps

Congratulations! You have successfully created your first IceRPC application.
We recommend you to continue with by reading the following to learn more about
what each file produced by the template does in the full client and server
tutorials:

- [Writing your first server][server-tutorial]
- [Writing your first client][client-tutorial]

[client-tutorial]: /getting-started/tutorial/server-client
[server-tutorial]: /getting-started/tutorial/server-tutorial
