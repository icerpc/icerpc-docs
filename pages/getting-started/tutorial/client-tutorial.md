---
title: Writing your first IceRPC client in C#
---

This tutorial is the second part of a two part series that shows how to create a
complete application with IceRPC for C#. We start from scratch—you just need to
have the .NET 7 SDK installed on your computer.

The first part of this tutorial showed how to
[create the server][server-tutorial]. This part shows how to create the client.

{% step title="Create the client" %}

```shell
dotnet new icerpc-slice-client -o MyClient
```

This command creates a new IceRPC client application in directory `MyClient`.

![MyClient in Visual Studio Code](/images/MyClient.png)

Let's examine each file:

### slice/Greeter.slice - the contract

This file is (and must be) identical or almost identical to the `Greeter.slice`
we used for the server:

```slice
[cs::namespace("MyClient")]
module VisitorCenter

/// Represents a simple greeter.
interface Greeter {
    /// Creates a personalized greeting.
    /// @param name: The name of the person to greet.
    /// @returns: The greeting.
    greet(name: string) -> string
}
```

The only difference with our server's `Greeter.slice` is the `cs::namespace`
attribute. That's fine: attributes don't change the contract. Here, the Slice
compiler generates the C# code in namespace `MyClient` and contract-wise, it
doesn't matter that the server uses a different namespace.

### Program.cs - the client

The main program starts by creating a connection to the server:

```csharp
// Create a simple console logger factory and configure the log level for category IceRpc.
using ILoggerFactory loggerFactory = LoggerFactory.Create(builder =>
    builder
        .AddSimpleConsole()
        .AddFilter("IceRpc", LogLevel.Debug));

await using var connection = new ClientConnection(
    new Uri("icerpc://localhost"),
    clientAuthenticationOptions: null,
    logger: loggerFactory.CreateLogger<ClientConnection>());
```

This connection naturally matches our server configuration:

- the server address is `icerpc://localhost`, meaning we connect with the
  `icerpc` protocol to `localhost` on the default port for `icerpc` (4062)
- we don't specify a transport so we use the default multiplexed transport
  (`tcp`)
- the null `clientAuthenticationOptions` means we'll establish a plain
  non-secure TCP connection

{% callout %}

Creating the connection instance does not establish the connection.

{% /callout %}

Then, the client program creates an invocation pipeline that flows into the
connection:

```csharp
Pipeline pipeline = new Pipeline()
    .UseLogger(loggerFactory)
    .UseDeadline(defaultTimeout: TimeSpan.FromSeconds(10))
    .Into(connection);
```

When we send a request, the request goes through the [Logger] interceptor and
the [Deadline] interceptor before being sent over the connection. The `Deadline`
interceptor we install here ensures the request times out after 10 seconds
without a response.

{% callout %}
The Deadline interceptor communicates with the Deadline middleware via a request
field sent alongside each request; this allows the middleware to enforce the
deadline created by the interceptor. On the other hand, the Logger interceptor
and middleware are totally independent.
{% /callout %}

Next, the client program creates a `Greeter` proxy with this invocation
pipeline:

```csharp
var greeterProxy = new GreeterProxy(pipeline);
```

`GreeterProxy` is a struct that the Slice compiler generated from Slice
interface `Greeter`. This struct allows us to send requests to a remote service
that implements `Greeter`.

With this code, the address of the target service (or
[service address][service-address]) is the default for `Greeter`, namely
`icerpc:/VisitorCenter.Greeter`. It matches the route we created in the server.
We could also create the same proxy with an explicit service address:

```csharp
var greeterProxy = new GreeterProxy(pipeline, new Uri("icerpc:/VisitorCenter.Greeter"));
```

Finally, the client sends a `greet` request, awaits the response (the greeting),
prints the greeting and shuts down the connection gracefully:

```csharp
string greeting = await greeterProxy.GreetAsync(Environment.UserName);

Console.WriteLine(greeting);
await connection.ShutdownAsync();
```

When we call `greeterProxy.GreetAsync`, the connection to the server is not yet
established: it's the `GreetAsync` call that triggers the connection
establishment.

### MyClient.csproj - the project file

The project file is identical to the server's project file, with references to 4
separate IceRpc NuGet packages:

- [IceRpc.Slice] - the IceRPC + Slice integration package
- [IceRpc.Slice.Tools] - the package that compiles `Greeter.slice` into
  `generated/Greeter.cs`
- [IceRpc.Deadline] and [IceRpc.Logger] - the packages with the two interceptors
  we installed in our invocation pipeline

{% /step %}

{% step title="Run the full application" %}

### Start the server

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

### Shutdown the server

Press Ctrl+C on the server console to shut it down.

```
dbug: IceRpc.Server[12]
      Listener 'icerpc://[::0]?transport=tcp' has stopped accepting connections
```

{% /step %}

[Deadline]: csharp:IceRpc.Deadline
[IceRpc.Deadline]: https://www.nuget.org/packages/IceRpc.Deadline
[IceRpc.Logger]: https://www.nuget.org/packages/IceRpc.Logger
[IceRpc.Slice.Tools]: https://www.nuget.org/packages/IceRpc.Slice.Tools
[IceRpc.Slice]: https://www.nuget.org/packages/IceRpc.Slice
[Logger]: csharp:IceRpc.Logger
[server-tutorial]: /getting-started/tutorial/server-tutorial
[service-address]: /icerpc/invocation/service-address
