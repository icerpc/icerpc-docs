---
title: Overview
description: Everything you need to get started with IceRPC
show_toc: false
---

## Get stared with IceRPC

Getting started with IceRPC is easy. This page will help you get up and running with IceRPC in no time.

If you're new to IceRPC, we recommend you start with the [What is IceRPC](/docs/getting-started/what-is-icerpc) page.
If you're already familiar with IceRPC, you can jump right in with the [Installation](/docs/getting-started/installation) page.

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

{% /grid %}

### Check out an example project

Example projects are a great way to learn about IceRPC. They are fully functional applications that demonstrate
common concepts and usage patterns.

Learn how to secure a server with TLS, stream data, retry requests, and more. Each example project includes a
README.md file that explains how to build and run the project.

{% grid
   rows=2
   columns=3
   trailingLink={label:"View all on GitHub",link:"https://github.com/zeroc-ice/icerpc-csharp/tree/main/examples"} %}

{% link-card title="Greeter" link="https://github.com/zeroc-ice/icerpc-csharp/tree/main/examples/Greeter" /%}
{% link-card title="Stream" link="https://github.com/zeroc-ice/icerpc-csharp/tree/main/examples/Stream" /%}
{% link-card title="Upload" link="https://github.com/zeroc-ice/icerpc-csharp/tree/main/examples/Upload" /%}
{% link-card title="Compress" link="https://github.com/zeroc-ice/icerpc-csharp/tree/main/examples/Compress" /%}
{% link-card title="Secure" link="https://github.com/zeroc-ice/icerpc-csharp/tree/main/examples/Secure" /%}
{% link-card title="Retry" link="https://github.com/zeroc-ice/icerpc-csharp/tree/main/examples/Retry" /%}

{% /grid %}

More example projects can be found in the [icerpc/icerpc-csharp](https://github.com/icerpc/icerpc-csharp/tree/main/examples) GitHub repository.
