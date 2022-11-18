// Copyright (c) ZeroC, Inc. All rights reserved.

import { Tag, nodes } from '@markdoc/markdoc';
import { Document } from '../../components/Shell/Document';

export default {
  ...nodes.document,
  render: Document,
  transform(node, config) {
    const children = node.transformChildren(config);

    return new Tag(this.render, { config: children }, children);
  }
};
