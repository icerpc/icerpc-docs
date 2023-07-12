// Copyright (c) ZeroC, Inc.

import { nodes } from '@markdoc/markdoc';

const fence = {
  render: 'CodeBlock',
  attributes: {
    ...nodes.fence.attributes,
    title: {
      type: String,
      required: false
    },
    addMode: {
      type: Boolean,
      required: false,
      default: false
    }
  }
};

export default fence;
