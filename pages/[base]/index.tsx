import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import fs from 'fs';
import path from 'path';
import Markdoc, { Config } from '@markdoc/markdoc';
import React from 'react';
import yaml from 'js-yaml';
import { config, components } from 'markdoc/scheme/scheme';

// Define your params shape
type Params = {
  base: string;
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const baseUrls = ['slice1', 'slice2', 'icerpc-core', 'icerpc-for-ice-users', 'getting-started'];

  const paths = baseUrls.map((base) => ({
    params: { base },
  }));

  return { paths, fallback: true };
};


export const getStaticProps: GetStaticProps<object, Params> = async ({ params }) => {

  // If params is undefined, return 404
  if (!params) {
    return {
      notFound: true,
    };
  }

  const { base } = params;

  // If base is slice1 or slice2, we need to use the slice folder
  // Otherwise, we use the base folder
  const baseDir = base === 'slice1' || base === 'slice2' ? 'slice' : base;
  const filePath = path.join(process.cwd(), `pages/${baseDir}`, 'index.md');
  const fileContent = fs.readFileSync(filePath, 'utf8');

  return {
    props: {
      source: fileContent,
    },
  };
};

export default function Page({ source }: { source: string }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  // Import markdoc nodes and tags from markdoc folder

  const ast = Markdoc.parse(source);
  const frontmatter = ast.attributes.frontmatter
  ? yaml.load(ast.attributes.frontmatter)
  : {};

  const updatedConfig: Config = {
    ...config,
    variables: {
      frontmatter,
    },
  };


  const content = Markdoc.transform(ast, updatedConfig);
  return Markdoc.renderers.react(content, React, {components});
}

