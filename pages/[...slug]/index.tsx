// Copyright (c) ZeroC, Inc.

import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import path from 'path';
import Markdoc, { Config } from '@markdoc/markdoc';
import React from 'react';
import config, { components } from 'markdoc/schema';
import { getAllMarkdownFiles } from 'lib/markdown';
import fs from 'fs';
import yaml from 'js-yaml';
import { SideNav } from 'components';

type Params = {
  slug: string[];
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const baseUrls = [
    'slice',
    'icerpc',
    'icerpc-for-ice-users',
    'getting-started'
  ];
  const paths: { params: { slug: string[] } }[] = [];
  for (const base of baseUrls) {
    const markdownFiles = getAllMarkdownFiles(path.join('pages', base), []);
    for (const filePath of markdownFiles) {
      const pathWithoutMd = filePath.replace(/\.md$/, '');
      const splitPath = pathWithoutMd.split(path.sep);

      // Remove "index" from the slug if it's the last element
      if (splitPath[splitPath.length - 1] === 'index') {
        splitPath.pop();
      }

      // For 'slice' base, create paths for 'slice1' and 'slice2'
      if (base === 'slice') {
        const slice1Slug = splitPath
          .map((part) => (part === 'slice' ? 'slice1' : part))
          .slice(1);
        const slice2Slug = splitPath
          .map((part) => (part === 'slice' ? 'slice2' : part))
          .slice(1);
        paths.push({ params: { slug: slice1Slug } });
        paths.push({ params: { slug: slice2Slug } });
      } else {
        paths.push({ params: { slug: splitPath.slice(1) } });
      }
    }
  }

  return {
    paths: paths,
    fallback: false
  };
};

export const getStaticProps: GetStaticProps<object, Params> = async ({
  params
}) => {
  // Destructure slug from the params
  const { slug } = params ?? {};
  const slugString = '/' + slug?.join('/') ?? '';

  // Build the base path from the slug, or use 'index' as default if no slug is provided
  let basePathFromSlug = slug
    ? path.join(process.cwd(), 'pages', ...slug)
    : path.join(process.cwd(), 'pages', 'index');

  // If slug starts with slice1 or slice2, replace it with slice
  // The markdown files are located in the slice directory
  if (
    basePathFromSlug.startsWith(path.join(process.cwd(), 'pages', 'slice1')) ||
    basePathFromSlug.startsWith(path.join(process.cwd(), 'pages', 'slice2')) ||
    (slug &&
      slug.length === 1 &&
      (slug[0] === 'slice1' || slug[0] === 'slice2'))
  ) {
    basePathFromSlug = basePathFromSlug.replace(/slice[12]/, 'slice');
  }

  // Try with .md extension, then fall back to /index.md
  let filePath = `${basePathFromSlug}.md`;
  if (!fs.existsSync(filePath)) {
    filePath = `${basePathFromSlug}/index.md`;
  }

  // If the markdown file exists, read its content, else set to null
  const fileContent = fs.existsSync(filePath)
    ? fs.readFileSync(filePath, 'utf8')
    : null;

  // If there's content in the file, parse the frontmatter
  let frontmatter;
  if (fileContent) {
    const ast = Markdoc.parse(fileContent);
    frontmatter = ast.attributes.frontmatter
      ? yaml.load(ast.attributes.frontmatter)
      : {};
  }

  //TODO: this doesn't ever get hit when a page is not found
  // Check if fileContent is available
  const hasPageContent = !!fileContent;

  // If there's content, return the source and metadata, else return notFound
  return hasPageContent
    ? { props: { source: fileContent, frontmatter, path: slugString } }
    : { notFound: true };
};

export default function Page({
  source,
  frontmatter,
  path
}: {
  source: string;
  frontmatter: any;
  path: string;
}) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  // Import markdoc nodes and tags from markdoc folder
  const tokenizer = new Markdoc.Tokenizer({ allowComments: true });
  const tokens = tokenizer.tokenize(source);
  const ast = Markdoc.parse(tokens);

  const updatedConfig: Config = {
    ...config,
    variables: {
      frontmatter,
      path
    }
  };

  const content = Markdoc.transform(ast, updatedConfig);
  return (
    <div className="mt-[6.5rem] flex grow flex-row justify-center lg:mt-[3.75rem]">
      <div className="flex max-w-[100rem] grow flex-row justify-center">
        <SideNav path={path} />
        <div className="grow">
          <div id="skip-nav" />
          {Markdoc.renderers.react(content, React, { components })}
        </div>
      </div>
    </div>
  );
}
