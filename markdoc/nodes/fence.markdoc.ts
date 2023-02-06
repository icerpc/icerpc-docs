// Copyright (c) ZeroC, Inc. All rights reserved.

import { nodes } from '@markdoc/markdoc';
import { CodeBlock } from 'components';

export default {
  render: CodeBlock,
  attributes: {
    ...nodes.fence.attributes,
    isValid: {
      type: Boolean,
      required: false,
      default: true
    }
  }
};
