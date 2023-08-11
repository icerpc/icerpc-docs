// Copyright (c) ZeroC, Inc.

import { nodes, Node, Config, Tag } from '@markdoc/markdoc';

const document = {
  ...nodes.document,
  render: 'Document',
  attributes: nodes.document.attributes,
  transform(node: Node, config: Config) {
    const frontmatter = config.variables?.frontmatter;
    const children = node.transformChildren(config) ?? [];

    return new Tag(
      `${this.render}`,
      {
        title: frontmatter.title,
        description: frontmatter.description,
        mode: frontmatter.mode,
        showAside: frontmatter.showAside,
        showReadingTime: frontmatter.showReadingTime
      },
      children
    );
  }
};

export default document;
