// Copyright (c) ZeroC, Inc. All rights reserved.

import { MiniCard } from '../../components/Card';
import { Tag, nodes } from '@markdoc/markdoc';

export const linkCard = {
  ...nodes.document,
  render: MiniCard,
  attributes: {
    title: {
      type: 'string',
      required: true
    },
    link: {
      type: 'string',
      required: true
    },
    icon: {
      type: 'string',
      required: true
    }
  },
  transform(node, config) {
    const attributes = node.transformAttributes(config);
    const { title, link, icon } = attributes;
    return new Tag(this.render, { ...attributes, title, link, icon });
  }
};
