// Copyright (c) ZeroC, Inc.

import { nodes } from '@markdoc/markdoc';
import { CodeBlock } from 'components';

const fence = {
  render: CodeBlock,
  attributes: {
    ...nodes.fence.attributes,
    title: {
      type: String,
      required: false
    },
    addEncoding: {
      type: Boolean,
      required: false,
      default: false
    }
  }
};

export default fence;
