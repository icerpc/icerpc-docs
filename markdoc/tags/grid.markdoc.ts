// Copyright (c) ZeroC, Inc. All rights reserved.

import { Tag, Config, Node } from '@markdoc/markdoc';
import { Grid } from 'components/Grid';

export const grid = {
  render: Grid,
  children: ['card'],
  attributes: {
    rows: {
      type: 'number',
      required: true
    },
    columns: {
      type: 'number',
      required: true
    },
    trailinglink: {
      type: 'object',
      required: false
    }
  },
  transform(node: Node, config: Config) {
    const attributes = node.transformAttributes(config);
    const children = node.transformChildren(config);
    const { rows, columns, trailinglink } = attributes;
    return new Tag(`${`${this.render}`}`, {
      children,
      rows,
      columns,
      trailinglink
    });
  }
};
