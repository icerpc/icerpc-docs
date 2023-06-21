---
title: Getting started
description: Everything you need to get started with IceRPC
show_toc: false
---

## Get started with IceRPC

Getting started with IceRPC is easy. This page will help you get up and running with IceRPC in no time.

If you're new to IceRPC, we recommend you start with the [What is IceRPC](/docs/getting-started/what-is-icerpc) page.
If you're already familiar with IceRPC, you can jump right in with the [Installation](/docs/getting-started/installation) page.

Once you're up and running, you can learn more about IceRPC by reading the [IceRPC Core](/docs/icerpc-core) documentation
and by checking the [IceRPC C# API Reference](https://api.testing.zeroc.com/csharp).

### Quick links

{% grid %}

{% card
   title="What is IceRPC?"
   description="Learn the basics of what IceRPC and Slice are."
   icon="question"
   link="/docs/getting-started/what-is-icerpc" /%}
{% card
   title="Installation"
   description="Quickly get up and running with IceRPC."
   icon="box"
   link="/docs/getting-started/installation" /%}
{% card
   title="Creating your first app"
   description="Get started creating your first application using IceRPC."
   icon="terminal"
   link="/docs/getting-started/writing-your-first-icerpc-application-in-csharp" /%}

{% card
   title="IceRPC C# API Reference"
   description="A full reference for the IceRPC C# API."
   icon="terminal"
   link="<https://api.testing.zeroc.com/csharp>" /%}

{% /grid %}

### Check out an example project

Example projects are a great way to learn about IceRPC. They are fully functional applications that demonstrate
common concepts and usage patterns.

Learn how to use the QUIC transport, stream data, retry requests, and more. Each example project includes a
README.md file that explains how to build and run the project.

{% grid
   rows=2
   columns=3
   trailingLink={label:"View all on GitHub",link:"<https://github.com/zeroc-ice/icerpc-csharp/tree/main/examples"}> %}

{% link-card title="GreeterQuic" link="<https://github.com/zeroc-ice/icerpc-csharp/tree/main/examples/GreeterQuic>" /%}
{% link-card title="Stream" link="<https://github.com/zeroc-ice/icerpc-csharp/tree/main/examples/Stream>" /%}
{% link-card title="Upload" link="<https://github.com/zeroc-ice/icerpc-csharp/tree/main/examples/Upload>" /%}
{% link-card title="Compress" link="<https://github.com/zeroc-ice/icerpc-csharp/tree/main/examples/Compress>" /%}
{% link-card title="Secure" link="<https://github.com/zeroc-ice/icerpc-csharp/tree/main/examples/Secure>" /%}
{% link-card title="Retry" link="<https://github.com/zeroc-ice/icerpc-csharp/tree/main/examples/Retry>" /%}

{% /grid %}

More example projects can be found in the [icerpc/icerpc-csharp](https://github.com/icerpc/icerpc-csharp/tree/main/examples) GitHub repository.
