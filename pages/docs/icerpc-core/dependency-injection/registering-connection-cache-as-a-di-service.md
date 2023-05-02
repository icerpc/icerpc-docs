---
title: Registering ConnectionCache as a DI service
description: Understand how to register ConnectionCache as a DI service in Microsoft's DI container.
---

## Basics

You can register [`ConnectionCache`](csharp:IceRpc.ConnectionCache) as a singleton in Microsoft's DI
container with the [`AddIceRpcConnectionCache`](csharp:Microsoft.Extensions.DependencyInjection.IceRpcServiceCollectionExtensions#Microsoft_Extensions_DependencyInjection_IceRpcServiceCollectionExtensions_AddIceRpcConnectionCache_Microsoft_Extensions_DependencyInjection_IServiceCollection_) extension method.

`AddIceRpcConnectionCache` unwraps the options carried by `IOptions<ConnectionCacheOptions>.` It also registers
the resulting `ConnectionCache` as an `IInvoker` singleton in the DI container.

```csharp
using Microsoft.Extensions.DependencyInjection;

IHost host = Host.CreateDefaultBuilder(args)
    .UseContentRoot(AppContext.BaseDirectory)
    .AddOptions<ConnectionCacheOptions>()
    .Bind(hostContext.Configuration.GetSection("Client"))
    .ConfigureServices((hostContext, services) =>
    {
        // The DI container will create a ConnectionCache singleton on-demand.
        services.AddIceRpcConnectionCache();
    });
    ...
```

## Injecting dependencies into ConnectionCache

The main constructor of `ConnectionCache` used by the `AddIceRpcConnectionCache` extension method accepts three
injectable services:

```csharp
public ConnectionCache(
    ConnectionCacheOptions options,
    IDuplexClientTransport? duplexClientTransport = null,
    IMultiplexedClientTransport? multiplexedClientTransport = null,
    ILogger? logger = null)
```

The duplex and multiplexed client transports are retrieved from the DI container; `AddIceRpcConnectionCache` installs
the usual defaults (tcp) if you don't register your own transport singleton.

The logger is injected as an instance of the `ILogger<ConnectionCache>` service (if available).

For example, if you want to use QUIC for your connection cache you just need to register a `QuiClientTransport`
singleton:

```csharp
using IceRpc.Transports.Quic;
using Microsoft.Extensions.DependencyInjection;

IHost host = Host.CreateDefaultBuilder(args)
    .UseContentRoot(AppContext.BaseDirectory)
    .AddOptions<ConnectionCacheOptions>()
    .Bind(hostContext.Configuration.GetSection("Client"))
    .ConfigureServices((hostContext, services) =>
    {
        // The IMultiplexedClientTransport singleton is implemented by QUIC.
        services
            .AddSingleton<IMultiplexedClientTransport>(provider => new QuicClientTransport());

        // This connection cache uses QUIC.
        services.AddIceRpcConnectionCache();
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
