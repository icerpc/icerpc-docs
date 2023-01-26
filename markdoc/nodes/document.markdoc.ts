// Copyright (c) ZeroC, Inc. All rights reserved.

import { Tag, nodes } from '@markdoc/markdoc';
import { Document } from 'components/Nodes/Document';

export default {
  ...nodes.document,
  render: Document,
  attributes: nodes.document.attributes,
  transform(node, config) {
    const frontmatter = node.attributes.frontmatter
      .split('\n')
      .reduce((acc, line) => {
        const [key, value] = line.split(':');
        acc[key] = value.trim();
        return acc;
      }, {});
    const children = node.transformChildren(config) ?? [];
    return new Tag(this.render, { frontmatter: frontmatter }, children);
  }
};
