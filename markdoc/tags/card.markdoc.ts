// Copyright (c) ZeroC, Inc.

import { nodes } from '@markdoc/markdoc';

const card = {
  ...nodes.document,
  render: 'Card',
  attributes: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    href: {
      type: String,
      required: true
    }
  }
};

export default card;
