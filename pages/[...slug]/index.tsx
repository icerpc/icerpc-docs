//  Page for handling routing of the dynamic route [mode]

import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import path from 'path';
import Markdoc, { Config } from '@markdoc/markdoc';
import React from 'react';
import yaml from 'js-yaml';
import { config, components } from 'markdoc/scheme/scheme';
import { getAllMarkdownFiles } from 'lib/markdown';
import fs from 'fs';


type Params = {
    slug: string[];
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
    const baseUrls = ['slice', 'icerpc-core', 'icerpc-for-ice-users', 'getting-started'];
    const paths = baseUrls.flatMap((base) => {
        const baseDir = base;
        const markdownFiles = getAllMarkdownFiles(`pages/${baseDir}`, []);
        const modifiedMarkdownFiles = markdownFiles.reduce<string[]>((acc, filePath) => {
            if (base === 'slice') {
                const slice1FilePath = filePath.replace(/^slice\//, 'slice1/');
                const slice2FilePath = filePath.replace(/^slice\//, 'slice2/');
                return [...acc, slice1FilePath, slice2FilePath];
            } else {
                return [...acc, filePath];
            }
        }, []);

        return modifiedMarkdownFiles.map((filePath) => {
            const slug = filePath.replace(/\.md$/, '').split('/').slice(1);
            return {
                params: {
                    slug,
                },
            };
        });
    });
    return {
    paths: paths,
    fallback: true,
    };
};



export const getStaticProps: GetStaticProps<object, Params> = async ({ params }) => {
    const { slug } = params ?? {};

    // Generate the file path based on the slug
    let filePath;
    let indexFilePath;

    if (slug) {
      let baseFilePath = path.join(process.cwd(), 'pages', ...slug);
      // If slug starts with slice1/ or slice2/, replace it with slice/ because markdown files are located in slice/
      if (baseFilePath.startsWith(path.join(process.cwd(), 'pages', 'slice1')) || baseFilePath.startsWith(path.join(process.cwd(), 'pages', 'slice2')) ||
        (slug.length === 1 && (slug[0] === 'slice1' || slug[0] === 'slice2'))) {
        baseFilePath = baseFilePath.replace(/slice[12]/, 'slice');
      }

      filePath = `${baseFilePath}.md`;
      indexFilePath = `${baseFilePath}/index.md`;
    } else {
      indexFilePath = path.join(process.cwd(), 'pages', 'index.md');
    }

    const fileContent = filePath && fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf8') : null;
    const fallbackFileContent = indexFilePath && fs.existsSync(indexFilePath) ? fs.readFileSync(indexFilePath, 'utf8') : null;

    return {
        props: {
            source: fileContent || fallbackFileContent || '',
        },
        notFound: !(fileContent || fallbackFileContent),
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
    return Markdoc.renderers.react(content, React, { components });
}