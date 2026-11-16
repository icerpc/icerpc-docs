// Copyright (c) ZeroC, Inc.

import { Tag, type Node, type Config } from '@markdoc/markdoc';

import { headingAnchor } from '../nodes/heading.markdoc.ts';

const step = {
  render: 'Step',
  attributes: {
    title: {
      type: String
    },
    level: {
      type: Number,
      default: 2
    },
    id: {
      type: String,
      required: false
    }
  },
  transform(node: Node, config: Config) {
    const attributes = node.transformAttributes(config);
    const children = node.transformChildren(config);
    const { title, level, id } = attributes;

    return new Tag(
      `${`${this.render}`}`,
      {
        title,
        level,
        id: id ?? headingAnchor([title])
      },
      children
    );
  }
};

export default step;
