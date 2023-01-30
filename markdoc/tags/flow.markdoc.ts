// Copyright (c) ZeroC, Inc. All rights reserved.

import Flow from 'components/Flow';
import { Tag, Node, Config } from '@markdoc/markdoc';

export const flow = {
  render: Flow,
  attributes: {
    nodes: {
      type: 'array',
      required: true
    },
    edges: {
      type: 'array',
      required: true
    }
  },
  transform(node: Node, config: Config) {
    const attributes = node.transformAttributes(config);
    const { nodes, edges } = attributes;
    return new Tag(`${`${this.render}`}`, { ...attributes, nodes, edges });
  }
};
