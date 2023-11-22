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
        showDividers: frontmatter.showDividers,
        showNavigation: frontmatter.showNavigation
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

  // Add headings from step tags
  if ((node as Tag).name === 'Step') {
    sections.push({
      ...node.attributes,
      icerpcSlice: false,
      showDividers: false
    });
  }

  if (node) {
    if (node.name === 'Heading') {
      let title = '';
      // Handle headings with italic tags
      for (const child of node.children) {
        if (typeof child === 'string') {
          title += child;
        } else if (child.name === 'em') {
          for (const grandchild of child.children) {
            if (typeof grandchild === 'string') {
              title += grandchild;
            }
          }
        }
      }

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
