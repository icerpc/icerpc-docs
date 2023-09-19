// Copyright (c) ZeroC, Inc.

import { Node, Config, Tag } from '@markdoc/markdoc';

const link = {
  render: 'AppLink',
  attributes: {
    href: {
      type: String
    }
  },
  transform(node: Node, config: Config) {
    const attributes = node.transformAttributes(config);
    const children = node.transformChildren(config);

    // The path of the page that contains the link
    const path = config.variables?.path;
    attributes.path = path;
    return new Tag(`${this.render}`, attributes, children);
  }
};

export default link;
