// Copyright (c) ZeroC, Inc.

import Markdoc, { Config } from '@markdoc/markdoc';
import config from 'markdoc/schema';
import fs from 'fs';
import yaml from 'js-yaml';
import { getModeFromPath } from 'utils/modeFromPath';
import readingTimeFunc from 'reading-time';
import path from 'path';
import { Mode } from 'types';

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
  let basePathFromSlug = slug
    ? path.join(process.cwd(), 'content', slug)
    : path.join(process.cwd(), 'content', 'index');

  // If slug starts with slice1 or slice2, replace it with slice
  // The markdown files are located in the slice directory
  if (
    basePathFromSlug.startsWith(
      path.join(process.cwd(), 'content', 'slice1')
    ) ||
    basePathFromSlug.startsWith(
      path.join(process.cwd(), 'content', 'slice2')
    ) ||
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

  if (!fileContent) return { content: null };

  // If there's content in the file, parse the frontmatter
  let frontmatter;
  if (fileContent) {
    const ast = Markdoc.parse(fileContent);
    frontmatter = ast.attributes.frontmatter
      ? yaml.load(ast.attributes.frontmatter)
      : {};
  }

  // Compute the reading time. If in a slice1 or slice2 page, filter out the
  // other slice's content
  const mode = getModeFromPath(slug);
  const readingTime = readingTimeFunc(filterMarkdown(fileContent, mode), {
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
  return { content: Markdoc.transform(ast, updatedConfig) };
}

// This function is used to filter out tags that don't match the current mode.
// For example it will remove all content between {% slice1 %} and {% /slice1 %}
// if the current mode is Slice2.
function filterMarkdown(markdown: string, mode?: Mode): string {
  // If no mode is provided, return the markdown as-is
  if (!mode) return markdown;

  // Define a regex pattern to capture all slices in a case-insensitive manner
  const regexPattern = new RegExp(
    `{% (${Object.values(Mode)
      .join('|')
      .toLowerCase()}) %}([\\s\\S]*?){% /\\1 %}`,
    'gi'
  );

  // Retain only slices that match the current mode
  const filteredMarkdown = markdown.replace(regexPattern, (match, p1) => {
    // Convert the matched mode to uppercase before comparison
    return p1.toUpperCase() === mode ? match : '';
  });

  return filteredMarkdown;
}
