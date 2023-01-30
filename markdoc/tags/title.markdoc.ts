// Copyright (c) ZeroC, Inc. All rights reserved.

import { Tag, Node, Config } from '@markdoc/markdoc';
import { Title } from 'components/Title';

export const title = {
  render: Title,
  children: [],
  attributes: {},
  transform(node: Node, config: Config) {
    const attributes = node.transformAttributes(config);
    const frontmatter = config.variables?.markdoc.frontmatter;
    const { title, description } = frontmatter;
    const breadcrumbs = frontmatter.breadcrumbs || [];
    return new Tag(`${this.render}`, {
      ...attributes,
      title,
      description,
      breadcrumbs
    });
  }
};
