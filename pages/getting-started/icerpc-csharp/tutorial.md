---
title: 'Tutorial: Writing your first IceRPC application in C#'
---

This tutorial shows how to create a complete application with IceRPC for C#. We start from scratch—you just need to have
the .NET 7 SDK or .NET 8 SDK installed on your computer.

The networked application we are building together consists of:

- a server that hosts a single service (a simple greeter service)
- a client that establishes a connection to the server and calls `greet` on this greeter service

The client and server are console applications that use plain .NET (no ASP.NET, no Dependency Injection).

Let's jump right in:

{% step title="Install the dotnet-new templates for IceRPC" %}

We use templates `IceRPC Client` and `IceRPC Server` for this tutorial.

```shell
dotnet new install IceRpc.Templates
```

{% /step %}

{% step title="Create the server" %}

```shell
dotnet new icerpc-server -o MyServer
```

This command creates a new IceRPC server application in directory `MyServer`.

![MyServer in Visual Studio Code](/images/MyServer.png)

Let's examine each file:

### slice/Greeter.slice - the contract

This file holds the contract between our client and server applications, specified with the [Slice] language.
It's a simple greeter:

```slice
[cs::namespace("MyServer")]
module VisitorCenter

/// Represents a simple greeter.
interface Greeter {
    /// Creates a personalized greeting.
    /// @param name: The name of the person to greet.
    /// @returns: The greeting.
    greet(name: string) -> string
}
```

The `cs::namespace` attribute instructs the Slice compiler to map module `VisitorCenter` to C# namespace `MyServer` (our
project name) instead of the default (`VisitorCenter`).

If you use this code as the starting point for a new application, you should update this interface to represent
something meaningful for your application. For this tutorial, we just keep `Greeter` as-is.

### Chatbot.cs - the service implementation

Class Chatbot is a service that implements Slice interface `Greeter`:

```csharp
internal class Chatbot : Service, IGreeterService
{
    public ValueTask<string> GreetAsync(string name, IFeatureCollection features, CancellationToken cancellationToken)
    {
        Console.WriteLine($"Dispatching greet request {{ name = '{name}' }}");
        return new($"Hello, {name}!");
    }
}
```

The Slice compiler generates C# interface `IGreeterService` from Slice interface `Greeter`. This C# interface
is a template: we implement `Greeter` by implementing this interface. As you can see above, the `greet` operation
becomes a `GreetAsync` method with two additional parameters.

Since we always fulfill `greet` synchronously, the `GreetAsync` implementation is not marked `async`. We could write the
return statement as:

```csharp
    return new ValueTask<string>($"Hello, {name}!");
```

However, it's more convenient to elide the type name, especially when this type is complicated.

### Program.cs - the dispatch pipeline and the server logic

The main program starts by creating and configuring a [Router]:

```csharp
// Create a simple console logger factory and configure the log level for category IceRpc.
using ILoggerFactory loggerFactory = LoggerFactory.Create(builder =>
    builder
        .AddSimpleConsole()
        .AddFilter("IceRpc", LogLevel.Debug));

Router router = new Router()
    .UseLogger(loggerFactory)
    .UseDeadline()
    .Map<IGreeterService>(new Chatbot());
```

This router corresponds to our [dispatch pipeline][dispatch-pipeline]: when we receive a request, we first give it to
the [Logger] middleware, then to the [Deadline] middleware and finally we route this request based on its path.

The `Map` call means if the request's path is the default path for Slice interface `Greeter`, route it to the `Chatbot`
instance. Otherwise, the router returns a response with status code [NotFound].

The default path for `Greeter` is `/VisitorCenter.Greeter` (it uses the Slice module name and interface name). The `Map`
call above is a shortcut for:

```csharp
.Map("/VisitorCenter.Greeter", new Chatbot());
```

The main program then creates a [Server] that directs all incoming requests to `router`:

```csharp
await using var server = new Server(
    dispatcher: router,
    serverAuthenticationOptions: null,
    logger: loggerFactory.CreateLogger<Server>());
```

We don't specify a server address so this server uses the default server address (`icerpc://[::0]`). This means the
new server uses the `icerpc` protocol and will listen for connections on all network interfaces with the default port
for `icerpc` (4062).

We don't specify a transport either so we use the default multiplexed transport (`tcp`). The null
`serverAuthenticationOptions` means this server will accept plain TCP connections—it's a simple, non-secure server.

At this point, the server is created but is not doing anything yet. A client attempting to connect would get a
"connection refused" error.

The server starts listening on the next line:

```csharp
server.Listen();
```

`Listen` returns as soon as the server is listening (so almost immediately).

The main program then awaits until it receives a Ctrl+C. After it receives Ctrl+C, it shuts down the server gracefully:

```csharp
await CancelKeyPressed;
await server.ShutdownAsync();
```

### Program.CancelKeyPressed.cs - small Ctrl+C helper

This file contains a few lines of code that `Programs.cs` uses to wait for Ctrl+C. It's not related to RPCs.

### MyServer.csproj - the project file

The project file is straightforward. It contains references to 4 separate IceRpc NuGet packages:

- [IceRpc.Slice] - the IceRPC + Slice integration package
- [IceRpc.Slice.Tools] - the package that compiles `Greeter.slice` into `generated/Greeter.cs`
- [IceRpc.Deadline] and [IceRpc.Logger] - the packages with the two middleware we installed in the dispatch pipeline

{% /step %}

{% step title="Create the client" %}

```shell
dotnet new icerpc-client -o MyClient
```

This command creates a new IceRPC client application in directory `MyClient`.

![MyClient in Visual Studio Code](/images/MyClient.png)

Let's examine each file:

### slice/Greeter.slice - the contract

This file is (and must be) identical or almost identical to the `Greeter.slice` we used for the server:

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

The only difference with our server's `Greeter.slice` is the `cs::namespace` attribute. That's fine: attributes don't
change the contract. Here, the Slice compiler generates the C# code in namespace `MyClient` and contract-wise, it
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

- the server address is `icerpc://localhost`, meaning we connect with the `icerpc` protocol to `localhost` on the
  default port for `icerpc` (4062)
- we don't specify a transport so we use the default multiplexed transport (`tcp`)
- the null `clientAuthenticationOptions` means we'll establish a plain non-secure TCP connection

{% callout %}
Creating the connection instance does not establish the connection.
{% /callout %}

Then, the client program creates an invocation pipeline that flows into the connection:

```csharp
Pipeline pipeline = new Pipeline()
    .UseLogger(loggerFactory)
    .UseDeadline(defaultTimeout: TimeSpan.FromSeconds(10))
    .Into(connection);
```

When we send a request, the request goes through the [Logger] interceptor and the [Deadline] interceptor before being
sent over the connection. The `Deadline` interceptor we install here ensures the request times out after 10 seconds
without a response.

{% callout %}
The Deadline interceptor communicates with the Deadline middleware via a request field sent alongside each request;
this allows the middleware to enforce the deadline created by the interceptor. On the other hand, the Logger
interceptor and middleware are totally independent.
{% /callout %}

Next, the client program creates a `Greeter` proxy with this invocation pipeline:

```csharp
var greeterProxy = new GreeterProxy(pipeline);
```

`GreeterProxy` is a struct that the Slice compiler generated from Slice interface `Greeter`. This struct allows us to
send requests to a remote service that implements `Greeter`.

With this code, the address of the target service (or [service address][service-address]) is the default for `Greeter`,
namely `icerpc:/VisitorCenter.Greeter`. It matches the route we created in the server. We could also create the same
proxy with an explicit service address:

```csharp
var greeterProxy = new GreeterProxy(pipeline, new Uri("icerpc:/VisitorCenter.Greeter"));
```

Finally, the client sends a `greet` request, awaits the response (the greeting), prints the greeting and shuts down the
connection gracefully:

```csharp
string greeting = await greeterProxy.GreetAsync(Environment.UserName);

Console.WriteLine(greeting);
await connection.ShutdownAsync();
```

When we call `greeterProxy.GreetAsync`, the connection to the server is not yet established: it's the `GreetAsync` call
that triggers the connection establishment.

### MyClient.csproj - the project file

The project file is identical to the server's project file, with references to 4 separate IceRpc NuGet packages:

- [IceRpc.Slice] - the IceRPC + Slice integration package
- [IceRpc.Slice.Tools] - the package that compiles `Greeter.slice` into `generated/Greeter.cs`
- [IceRpc.Deadline] and [IceRpc.Logger] - the packages with the two interceptors we installed in our invocation pipeline

{% /step %}

{% step title="Run the application" %}

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
