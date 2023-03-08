---
title: Foo
encoding: Slice1
---

{% title /%}

{% callout type="critical" %}

TODO: This page contains placeholder content and needs to be replaced. Please remove this when you are done.

{% /callout %}

{% language-selector languages=["csharp", "rust"] /%}

## A Simple Hello World Example

{% language-section language="csharp" %}
In this example, we will create a simple application that will send a greeting to a server and receive a response.
This example will use the C# programming language but the same concepts apply to all programming languages.

```csharp
using System;

using HelloExample;
using IceRpc;

await using var connection = new ClientConnection(new Uri("icerpc://127.0.0.1"));

var helloProxy = new HelloProxy(connection);
string greeting = await helloProxy.SayHelloAsync(Environment.UserName);

Console.WriteLine(greeting);
```

{% /language-section %}

{% language-section language="rust" %}
In this example, we will create a simple application that will send a greeting to a server and receive a response.
This example will use the Rust programming language but the same concepts apply to all programming languages.

```rust
use icerpc::ClientConnection;
use icerpc::Uri;

use hello::HelloProxy;

#[async_std::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let connection = ClientConnection::new(Uri::parse("..."?)).await?;
    let hello_proxy = HelloProxy::new(connection);
    let greeting = hello_proxy.say_hello("...").await?;

    println!("{}", greeting);
    Ok(())
}
```

{% /language-section %}
