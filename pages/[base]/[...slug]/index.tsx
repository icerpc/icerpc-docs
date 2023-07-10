//  Page for handling routing of the dynamic route [mode]

import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import path from 'path';
import Markdoc, { Config, Node, Tag } from '@markdoc/markdoc';
import React from 'react';
import yaml from 'js-yaml';
import { config, components } from 'markdoc/scheme/scheme';


// import * as tags from 'markdoc/tags';

type Params = {
  base: string;
  slug: string[];
}


export const getStaticPaths: GetStaticPaths<Params> = async () => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const fs = require('fs');
  const getAllMarkdownFiles = (folderPath: string, filePaths: string[] = []): string[] => {
    const entries = fs.readdirSync(folderPath, { withFileTypes: true });

    entries.forEach((entry: { name: string; isDirectory: () => any; }) => {
        const absolutePath = path.join(folderPath, entry.name);

        if (entry.isDirectory()) {
            filePaths = getAllMarkdownFiles(absolutePath, filePaths);
        } else if (entry.name.endsWith('.md')) {
            filePaths.push(absolutePath);
        }
    });

    return filePaths;
  };


  const bases = ['slice1', 'slice2', 'icerpc-core', 'icerpc-for-ice-users', 'getting-started'];
  const paths = bases.flatMap((base) => {
    // If base is slice1 or slice2, we need to use the slice folder
    // Otherwise, we use the base folder
    const baseDir = base === 'slice1' || base === 'slice2' ? 'slice' : base;
    const markdownFiles = getAllMarkdownFiles(`pages/${baseDir}`, []);
    return markdownFiles
      .filter((filePath) => !filePath.endsWith('/index.md')) // Exclude index.md files
      .map((filePath) => {
        const slug = filePath.replace(/\.md$/, '').split('/').slice(2);

        return {
          params: {
            base,
            slug,
          },
        };
      });
  });


  return {
    paths,
    fallback: true,
  };
};


export const getStaticProps: GetStaticProps<object, Params> = async ({ params }) => {
  // If params is undefined, return 404
  if (!params) {
    return {
      notFound: true,
    };
  }

  const { base, slug } = params;

  // If base is slice1 or slice2, we need to use the slice folder
  // Otherwise, we use the base folder
  const baseDir = base === 'slice1' || base === 'slice2' ? 'slice' : base;
  const filePath = path.join(process.cwd(), `pages/${baseDir}`, ...slug) + '.md';

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const fs = require('fs');
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




import readingTime from 'reading-time';

const convertToRawText = (doc: Node) => {
  let output = '';
  for (const node of doc.walk()) {
    if (node.type === 'inline') output += '\n';
    if (node.type === 'text') output += node.attributes.content;
  }

  return output;
};