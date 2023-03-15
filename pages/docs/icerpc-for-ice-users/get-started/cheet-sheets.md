---
title: Cheat sheets
---

## Concepts

| Ice                             | IceRPC equivalent (not always exact)                                            |
|---------------------------------|---------------------------------------------------------------------------------|
| Communicator                    | Invocation pipeline with several interceptors into a connection cache           |
| Properties                      | -                                                                               |
| Proxy string                    | Service address URI                                                             |
| ObjectPrx                       | Service address                                                                 |
| Endpoint                        | Server address                                                                  |
| Object adapter                  | Server                                                                          |
| Servant                         | Service                                                                         |
| Active servant map              | Router                                                                          |
| Servant locator                 | Dispatcher, Router                                                              |
| Default servant                 | Dispatcher, Router                                                              |
| Published endpoints             | -                                                                               |
| Router                          | -                                                                               |
| Locator                         | No direct equivalent but see Locator interceptor                                |
| Connection                      | Protocol connection                                                             |
| Invocation                      | Invocation                                                                      |
| Dispatch                        | Dispatch                                                                        |
| Invocation timeout              | Deadline interceptor and middleware                                             |
| Connection timeout              | -                                                                               |
| Oneway proxy                    | Oneway invocation using Slice attribute                                         |
| Batch proxy                     | -                                                                               |
| Datagram proxy                  | -                                                                               |
| Secure proxy                    | -                                                                               |
| Plugins                         | -                                                                               |
| IceSSL plugin                   | tcp/ssl duplex transport (built-in)                                             |

## Slice

| Ice Slice                       | IceRPC Slice with encoding = Slice1                                             |
|---------------------------------|---------------------------------------------------------------------------------|
| .ice file extension             | .slice file extension                                                           |
| bool                            | bool                                                                            |
| byte                            | uint8                                                                           |
| class                           | class                                                                           |
| const                           | -                                                                               |
| -                               | custom                                                                          |
| dictionary                      | dictionary (can be anonymous)                                                   |
| double                          | float64                                                                         |
| -                               | encoding                                                                        |
| enum                            | enum                                                                            |
| exception                       | exception                                                                       |
| extends                         | :                                                                               |
| float                           | float32                                                                         |
| idempotent                      | idempotent                                                                      |
| inherits                        | -                                                                               |
| int                             | int32                                                                           |
| interface                       | interface                                                                       |
| local                           | -                                                                               |
| long                            | int64                                                                           |
| module                          | module                                                                          |
| optional                        | tag                                                                             |
| out                             | return tuple                                                                    |
| sequence                        | sequence (can be anonymous)                                                     |
| short                           | int16                                                                           |
| string                          | string                                                                          |
| struct                          | compact struct                                                                  |
| throws                          | throws                                                                          |
| -                               | typealias                                                                       |
| LocalObject                     | -                                                                               |
| Object*                         | ServiceAddress                                                                  |
| T*                              | T? (nullable) or T (non-nullable)                                               |
| T with T = class                | T? (nullable) or T (non-nullable)                                               |
| Value (or Object)               | AnyClass                                                                        |
