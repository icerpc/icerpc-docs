// Copyright (c) ZeroC, Inc.

import { Tag, Node, Config } from '@markdoc/markdoc';

export const step = {
  render: 'Step',
  attributes: {
    title: {
      type: String
    }
  },
  transform(node: Node, config: Config) {
    const attributes = node.transformAttributes(config);
    const children = node.transformChildren(config);
    const { title } = attributes;
    return new Tag(`${`${this.render}`}`, {
      title,
      level: 2,
      id: title.replace(/[?]/g, '').replace(/\s+/g, '-').toLowerCase(),
      children
    });
  }
};
