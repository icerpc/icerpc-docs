// Copyright (c) ZeroC, Inc.

import { Tag, Node, Config } from '@markdoc/markdoc';

const title = {
  render: 'Title',
  transform(node: Node, config: Config) {
    const attributes = node.transformAttributes(config);
    const frontmatter = config.variables?.frontmatter;
    const { title, description } = frontmatter;
    return new Tag(`${this.render}`, {
      ...attributes,
      title,
      description
    });
  }
};

export default title;
