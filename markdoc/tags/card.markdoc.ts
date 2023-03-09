// Copyright (c) ZeroC, Inc.

import { Card } from 'components/Card';
import { Tag, nodes, Node, Config } from '@markdoc/markdoc';

export default {
  ...nodes.document,
  render: Card,
  attributes: {
    title: {
      type: 'string',
      required: true
    },
    description: {
      type: 'string',
      required: true
    },
    icon: {
      type: 'string',
      required: true
    },
    link: {
      type: 'string',
      required: true
    }
  },
  transform(node: Node, config: Config) {
    const attributes = node.transformAttributes(config);
    const { title, description, icon } = attributes;
    return new Tag(`${this.render}`, {
      ...attributes,
      title,
      description,
      icon
    });
  }
};
