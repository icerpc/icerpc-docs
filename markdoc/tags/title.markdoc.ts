// Copyright (c) ZeroC, Inc.

import { Tag, Node, Config } from '@markdoc/markdoc';
import { Title } from 'components/Title';

const title = {
  render: Title,
  children: [],
  attributes: {},
  transform(node: Node, config: Config) {
    const attributes = node.transformAttributes(config);
    const frontmatter = config.variables?.markdoc.frontmatter;
    const { title, description, encoding } = frontmatter;
    return new Tag(`${this.render}`, {
      ...attributes,
      title,
      description,
      encoding
    });
  }
};

export default title;
