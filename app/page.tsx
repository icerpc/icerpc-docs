// Copyright (c) ZeroC, Inc.

// The home page will be handled separately from the other pages in the
// future so that we can have a different layout for the home page. For now
// we just use the same layout as the rest of the docs and use a top level
// index.md file.

import React from 'react';
import Markdoc from '@markdoc/markdoc';
import { components } from 'markdoc/schema';

import { Hero } from './hero';
import { getMarkdownContent } from 'lib/markdown';
import { PathProvider } from 'context/state';
import { HomeTitle } from 'components/Tags/HomeTitle';
import { Divider, Table, TH, Title, TR } from 'components';

export default async function Home() {
  const path = '/';
  const { content } = await getMarkdownContent(path);

  if (!content) {
    return <div>Not found</div>;
  }

  return (
    <div className="mt-[3.75rem] flex grow flex-row justify-center lg:mt-[3.75rem]">
      <div className="flex max-w-[120rem] grow flex-row justify-center">
        <div id="skip-nav" />
        <main className="relative">
          <Hero />
          <article>
            <Title title="Home" description="IceRPC Documentation" path="/" />
            <HomeTitle title="Welcome" description="" />
            <p>
              Welcome to the IceRPC documentation! You will find on this site a
              wide range of materials, including installation instructions,
              tutorials, programming guides, and more.
            </p>

            <p>
              Want to make RPCs without reinventing the wheel? Want to take
              advantage of QUIC through a convenient, modern API? You've come to
              the right place.
            </p>

            <p>
              IceRPC is currently available for C# / .NET. We plan on adding
              support for more languages soon, starting with Rust.
            </p>
            <Divider />
            <HomeTitle title="Key Features" description="Discover IceRPC" />
            <Table>
              <thead>
                <TR>
                  <TH>Feature</TH>
                  <TH>Description</TH>
                </TR>
              </thead>
              <tbody>
                <TR>
                  
              </tbody>
            </Table>
          </article>
        </main>
      </div>
    </div>
  );
}
