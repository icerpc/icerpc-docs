// Copyright (c) ZeroC, Inc.

import { Config, nodes, Node, Tag } from '@markdoc/markdoc';
import { CodeBlock } from 'components';

export default {
  render: CodeBlock,
  attributes: {
    ...nodes.fence.attributes,
    isValid: {
      type: Boolean,
      required: false,
      default: true
    },
    title: {
      type: String,
      required: false
    }
  }
};
