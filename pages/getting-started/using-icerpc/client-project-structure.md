---
title: 'Client project structure'
---

This page provides an overview of the file and folder structure of a a simple
IceRPC client application.

This sample application used in this overview is generated from the
`icerpc-client` IceRPC .NET Project Template which is demonstrated in the
[Quickstart](/getting-started/using-icerpc/quickstart) page.

## Project Structure

#### Top Level Folders

|             |                                                                                                                                                                                                 |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `bin`       | This folder contains the build output, including all the compiled files and resources required to run the application.                                                                          |
| `generated` | The Slice compiler generates the C# code for the Slice interfaces in this folder. It includes the proxy and skeleton classes that are essential for your IceRPC application.                    |
| `obj`       | This folder is used during the build process. It contains temporary files and other resources needed for compiling your application. You don't typically need to interact with this folder.     |
| `slice`     | This folder contains the Slice files, which define the service interfaces for your IceRPC application. It is the basis for generating the proxy and skeleton classes in the `generated` folder. |

#### Top Level Files

|                   |                                                                                                                                                                                       |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Program.cs`      | The main program of the client application sets up the connection and invocation pipeline for the client, and then sends a greet request to the server.                               |
| `MyClient.csproj` | This is the project file for the client application. It lists the dependencies and configurations for the build process, including references to the necessary IceRPC NuGet packages. |

## Files

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
