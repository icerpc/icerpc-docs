---
title: Getting started
description: Welcome to the IceRPC Documentation
showReadingTime: false
---

## What is IceRPC?

Remote Procedure Call (RPC) is a fundamental paradigm for networked
applications: a client sends a request to a server over a network connection,
the server processes this request and then sends back a response to the client
over the same connection.

An RPC framework like IceRPC helps you apply this paradigm to your own networked
applications without reinventing the wheel.

## Main features

Some of IceRPC's main features include:

TODO: What are the main features we want to highlight? Middleware and Interceptors, Slice, etc.

| Feature                  | Description                                                                                         |
| ------------------------ | --------------------------------------------------------------------------------------------------- |
| [Foo](/getting-started)  | Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, sapien vel bibendum bibendum. |
| [Bar](/getting-started)  | Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, sapien vel bibendum bibendum. |
| [Fizz](/getting-started) | Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, sapien vel bibendum bibendum. |

## How to use the docs

- **Navigation Bar:** At the top of your screen, you'll find the docs navigation
  bar. This bar categorizes the documentation into sections such as
  "Getting Started", "IceRPC", and "Slice".
- **Starting Point:** For newcomers, we suggest diving into the
  "Getting started with IceRPC" section. It's designed for a step-by-step
  approach to creating your first IceRPC application.
- **Table of Contents:** On the right, there's a table of contents for easy
  navigation within a page. This feature helps you hop between sections
  effortlessly.
- **Search Features:** If you're looking for something specific:
  - Use the search bar located in the left navigation pane.
  - For a quicker search, activate the search function with the shortcut
    `Ctrl+K` (or `Cmd+K` on Mac).
- **Kick-off Guide:** Ready to dive in? Start with the [Writing your first IceRPC application guide](/getting-started/icerpc-csharp/tutorial).

For more detailed information or specific functionalities, don't forget to
consult our [API Reference](https://docs.testing.zeroc.com/api/csharp/api/IceRpc.html).
It's a comprehensive resource for in-depth technical details.

## Quick links

{% grid columns=3 %}
{% mini-card
   title="Built for QUIC"
   description="See what sets IceRPC apart"
   href="/getting-started/key-features/modular-rpc-for-quic" /%}

{% mini-card
   title="A better IDL"
   description="Learn how to describe your RPCs with Slice"
   href="/getting-started/key-features/slice-better-idl" /%}

{% mini-card
   title="Tutorial"
   description="Write your first IceRPC application in C#"
   href="/getting-started/icerpc-csharp/tutorial" /%}

{% mini-card
   title="How-to"
   description="Add IceRPC to an existing C# project"
   icon="terminal"
   href="/getting-started/icerpc-csharp/how-to" /%}

{% mini-card
   title="Examples"
   description="See IceRPC for C# in action"
   icon="terminal"
   href="https://github.com/zeroc-ice/icerpc-csharp/tree/main/examples/README.md" /%}
{% /grid %}
