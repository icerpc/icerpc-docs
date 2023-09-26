// Copyright (c) ZeroC, Inc.

import { nodes, Node, Config, Tag } from '@markdoc/markdoc';
import { Mode } from 'types';
import { getModeFromPath } from 'utils/modeFromPath';

const document = {
  ...nodes.document,
  render: 'Document',
  attributes: nodes.document.attributes,
  transform(node: Node, config: Config) {
    const frontmatter = config.variables?.frontmatter;
    const path = config.variables?.path;
    const mode = getModeFromPath(path);
    const children = node.transformChildren(config) ?? [];
    const headings = children
      .map((child) => extractHeadings(child, [], mode))
      .flat();

    return new Tag(
      `${this.render}`,
      {
        title: frontmatter.title,
        description: frontmatter.description,
        mode,
        headings,
        path,
        readingTime:
          frontmatter.showReadingTime !== false
            ? config.variables?.readingTime
            : undefined,
        showReadingTime: frontmatter.showReadingTime,
        showDividers: frontmatter.showDividers
      },
      children
    );
  }
};

function extractHeadings(node: any, sections: any[] = [], mode?: Mode) {
  // Filter out headings that are not the mode of the document
  if ((node as Tag) && mode) {
    const tag = node as Tag;
    if (tag.name === 'ModeSection' && tag.attributes.mode != mode) return;
  }
  if (node) {
    if (node.name === 'Heading') {
      const title = node.children[0];

      if (typeof title === 'string') {
        sections.push({
          ...node.attributes,
          title
        });
      }
    }

    if (node.children) {
      for (const child of node.children) {
        extractHeadings(child, sections, mode);
      }
    }
  }

  return sections;
}

export default document;
