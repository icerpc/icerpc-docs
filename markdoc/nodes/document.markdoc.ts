// Copyright (c) ZeroC, Inc.

import { Tag, nodes, Node, Config } from '@markdoc/markdoc';
import { Document } from 'components/Nodes/Document';

export default {
  ...nodes.document,
  render: Document,
  attributes: nodes.document.attributes
};
