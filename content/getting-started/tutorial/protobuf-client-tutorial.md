---
title: Writing your first IceRPC + Protobuf client in C#
---

This tutorial is the second part of a two part series that shows how to create a
complete application with IceRPC + Protobuf for C#. We start from scratch—you just need to
have the .NET 8 SDK installed on your computer.

The first part of this tutorial showed how to
[create the server][protobuf-server-tutorial]. This part shows how to create the client.

{% step title="Create the client" %}

```shell
dotnet new icerpc-protobuf-client -o MyProtobufClient
```

This command creates a new IceRPC client application in directory `MyProtobufClient`.

![MyProtobufClient in Visual Studio Code](/images/MyProtobufClient.png)

Let's examine each file:

### proto/greeter.proto - the contract

This file is (and must be) identical or almost identical to the `greeter.proto`
we used for the server:

```proto
syntax = "proto3";

package visitor_center;
option csharp_namespace = "MyProtobufClient";

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

The only difference with our server's `greeter.proto` is the `csharp_namespace`
option. That's fine: options don't change the contract. Here, the Protobuf
compiler generates the C# code in namespace `MyProtobufClient` and contract-wise, it
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

Next, the client program creates a `Greeter` client with this invocation
pipeline:

```csharp
var greeterClient = new GreeterClient(pipeline);
```

`GreeterClient` is a struct that the `protoc-gen-icerpc-csharp` generator generates
from Protobuf service `Greeter`. This struct allows us to send requests to a remote
service that implements `Greeter`.

With this code, the address of the target service (or
[service address][service-address]) is the default for `Greeter`, namely
`icerpc:/visitor_center.Greeter`. It matches the route we created in the server.
We could also create the same proxy with an explicit service address:

```csharp
var greeterClient = new GreeterClient(pipeline, new Uri("icerpc:/visitor_center.Greeter"));
```

Finally, the client sends a `Greet` request, awaits the response (the greeting),
prints the greeting and shuts down the connection gracefully:

```csharp
GreetResponse response = await greeterClient.GreetAsync(request);

Console.WriteLine(response.Greeting);
await connection.ShutdownAsync();
```

When we call `greeterClient.GreetAsync`, the connection to the server is not yet
established: it's the `GreetAsync` call that triggers the connection
establishment.

### MyProtobufClient.csproj - the project file

The project file is identical to the server's project file, with references to 4
separate IceRpc NuGet packages:

- [IceRpc.Protobuf] - the IceRPC + Protobuf integration package
- [IceRpc.Protobuf.Tools] - the package that compiles `greeter.proto` into
  `generated/Greeter.cs` and `generated/Greeter.IceRpc.cs`
- [IceRpc.Deadline] and [IceRpc.Logger] - the packages with the two interceptors
  we installed in our invocation pipeline

{% /step %}

{% step title="Run the full application" %}

### Start the server

```shell
cd MyProtobufServer
dotnet run
```

The server is now listening for new connections from clients:

```
dbug: IceRpc.Server[11]
      Listener 'icerpc://[::0]?transport=tcp' has started accepting connections
```

### Start the client

```shell
cd MyProtobufClient
dotnet run
```

The client sends a single `greet` request to the service hosted by our server:

```
dbug: IceRpc.ClientConnection[3]
      Client connection from '[::1]:52308' to '[::1]:4062' connected
info: IceRpc.Logger.LoggerInterceptor[0]
      Sent request Greet to icerpc:/visitor_center.Greeter over
      [::1]:52308<->[::1]:4062 and received a response with status code Ok
Hello, jose!
dbug: IceRpc.ClientConnection[6]
      Client connection from '[::1]:52308' to '[::1]:4062' shutdown
dbug: IceRpc.ClientConnection[5]
      Client connection from '[::1]:52308' to '[::1]:4062' disposed
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
[IceRpc.Protobuf.Tools]: https://www.nuget.org/packages/IceRpc.Protobuf.Tools
[IceRpc.Protobuf]: https://www.nuget.org/packages/IceRpc.Protobuf
[Logger]: csharp:IceRpc.Logger
[protobuf-server-tutorial]: /getting-started/tutorial/protobuf-server-tutorial
[service-address]: /icerpc/invocation/service-address
