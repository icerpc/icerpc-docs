// Copyright (c) ZeroC, Inc.

import Markdoc from '@markdoc/markdoc';
import React from 'react';
import { components } from '@/markdoc/schema';
import { getAllPagePaths, getMarkdownContent } from '@/lib/markdown';
import { markdownHref } from '@/lib/page-markdown';
import { SideNav } from '@/components';
import { Metadata } from 'next';
import { baseUrls } from '@/data';
import { notFound } from 'next/navigation';

export const dynamicParams = false;

type Params = {
  slug: string[];
};

type PageProps = {
  params: Params;
};

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params;
  const path = '/' + (params.slug.join('/') ?? '');
  const { frontmatter } = await getMarkdownContent(path);
  const title: string = frontmatter?.title ?? '';
  const description: string = frontmatter?.description ?? '';
  return {
    title,
    description,
    // The page as Markdown, for agents and crawlers (lib/page-markdown.ts).
    alternates: { types: { 'text/markdown': markdownHref(path) } },
    twitter: {
      title,
      description
    },
    openGraph: {
      title,
      description,
      images: {
        url: `https://docs.icerpc.dev/api/og?title=${
          baseUrls.includes(path) ? 'Overview' : title
        }&description=${description}&path=${encodeURIComponent(path)}`
      }
    }
  };
}

export function generateStaticParams() {
  return getAllPagePaths().map((path) => ({ slug: path.slice(1).split('/') }));
}

export default async function Page(props: PageProps) {
  const params = await props.params;
  const path = '/' + (params.slug.join('/') ?? '');
  const { content } = await getMarkdownContent(path);

  if (!content) {
    return notFound();
  }

  return (
    <div className="mt-[6.4rem] flex grow flex-row justify-center">
      <div className="flex max-w-400 grow flex-row justify-center">
        <SideNav path={path} />
        <div className="grow">
          <div id="skip-nav" />
          {Markdoc.renderers.react(content, React, {
            components
          })}
        </div>
      </div>
    </div>
  );
}
