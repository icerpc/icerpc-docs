// Copyright (c) ZeroC, Inc.

import { Tag, Node, Config, RenderableTreeNode } from '@markdoc/markdoc';

const heading = {
  render: 'Heading',
  children: ['inline'],
  attributes: {
    id: { type: String },
    level: { type: Number, required: true, default: 1 },
    className: { type: String },
    icerpcSpecific: { type: Boolean, default: false }
  },
  transform(node: Node, config: Config) {
    const attributes = node.transformAttributes(config);
    const children = node.transformChildren(config);
    const id = generateID(children, attributes);

    return new Tag(`${this.render}`, { ...attributes, id }, children);
  }
};

function generateID(
  children: RenderableTreeNode[],
  attributes: Record<string, any>
) {
  if (attributes.id && typeof attributes.id === 'string') {
    return attributes.id;
  }
  return children
    .filter((child) => typeof child === 'string')
    .join(' ')
    .replace(/[?]/g, '')
    .replace(/\s+/g, '-')
    .toLowerCase();
}

export default heading;
