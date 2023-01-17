---
title: Overview
description: An introduction to Slice
---

{% title /%}

The Slice is a Interface Description Language (IDL) used to describe the structure of data in your application
and the operations that can be performed on it. It is a language and platform agnostic way to describe the flow
of data in your application.

Below is a simple example of a showing the Slice langauge . It defines a module named
`Hello`, a struct named `Person`, and an interface named `Greeter`. The `Greeter` interface defines a single operation,
`greet`, which takes a `Person` and returns a `string`.

```slice
module Hello;

struct Person
{
    name: string,
    age: int32,
};

interface Greeter
{
    greet(person: Person) -> string;
};
```

This Slice file when compiled will generate source code for a given programming language that IceRPC can use to
communicate with other IceRPC applications.

## Slice1 vs Slice2

The Slice language is an evolution of the IDL used by the [ZeroC Ice](https://zeroc.com/products/ice)
framework. To distinguish between the two, we refer to **latest version of the Slice language as Slice2** and the
version supported by **ZeroC Ice as Slice1**.

While the two versions are similar, there are some noteable differences between the two. The differences are described
in the [Slice1 vs Slice2](/slice1-vs-slice2) section.

TODO: What do we want to do with this section?

## Serialization and Deserialization

Slice files are a contract between the client and server. First, the client and server must agree on the structure of
the data being sent and received. Then, the Slice compiler will generate code for the client and server to serialize
and deserialize the data.

Serialization and deserialization convert the data into a format that IceRPC can send over the network. Many different
types are provided by the Slice language to describe the data being sent and received but also provide the mechanisms
to define your types. Information about the different types can be found in the Syntax section of the documentation.

## Compilation

TODO: Describe the compilation process

{% flow
   nodes=[
    {
      id: "1",
      data: { label: "Hello.slice" },
      position: { x: 250, y: 5 }
    },
    {
      id: "2",
      data: { label: "Slice  C# Compiler" },
      position: { x: 100, y: 100 }
    },
    {
      id: "3",
      data: { label: "Hello.cs" },
      position: { x: 400, y: 100 },
    }
  ]
  edges=[
    { id: "e1-2", source: "1", target: "2", markerEnd: "MarkerType.ArrowClosed" },
    { id: "e2-3", source: "2", target: "3" }
  ]
/%}

## Integrations

TODO: Describe the various integration such as syntax highlighting, etc.

## Next Steps

TODO: Add links to the next steps
