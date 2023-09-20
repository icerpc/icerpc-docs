// Copyright (c) ZeroC, Inc.

import { nodes, Node, Config, Tag } from '@markdoc/markdoc';

const document = {
  ...nodes.document,
  render: 'Document',
  attributes: nodes.document.attributes,
  transform(node: Node, config: Config) {
    const frontmatter = config.variables?.frontmatter;
    const children = node.transformChildren(config) ?? [];
    const path = config.variables?.path;

    return new Tag(
      `${this.render}`,
      {
        title: frontmatter.title,
        description: frontmatter.description,
        path: path,
        mode: frontmatter.mode,
        showAside: frontmatter.showAside,
        showReadingTime: frontmatter.showReadingTime,
        showDividers: frontmatter.showDividers
      },
      children
    );
  }
};

export default document;
