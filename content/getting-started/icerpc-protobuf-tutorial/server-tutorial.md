---
title: Writing your first IceRPC + Protobuf server in C#
---

This tutorial is the first part of a two part series that shows how to create a
complete application with IceRPC + Protobuf for C#. We start from scratch—you just need to
have the .NET 10 SDK installed on your computer.

The networked application we are building together consists of:

- a server that hosts a single service (a simple greeter service)
- a client that establishes a connection to the server and calls `greet` on this
  greeter service

The client and server are console applications that use plain .NET (no ASP.NET,
no Dependency Injection).

The first part of this tutorial shows how to create the server. The second part
shows how to [create the client].

Let's jump right in:

{% step title="Install the dotnet-new templates for IceRPC" %}

```shell
dotnet new install IceRpc.Templates
```

{% /step %}

{% step title="Create the server" %}

```shell
dotnet new icerpc-protobuf-server -o MyProtobufServer
```

This command creates a new IceRPC server application in directory `MyProtobufServer`.

![MyProtobufServer in Visual Studio Code](/images/MyProtobufServer.png)

Let's examine each file:

### proto/greeter.proto - the contract

This file holds the contract between our client and server applications,
specified with the [Protobuf] language.

It's a simple greeter:

```protobuf
syntax = "proto3";

package visitor_center;
option csharp_namespace = "MyProtobufServer";

// Represents a simple greeter.
service Greeter {
    // Creates a personalized greeting.
    rpc Greet (GreetRequest) returns (GreetResponse);
}

// The request contains the name of the person to greet.
message GreetRequest {
    string name = 1;
}

// The response contains the greeting.
message GreetResponse {
    string greeting = 1;
}
```

The `csharp_namespace` option instructs the protoc compiler to map package
`visitor_center` to C# namespace `MyProtobufServer` (our project name) instead
of the default (`VisitorCenter`).

If you use this code as the starting point for a new application, you should
update this service to represent something meaningful for your application.
For this tutorial, we just keep `Greeter` as-is.

### Chatbot.cs - the service implementation

Class Chatbot is a service that implements Protobuf service `Greeter`:

```csharp
[ProtobufService]
internal partial class Chatbot : IGreeterService
{
    public ValueTask<GreetResponse> GreetAsync(
        GreetRequest message,
        IFeatureCollection features,
        CancellationToken cancellationToken)
    {
        Console.WriteLine($"Dispatching Greet request {{ name = '{message.Name}' }}");
        return new(new GreetResponse { Greeting = $"Hello, {message.Name}!" });
    }
}
```

The `protoc-gen-icerpc-csharp` generator generates C# interface `IGreeterService`
from Protobuf service `Greeter`. This C# interface is a template: we implement
`Greeter` by implementing this interface. As you can see above, the `Greet` operation
becomes a `GreetAsync` method with two additional parameters.

Since we always fulfill `Greet` synchronously, the `GreetAsync` implementation
is not marked `async`. We could write the return statement as:

```csharp
    return new ValueTask<GreetResponse>(
        new GreetResponse { Greeting = $"Hello, {message.Name}!" });
```

However, it's more convenient to omit the type name, especially when this type is complicated.

We mark class `Chatbot` as partial because the [ProtobufService] attribute instructs the Protobuf Service source
generator to implement interface [IDispatcher]—in other words, make `Chatbot` an IceRPC service implementation.

### Program.cs - the dispatch pipeline and the server logic

The main program starts by creating and configuring a [Router]:

```csharp
// Create a simple console logger factory and configure the log level for category IceRpc.
using ILoggerFactory loggerFactory = LoggerFactory.Create(builder =>
    builder
        .AddSimpleConsole()
        .AddFilter("IceRpc", LogLevel.Information));

Router router = new Router()
    .UseLogger(loggerFactory)
    .UseDeadline()
    .Map<IGreeterService>(new Chatbot());
```

This router corresponds to our [dispatch pipeline][dispatch-pipeline]: when we
receive a request, we first give it to the [Logger] middleware, then to the
[Deadline] middleware and finally we route this request based on its path.

The `Map` call means if the request's path is the default service path for Slice
interface `Greeter`, route it to the `Chatbot` instance. Otherwise, the router
returns a response with status code [NotFound].

The default service path for `Greeter` is `/visitor_center.Greeter` (it uses the Protobuf
package name and service name). The `Map` call above is a shortcut for:

```csharp
.Map("/visitor_center.Greeter", new Chatbot());
```

The main program then creates a [Server] that directs all incoming requests to
`router`:

```csharp

var sslServerAuthenticationOptions = new SslServerAuthenticationOptions
{
    ServerCertificateContext = SslStreamCertificateContext.Create(
        X509CertificateLoader.LoadPkcs12FromFile(
            "certs/server.p12",
            password: null,
            keyStorageFlags: X509KeyStorageFlags.Exportable),
        additionalCertificates: null)
};

await using var server = new Server(
    dispatcher: router,
    serverAuthenticationOptions,
    logger: loggerFactory.CreateLogger<Server>());
```

We don't specify a server address so this server uses the default server address
(`icerpc://[::0]`). This means the new server uses the `icerpc` protocol and
will listen for connections on all network interfaces with the default port for
`icerpc` (4062).

We don't specify a transport either so we use the default multiplexed transport
(`tcp`). Setting the `serverAuthenticationOptions` means this server will only accept
secure SSL connections.

At this point, the server is created but is not doing anything yet. A client
attempting to connect would get a "connection refused" error.

The server starts listening on the next line:

```csharp
server.Listen();
```

`Listen` returns as soon as the server is listening (so almost immediately).

The main program then awaits until it receives a Ctrl+C. After it receives
Ctrl+C, it shuts down the server gracefully:

```csharp
await CancelKeyPressed;
await server.ShutdownAsync();
```

### Program.CancelKeyPressed.cs - small Ctrl+C helper

This file contains a few lines of code that `Programs.cs` uses to wait for
Ctrl+C. It's not related to RPCs.

### MyProtobufServer.csproj - the project file

The project file is straightforward. It contains references to the required IceRpc
NuGet packages:

- [IceRpc.Protobuf] - the IceRPC + Protobuf integration package
- [IceRpc.Protobuf.Tools] - the package that compiles `greeter.proto` into
  `generated/Greeter.cs` and `generated/Greeter.IceRpc.cs`
- [IceRpc.Deadline] and [IceRpc.Logger] - the packages with the two middleware
  we installed in the dispatch pipeline

{% /step %}

{% step title="Run the application" %}

### Start the server

```shell
cd MyProtobufServer
dotnet run
```

The server is now listening for new connections from clients.

### Shutdown the server

Press Ctrl+C on the server console to shut it down.

{% /step %}

[create the client]: client-tutorial
[Deadline]: csharp:IceRpc.Deadline
[dispatch-pipeline]: /icerpc/dispatch/dispatch-pipeline
[IDispatcher]: csharp:IceRpc.IDispatcher
[IceRpc.Deadline]: https://www.nuget.org/packages/IceRpc.Deadline
[IceRpc.Logger]: https://www.nuget.org/packages/IceRpc.Logger
[IceRpc.Protobuf.Tools]: https://www.nuget.org/packages/IceRpc.Protobuf.Tools
[IceRpc.Protobuf]: https://www.nuget.org/packages/IceRpc.Protobuf
[Logger]: csharp:IceRpc.Logger
[NotFound]: csharp:IceRpc.StatusCode#NotFound
[Router]: csharp:IceRpc.Router
[Server]: csharp:IceRpc.Server
[Protobuf]: https://protobuf.dev/
[ProtobufService]: csharp:IceRpc.Protobuf.ProtobufServiceAttribute
