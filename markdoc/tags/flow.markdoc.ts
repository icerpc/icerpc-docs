// Copyright (c) ZeroC, Inc. All rights reserved.

import Flow from "../../components/Flow";
import { Tag } from '@markdoc/markdoc';
import {Node, Edge} from 'reactflow';

const nodes: Node[] = [
    {
      id: '1',
      data: { label: 'Node 1' },
      position: { x: 250, y: 5 }
    },
    {
      id: '2',
      data: { label: 'Node 2' },
      position: { x: 100, y: 100 }
    },
    {
      id: '3',
      data: { label: 'Node 3' },
      position: { x: 400, y: 100 }
    }
  ];

  const edges: Edge[] = [
    { id: 'e1-2', source: '1', target: '2' },
    { id: 'e1-3', source: '1', target: '3' }
  ];

export const flow = {
  render: Flow,
  attributes: {},
  transform(node, config) {
    const attributes = node.transformAttributes(config);

    return new Tag(this.render, { ...attributes, nodes, edges });
  }
};
