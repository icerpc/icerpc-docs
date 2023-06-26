// Copyright (c) ZeroC, Inc.

import { nodes, Node, Config, Tag } from '@markdoc/markdoc';
import { Document } from 'components/Nodes/Document';

const document = {
  ...nodes.document,
  render: Document,
  attributes: nodes.document.attributes,
  transform(node: Node, config: Config) {
    const frontmatter = config.variables?.markdoc.frontmatter;
    const children = node.transformChildren(config) ?? [];
    return new Tag(
      `${this.render}`,
      {
        title: frontmatter.title,
        description: frontmatter.description,
        encoding: frontmatter.encoding,
        showToc: frontmatter.showToc
      },
      children
    );
  }
};

export default document;
