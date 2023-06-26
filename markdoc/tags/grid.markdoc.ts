// Copyright (c) ZeroC, Inc.

import { Tag, Config, Node } from '@markdoc/markdoc';
import { Grid } from 'components/Tags/Grid';

const grid = {
  render: Grid,
  children: ['card'],
  attributes: {
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
    const { trailinglink } = attributes;
    return new Tag(`${`${this.render}`}`, {
      children,
      trailinglink
    });
  }
};

export default grid;
