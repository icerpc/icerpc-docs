// Copyright (c) ZeroC, Inc.

import { MiniLink, MiniCard } from 'components/Tags/Card';
import { Tag, nodes, Node, Config } from '@markdoc/markdoc';

export const miniCard = {
  ...nodes.document,
  render: MiniCard,
  attributes: {
    title: {
      type: 'string',
      required: true
    },
    description: {
      type: 'string',
      required: true
    },
    href: {
      type: 'string',
      required: true
    }
  }
};

export const linkCard = {
  ...nodes.document,
  render: MiniLink,
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
  transform(node: Node, config: Config) {
    const attributes = node.transformAttributes(config);
    const { title, link, icon } = attributes;
    return new Tag(`${this.render}`, { ...attributes, title, link, icon });
  }
};
