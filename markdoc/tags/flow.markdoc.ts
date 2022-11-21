// Copyright (c) ZeroC, Inc. All rights reserved.

import Flow from '../../components/Flow';
import { Tag } from '@markdoc/markdoc';

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
  transform(node, config) {
    const attributes = node.transformAttributes(config);
    const { nodes, edges } = attributes;
    return new Tag(this.render, { ...attributes, nodes, edges });
  }
};
