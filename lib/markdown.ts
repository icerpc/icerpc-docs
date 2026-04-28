// Copyright (c) ZeroC, Inc.

import Markdoc, { Config } from '@markdoc/markdoc';
import config from '@/markdoc/schema';
import fs from 'fs';
import yaml from 'js-yaml';
import readingTimeFunc from 'reading-time';
import path from 'path';

export function getAllMarkdownFiles(
  dirPath: string,
  arrayOfFiles: string[] = []
): string[] {
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const absolutePath = path.join(dirPath, file);

    if (fs.statSync(absolutePath).isDirectory()) {
      arrayOfFiles = getAllMarkdownFiles(absolutePath, arrayOfFiles);
    } else if (file.endsWith('.md')) {
      arrayOfFiles.push(absolutePath);
    }
  });

  return arrayOfFiles;
}

export async function getMarkdownContent(slug: string) {
  // Build the base path from the slug, or use 'index' as default if no slug is provided
  const basePathFromSlug = slug
    ? path.join(process.cwd(), 'content', slug)
    : path.join(process.cwd(), 'content', 'index');

  // Try with .md extension, then fall back to /index.md
  let filePath = `${basePathFromSlug}.md`;
  if (!fs.existsSync(filePath)) {
    filePath = `${basePathFromSlug}/index.md`;
  }

  // If the markdown file exists, read its content, else set to null
  const fileContent = fs.existsSync(filePath)
    ? fs.readFileSync(filePath, 'utf8')
    : null;

  if (!fileContent) return { content: null };

  // If there's content in the file, parse the frontmatter
  let frontmatter;
  if (fileContent) {
    const ast = Markdoc.parse(fileContent);
    frontmatter = ast.attributes.frontmatter
      ? yaml.load(ast.attributes.frontmatter)
      : {};
  }

  // Compute the reading time
  const readingTime = readingTimeFunc(fileContent, {
    wordsPerMinute: 149
  }).text;

  // Transform the markdoc
  const tokenizer = new Markdoc.Tokenizer({ allowComments: true });
  const tokens = tokenizer.tokenize(fileContent);
  const ast = Markdoc.parse(tokens);
  const updatedConfig: Config = {
    ...config,
    variables: {
      frontmatter,
      path: slug,
      readingTime
    }
  };
  return {
    content: Markdoc.transform(ast, updatedConfig),
    frontmatter: (frontmatter as any) || {}
  };
}
