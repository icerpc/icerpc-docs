---
title: Registering ClientConnection as a DI service
description: Understand how to register ClientConnection as a DI service in Microsoft's DI container.
---

## Basics

You can register [`ClientConnection`](csharp:IceRpc.ClientConnection) as a singleton in Microsoft's DI
container with the [`AddIceRpcClientConnection`](csharp:Microsoft.Extensions.DependencyInjection.IceRpcServiceCollectionExtensions#Microsoft_Extensions_DependencyInjection_IceRpcServiceCollectionExtensions_AddIceRpcClientConnection_Microsoft_Extensions_DependencyInjection_IServiceCollection_) extension method.

`AddIceRpcClientConnection` unwraps the options carried by `IOptions<ClientConnectionOptions>.` It also registers
the resulting `ClientConnection` as an `IInvoker` singleton in the DI container.

```csharp
using Microsoft.Extensions.DependencyInjection;

IHost host = Host.CreateDefaultBuilder(args)
    .UseContentRoot(AppContext.BaseDirectory)
    .AddOptions<ClientConnectionOptions>()
    .Bind(hostContext.Configuration.GetSection("Client"))
    .ConfigureServices((hostContext, services) =>
    {
        // The DI container will create a ClientConnection singleton on-demand.
        services.AddIceRpcClientConnection();
    });
    ...
```

## Injecting dependencies into ClientConnection

The main constructor of `ClientConnection` used by the `AddIceRpcClientConnection` extension method accepts three
injectable services:

```csharp
public ClientConnection(
    ClientConnectionOptions options,
    IDuplexClientTransport? duplexClientTransport = null,
    IMultiplexedClientTransport? multiplexedClientTransport = null,
    ILogger? logger = null)
```

The duplex and multiplexed client transports are retrieved from the DI container; `AddIceRpcClientConnection` installs
the usual defaults (tcp) if you don't register your own transport singleton.

The logger is injected as an instance of the `ILogger<ClientConnection>` service (if available).

For example, if you want to use QUIC for your client connection, you just need to register a `QuiClientTransport`
singleton:

```csharp
using IceRpc.Transports.Quic;
using Microsoft.Extensions.DependencyInjection;

IHost host = Host.CreateDefaultBuilder(args)
    .UseContentRoot(AppContext.BaseDirectory)
    .AddOptions<ClientConnectionOptions>()
    .Bind(hostContext.Configuration.GetSection("Client"))
    .ConfigureServices((hostContext, services) =>
    {
        // The IMultiplexedClientTransport singleton is implemented by QUIC.
        services
            .AddSingleton<IMultiplexedClientTransport>(provider => new QuicClientTransport());

        // This client connection uses QUIC.
        services.AddIceRpcClientConnection();
    });
```

If you only want to customize the `TcpClientTransportOptions` of the default `TcpClientTransport`, you can set an
`IOptions<TcpClientTransportOptions>`. For example:

```csharp
using IceRpc.Transports.Tcp;

services
    .AddOptions<TcpClientTransportOptions>()
    // Read from config
    .Bind(hostContext.Configuration.GetSection("TcpClientTransportOptions"));
```
