// Copyright (c) ZeroC, Inc.

import { Tag, Node, Config } from '@markdoc/markdoc';

export const step = {
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
        id: id ?? title.replace(/[?]/g, '').replace(/\s+/g, '-').toLowerCase()
      },
      children
    );
  }
};
