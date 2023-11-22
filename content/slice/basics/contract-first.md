---
title: Contract first model
description: Learn how to create an application using IceRPC and Slice.
---

{% step title="Create Slice definitions (the contract)" %}

When you create an application with IceRPC and Slice, the very first step is to model your RPCs with Slice. These Slice
definitions represent the contract between your client and server applications. It is critical for both applications to
share the same Slice definitions.

A minimal Slice contract defines an interface with an operation, for instance:

```slice
module VisitorCenter

interface Greeter {
    greet(name: string) -> string
}
```

An interface must be defined in a module (`VisitorCenter` in the example above), and an operation must be defined inside
an interface.

We save these definitions in file `Greeter.slice`.

{% /step %}

{% step title="Compile Slice definitions with the Slice compiler" %}

Once you've written the initial version of your Slice definitions, you need to compile them with the Slice compiler for
your programming language.

In C#, you would use the [IceRPC Slice tools][slice-tools] to add Slice file compilation to your IceRPC project. The
Slice compiler for C# generates a C# file for each Slice file. Since we have single Slice file, we get a single C# file,
`Greeter.cs`.

{% /step %}

{% step title="Implement server application" %}

The Slice compiler for C# generates a C# interface named I*Name*Service for each Slice interface. This C# interface
includes a method per Slice operation. The generated service interface for the `Greeter` interface defined earlier is:

```csharp
// generated code
namespace VisitorCenter;

public partial interface IGreeterService
{
    ValueTask<string> GreetAsync(string name, IFeatureCollection features, CancellationToken cancellationToken);
}
```

We just need to create a partial class that implements this generated interface. This class must also carry the
[SliceService] attribute:

```csharp
using IceRpc;
using IceRpc.Features;
using IceRpc.Slice;
using VisitorCenter;

namespace GreeterServer;

// Our own implementation for Slice interface Greeter.
[SliceService]
internal partial class Chatbot : IGreeterService
{
    public ValueTask<string> GreetAsync(
        string name,
        IFeatureCollection features,
        CancellationToken cancellationToken)
    {
        Console.WriteLine($"Dispatching greet request {{ name = '{name}' }}");
        return new($"Hello, {name}!");
    }
}
```

The `[SliceService]` attribute instructs the Slice Service source generator to generate an implementation of interface
[IDispatcher]. This implementation dispatches incoming requests to the `Chatbot` methods based on the operation names
carried by these requests.

We then insert this dispatcher into the server's [dispatch pipeline][dispatch-pipeline], as usual.

{% /step %}

{% step title="Implement client application" %}

The Slice compiler for C# also generates a C# interface I*Name* and a struct *Name*Proxy for each Slice interface.
*Name*Proxy implements I*Name*. The generated C# interface includes a method per operation in the Slice interface.

The generated interface for our `Greeter` Slice interface is:

```csharp
// generated code
namespace VisitorCenter;

public partial interface IGreeter
{
    Task<string> GreetAsync(
        string name,
        IFeatureCollection? features = null,
        CancellationToken cancellationToken = default);
}
```

`IGreeter` is a minimal interface that you can easily [decorate].

The `GreeterProxy` struct implements the methods of the generated interface by creating outgoing requests and calling
`InvokeAsync` on its [invoker] with these requests.

You then create an instance of this proxy struct to make remote calls, for example:

```csharp
using IceRpc;
using VisitorCenter;

// A ClientConnection is an invoker.
await using var connection = new ClientConnection(new Uri("icerpc://examples.zeroc.com"));

// The service address URI specifies the protocol (icerpc) and the path (/greeter).
var greeterProxy = new GreeterProxy(connection, new Uri("icerpc:/greeter"));

// Make an RPC and print the return value.
string greeting = await greeter.GreetAsync("Syd");
Console.WriteLine(greeting);
```

{% /step %}

[dispatch-pipeline]: /icerpc/dispatch/dispatch-pipeline
[decorate]: https://en.wikipedia.org/wiki/Decorator_pattern
[IDispatcher]: csharp:IceRpc.IDispatcher
[slice-tools]: https://www.nuget.org/packages/IceRpc.Slice.Tools
[SliceService]: csharp:IceRpc.Slice.SliceServiceAttribute
[invoker]: /icerpc/invocation/invocation-pipeline#the-invoker-abstraction
