// Copyright (c) ZeroC, Inc.

import { nodes } from '@markdoc/markdoc';

export const miniCard = {
  ...nodes.document,
  render: 'Card',
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
