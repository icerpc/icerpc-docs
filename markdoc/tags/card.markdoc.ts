// Copyright (c) ZeroC, Inc. All rights reserved.

import { Card } from '../../components/Card';
import { Tag, nodes } from '@markdoc/markdoc';

export const card = {
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
  transform(node, config) {
    const attributes = node.transformAttributes(config);
    const { title, description, icon } = attributes;
    return new Tag(this.render, { ...attributes, title, description, icon });
  }
};
