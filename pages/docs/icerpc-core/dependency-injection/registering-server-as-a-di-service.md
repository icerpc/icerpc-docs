---
title: Registering Server as a DI service
description: Understand how to register Server as a DI service in Microsoft's DI container.
---

## Basics

You can register `Server`(https://api.testing.zeroc.com/csharp/api/IceRpc.Server.html) as a singleton in Microsoft's DI
container with the `AddIceRpcServer`(https://api.testing.zeroc.com/csharp/api/Microsoft.Extensions.DependencyInjection.IceRpcServiceCollectionExtensions.html#Microsoft_Extensions_DependencyInjection_IceRpcServiceCollectionExtensions_AddIceRpcServer_Microsoft_Extensions_DependencyInjection_IServiceCollection_IceRpc_IDispatcher_) extension method:

```csharp
using Microsoft.Extensions.DependencyInjection;

IHost host = Host.CreateDefaultBuilder(args)
    .UseContentRoot(AppContext.BaseDirectory)
    .ConfigureServices((hostContext, services) =>
    {
        IDispatcher dispatcher = ...; // the dispatch pipeline

        // The DI container will create a Server singleton on-demand.
        services.AddIceRpcServer(dispatcher);
    });
    ...
```

This server singleton is a default server: it uses the default server address ("icerpc://[::0]"), the default
multiplexed transport (tcp) and `null` for its authentication options (so no TLS).

If you want to add a more custom server, you can inject an `IOption<ServerOptions>`. For example:

```csharp
using Microsoft.Extensions.DependencyInjection;

IHost host = Host.CreateDefaultBuilder(args)
    .UseContentRoot(AppContext.BaseDirectory)
    .ConfigureServices((hostContext, services) =>
    {
        services
            .AddOptions<ServerOptions>()
            // Read the server options from configuration.
            .Bind(hostContext.Configuration.GetSection("Server"));

        // This server will be created using the ServerOptions created and bound above.
        services
            .AddIceRpcServer(
                // Build the dispatcher (dispatch pipeline) with a builder.
                builder => builder
                    .UseTelemetry()
                    .UseLogger()
                    .Map<IGreeterService>());
    });
```

## Injecting dependencies into Server

The main constructor of `Server` used by the `AddIceRpcServer` extension methods accepts three injectable services:

```csharp
public Server(
    ServerOptions options,
    IDuplexServerTransport? duplexServerTransport = null,
    IMultiplexedServerTransport? multiplexedServerTransport = null,
    ILogger? logger = null)
```

The duplex and multiplexed server transports are retrieved from the DI container; `AddIceRpcServer` installs the usual
defaults (tcp) if you don't register your own transport singleton.

The logger is injected as an instance of the `ILogger<Server>` service (if available).

For example, if you want to use QUIC for your server, you just need to register a `QuicServerTransport` singleton:

```csharp
using IceRpc.Transports.Quic;
using Microsoft.Extensions.DependencyInjection;

IHost host = Host.CreateDefaultBuilder(args)
    .UseContentRoot(AppContext.BaseDirectory)
    .ConfigureServices((hostContext, services) =>
    {
        // The IMultiplexedTransport singleton is implemented by QUIC.
        services
            .AddSingleton<IMultiplexedTransport>(provider => new QuicServerTransport());

        // TODO: provide ServerOptions with a certificate (in ServerAuthenticationOptions).

        // This server uses QUIC.
        services
            .AddIceRpcServer(
                builder => builder
                    .UseTelemetry()
                    .UseLogger()
                    .Map<IGreeterService>());
    });
```

If you only want to customize the `TcpServerTransportOptions` of the default `TcpServerTransport`, you can set an
`IOptions<TcpServerTransportOptions>`. For example:

```csharp
using IceRpc.Transports.Tcp;

services
    .AddOptions<TcpServerTransportOptions>()
    // Read from config
    .Bind(hostContext.Configuration.GetSection("TcpServerTransportOptions"));
```

## Multiple servers

Sometimes you need more than a single server in your application. For example, if your application needs to serve
clients over ice and icerpc, you need two servers. IceRPC supports named server options specifically for this use-case.

For example:

```csharp
IHost host = Host.CreateDefaultBuilder(args)
    .UseContentRoot(AppContext.BaseDirectory)
    .ConfigureServices((hostContext, services) =>
    {
        // Server options for the server that uses the icerpc protocol.
        services
            .AddOptions<ServerOptions>("IceRpcGreeter")
            .Bind(hostContext.Configuration.GetSection("IceRpcGreeter"));

        // Server options for the server that uses the ice protocol.
        services
            .AddOptions<ServerOptions>("IceGreeter")
            .Bind(hostContext.Configuration.GetSection("IceGreeter"));

        // Build and register a dispatch pipeline singleton.
        services.
            .AddIceRpcDispatcher(
                 builder => builder
                    .UseTelemetry()
                    .UseLogger()
                    .Map<IGreeterService>());

        // We pass the named server options to get the correct server options. Since we don't specify
        // a dispatcher, AddIceRpcServer retrieves the IDispatcher singleton from the DI container.
        services.AddIceRpcServer("IceRpcGreeter");

        // Second singleton server with its own server options. It reuses the same IDispatcher singleton.
        services.AddIceRpcServer("IceGreeter");
    });
```
