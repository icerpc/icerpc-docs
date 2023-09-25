---
title: Incoming request
description: Understand how to interpret an incoming request.
---

## Receiving an incoming request

The dispatch method of a [dispatcher](dispatch-pipeline#the-dispatcher-abstraction) accepts an incoming request. This
incoming request is created by the connection when it receives a request from the peer.

An incoming request holds:

- the path of the target service
- the name of the operation on this service
- request [fields]
- the [payload](#request-payload) of the request

An incoming request also holds [features](#request-features). These features are used for local communications within
this dispatch pipeline; they are also used for communications between dispatchers in the pipeline and your application
code.

## Request payload

The payload of an incoming request is a stream of bytes that represents the argument(s) of an operation. As far as
IceRPC is concerned, the number of bytes in this stream is unknown.

## Request features

It is common for the dispatchers in a dispatch pipeline to transmit information to each other during a dispatch. In C#,
these dispatchers get and set the request's [IFeatureCollection] for these communications.

You can also use these features to communicate with your service code. For example, if you install the dispatch
information middleware, it sets the [IDispatchInformationFeature] and you can retrieve this feature in your code:

```csharp
// In Slice service implementation
public ValueTask OpAsync(string message, FeatureCollection features, CancellationToken cancellationToken)
{
    if (features.Get<IDispatchInformationFeature> is IDispatchInformationFeature dispatchInformation)
    {
        EndPoint from = dispatchInformation.ConnectionContext.TransportConnectionInformation.RemoteNetworkAddress;
        Console.WriteLine($"dispatching request from {from}");
    }
    Console.WriteLine(message);
    return default;
}
```

By convention, the features are keyed using interface types, such as `IDispatchInformationFeature` in the example above.

{% callout type="note" %}
Fields are used for communications "over the wire" while features are used for local communications within a dispatch
pipeline. IceRPC provides both request fields (carried by requests) and response fields (carried by responses), but
only request features: since it's all local, there is no need for response features.
{% /callout %}

[fields]: ../invocation/outgoing-request#request-fields

[IFeatureCollection]: csharp:IceRpc.Features.FeatureCollection
[IDispatchInformationFeature]: csharp:IceRpc.Features.IDispatchInformationFeature
