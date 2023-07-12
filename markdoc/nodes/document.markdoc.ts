// Copyright (c) ZeroC, Inc.

import { nodes, Node, Config, Tag } from '@markdoc/markdoc';
import readingTime from 'reading-time';

const convertToRawText = (doc: Node) => {
  let output = '';
  for (const node of doc.walk()) {
    if (node.type === 'inline') output += '\n';
    if (node.type === 'text') output += node.attributes.content;
  }

  return output;
};

const document = {
  ...nodes.document,
  render: 'Document',
  attributes: nodes.document.attributes,
  transform(node: Node, config: Config) {
    const frontmatter = config.variables?.frontmatter;
    const children = node.transformChildren(config) ?? [];
    const rawText = convertToRawText(node);

    return new Tag(
      `${this.render}`,
      {
        title: frontmatter.title,
        description: frontmatter.description,
        // 149 is the average reading speed of a college student reading technical material
        readingTime: readingTime(rawText, { wordsPerMinute: 149 }).text,
        mode: frontmatter.mode,
        showToc: frontmatter.showToc
      },
      children
    );
  }
};

export default document;
