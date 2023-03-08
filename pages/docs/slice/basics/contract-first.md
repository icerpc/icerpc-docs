---
title: Contract first model
description: Learn how to create an application using IceRPC and Slice.
---

{% title /%}

## Step 1: Create Slice definitions (the contract)

When you create an application with IceRPC and Slice, the very first step is to model your RPCs with Slice. These Slice
definitions represent the contract between your client and server applications. It is critical for both applications to
share the same Slice definitions.

A minimal Slice contract defines an interface with an operation, for instance:
```slice
module HelloExample

interface Hello {
    sayHello(name: string) -> string
}
```

An interface must be defined in a module (`HelloExample` in the example above), and an operation must be defined in an
interface.

We save these definitions in file `Hello.slice`.

## Step 2: Compile Slice definitions with the Slice compiler

Once you've written the initial version of your Slice definitions, we need to compile them with the Slice compiler for
your programming language.

In C#, you would typically use the [IceRpc Builder for MSBuild](https://github.com/zeroc-ice/icerpc-builder-msbuild);
this builder calls the Slice compiler for C#, `slicec-cs`, to compile the Slice files of your project into C# files.

The Slice compiler for C# generates a C# file for each Slice file. Since we have single Slice file, we get a single
C# file, `Hello.cs`.

## Step 3: Implement server application

The Slice compiler for C# generates a C# interface named `I{Name}Service` for each Slice interface. This C# interface
includes a method per Slice operation. The generated service interface for the `Hello` interface defined earlier is:
```csharp
// generated code
namespace HelloExample;

public partial interface IHelloService
{
    ValueTask<string> SayHelloAsync(
        string name,
        IceRpc.Features.IFeatureCollection features,
        CancellationToken cancellationToken);
}
```

We need to create a class that derives from `IceRpc.Slice.Service` and implements this generated interface:
```csharp
using IceRpc;
using IceRpc.Features;
using IceRpc.Slice;

namespace HelloExample;

// Our own implementation for Slice interface Hello.
internal class Chatbot : Service, IHelloService
{
    public ValueTask<string> SayHelloAsync(
        string name,
        IceRpc.Features.IFeatureCollection features,
        CancellationToken cancellationToken) => new($"Hello, {name}!");
}
```

An instance of the `Chatbot` class is an IceRPC service that implements the Slice interface `Hello`.

We then insert this service (dispatcher) into the server's
[dispatch pipeline](../../icerpc-core/dispatch/dispatch-pipeline) as usual; this is no longer a Slice topic.

## Step 4: Implement client application

The Slice compiler for C# also generates a C# interface named `I{Name}` and a struct named `{Name}Proxy` for each Slice
interface. `{Name}Proxy` implements `I{Name}`. The generated C# interface includes a method per operation in the Slice
interface.

The generated interface for our `Hello` Slice interface is:
```csharp
// generated code
namespace HelloExample;

public partial interface IHello
{
    Task<string> SayHelloAsync(
        string name,
        IceRpc.Features.IFeatureCollection? features = null,
        CancellationToken cancellationToken = default);
}
```

It's a very clean interface without additional methods; this way, you can easily
[decorate](https://en.wikipedia.org/wiki/Decorator_pattern) this interface.

The proxy struct implements the methods of the generated interface by creating outgoing requests and calling
`InvokeAsync` on its invoker with these requests. It also provides two constructors:
```csharp
// generated code
using IceRpc.Slice;

namespace HelloExample;

public readonly partial record struct HelloProxy : IHello, IProxy
{
    public HelloProxy(
        IceRpc.IInvoker invoker,
        IceRpc.ServiceAddress? serviceAddress = null,
        SliceEncodeOptions? encodeOptions = null)
    {
        ...
    }

    public HelloProxy(IceRpc.IInvoker invoker, System.Uri serviceAddressUri, SliceEncodeOptions? encodeOptions = null)
        : this(invoker, new IceRpc.ServiceAddress(serviceAddressUri), encodeOptions)
    {
    }
}
```

You can create an instance of this proxy struct to make remote calls, for example:
```csharp
using HelloExample;
using IceRpc;

// A ClientConnection is an invoker.
await using var clientConnection = new ClientConnection(new Uri("icerpc://examples.zeroc.com"));

// Here the service address specifies the protocol (icerpc) and the path (/hello).
var hello = new HelloProxy(clientConnection, new Uri("icerpc:/hello"));

// Make an RPC and print the return value.
string greeting = await hello.SayHelloAsync("Syd");
Console.WriteLine(greeting);
```
