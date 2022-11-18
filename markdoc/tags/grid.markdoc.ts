// Copyright (c) ZeroC, Inc. All rights reserved.

import { Tag } from '@markdoc/markdoc';
import Grid from '../../components/Grid';

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
    }
  },
  transform(node, config) {
    const attributes = node.transformAttributes(config);
    const children = node.transformChildren(config);
    const rows = attributes.rows;
    const columns = attributes.columns;
    return new Tag(this.render, { children, rows, columns });
  }
};
