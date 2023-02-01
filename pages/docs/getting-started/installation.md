---
title: Installation
description: How to install IceRPC
breadcrumbs:
  - name: Overview
    href: /docs/getting-started
---

{% title /%}

{% callout type="critical" %}

TODO: This page contains placeholder content and needs to be replaced. Please remove this when you are done.

{% /callout %}

Follow the instructions below to install IceRPC in your application.

### System Requirements

- MacOS, Linux, or Windows
- [.NET 7.0](https://dotnet.microsoft.com/en-us/download/dotnet/7.0) or later

## Automatic Setup

The easiest way to install IceRPC is to use the [IceRPC NuGet package](https://www.nuget.org/packages/IceRPC/):

```shell
# Install the IceRPC NuGet package
dotnet add package icerpc

```

Notably, the NuGet package includes two dotnet templates, `icerpc-client` and `icerpc-server`.
To create a new project using these dotnet templates, run the following commands:

```shell
# Create a client project
dotnet new icerpc-client
# Create a server project
dotnet new icerpc-server
```

After the installation is complete:

- Run `dotnet run --project Client.csproj` within the `Client` directory to start the client.
- Run `dotnet run --project Server.csproj` within the `Server` directory to start the server.

## Manual Setup

If you prefer to install IceRPC manually, you can do so by following the steps below.

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
