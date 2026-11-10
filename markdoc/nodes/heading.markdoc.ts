// Copyright (c) ZeroC, Inc.

import {
  Tag,
  type Node,
  type Config,
  type RenderableTreeNode,
  type Schema
} from '@markdoc/markdoc';

const heading: Schema = {
  render: 'Heading',
  children: ['inline'],
  attributes: {
    id: { type: String },
    level: { type: Number, required: true, default: 1 },
    className: { type: String },
    icerpcSlice: { type: Boolean, default: false }
  },
  transform(node: Node, config: Config) {
    const attributes = node.transformAttributes(config);
    const children = node.transformChildren(config);

    const id = generateID(children, attributes);
    const frontmatter = config.variables?.frontmatter;
    const showDividers = frontmatter.showDividers;
    return new Tag(
      `${this.render}`,
      { ...attributes, id, showDividers },
      children
    );
  }
};

/** The anchor a heading gets from its text, unless one is set by hand. */
export function headingAnchor(children: RenderableTreeNode[]): string {
  return children
    .filter((child) => typeof child === 'string')
    .join(' ')
    .replace(/[?]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+$/, '')
    .toLowerCase();
}

function generateID(
  children: RenderableTreeNode[],
  attributes: Record<string, unknown>
) {
  if (attributes.id && typeof attributes.id === 'string') {
    return attributes.id;
  }
  return headingAnchor(children);
}

// Handles converting italic and bold tags to strings
// function stringifyChildren(children: RenderableTreeNode[]) {
//   children.map((child) => {

//   });
// }

export default heading;
