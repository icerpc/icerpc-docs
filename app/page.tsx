// Copyright (c) ZeroC, Inc.

import React from 'react';
import { Hero } from './hero';
import { HomeTitle } from '@/components/tags/home-title';
import { AppLink, Divider, Table, TD, TH, TR } from 'components';
import { Explore } from '@/components/tags/explore';
import { Examples } from '@/components/tags/examples';
import { License } from '@/components/tags/license';

export default async function Home() {
  return (
    <div className="mt-[6.4rem] flex grow flex-row justify-center lg:mt-[7.5rem]">
      <div className="relative flex max-w-[120rem] grow flex-col items-center justify-center">
        <div id="skip-nav" />
        <Hero />
        <div className="flex shrink flex-row justify-center overflow-y-clip lg:justify-start">
          <article className="mx-6 mb-20 mt-10 size-full max-w-[52rem] md:mx-10 lg:mx-16">
            <HomeTitle title="Welcome" description="" />
            <p>
              Welcome to the IceRPC documentation! You will find on this site a
              wide range of materials, including installation instructions,
              tutorials, programming guides, and more.
            </p>
            <p>
              Want to make RPCs without reinventing the wheel? Want to take
              advantage of QUIC through a convenient, modern API? You&apos;ve
              come to the right place.
            </p>

            <p>
              IceRPC is currently available for C# / .NET. We plan on adding
              support for more languages soon, starting with Rust.
            </p>
            <Divider />
            <HomeTitle title="Key Features" description="Discover IceRPC" />
            <p>
              Jump directly to the documentation of these distinctive features:
            </p>
            <Table>
              <thead>
                <TR>
                  <TH>Feature</TH>
                  <TH>Description</TH>
                </TR>
              </thead>
              <tbody>
                <TR>
                  <TD>
                    <AppLink href="/icerpc/invocation/invocation-pipeline">
                      Invocation pipeline
                    </AppLink>
                  </TD>
                  <TD>
                    Customize your client-side processing by composing
                    interceptors into an invocation pipeline.
                  </TD>
                </TR>
                <TR>
                  <TD>
                    <AppLink href="/icerpc/dispatch/dispatch-pipeline">
                      Dispatch pipeline
                    </AppLink>
                  </TD>
                  <TD>
                    Compose middleware and services into your own custom
                    server-side dispatch pipeline.
                  </TD>
                </TR>
                <TR>
                  <TD>
                    <AppLink href="/icerpc/dispatch/router">
                      Path-based routing
                    </AppLink>
                  </TD>
                  <TD>
                    Learn how to route a request to the right service based on
                    the request&apos;s path.
                  </TD>
                </TR>
                <TR>
                  <TD>
                    <AppLink href="/slice">Slice</AppLink>
                  </TD>
                  <TD>
                    A modern IDL and serialization format developed in tandem
                    with IceRPC.
                  </TD>
                </TR>
                <TR>
                  <TD>
                    <AppLink href="/protobuf">Protobuf support</AppLink>
                  </TD>
                  <TD>
                     Learn how to call and implement Protobuf services with IceRPC.
                  </TD>
                </TR>
                <TR>
                  <TD>
                    <AppLink href="/icerpc/dependency-injection/di-and-icerpc-for-csharp">
                      Dependency injection
                    </AppLink>
                  </TD>
                  <TD>Learn how to use IceRPC with a DI container.</TD>
                </TR>
                <TR>
                  <TD>
                    <AppLink href="/icerpc/connection/security-with-tls">
                      Security with TLS
                    </AppLink>
                  </TD>
                  <TD>Learn how to secure your communications with TLS.</TD>
                </TR>
              </tbody>
            </Table>
            <Divider />
            <HomeTitle
              title="IceRPC by example"
              description="See IceRPC in action"
            />
            <Examples />
            <Divider />
            <HomeTitle title="Explore the docs" description="Let's go!" />
            <Explore />
            <Divider />
            <HomeTitle title="License" description="" />
            <License />
          </article>
        </div>
      </div>
    </div>
  );
}
