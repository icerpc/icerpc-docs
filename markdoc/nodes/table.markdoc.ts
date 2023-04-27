// Copyright (c) ZeroC, Inc.

import { Config, Tag, nodes, Node } from '@markdoc/markdoc';
import { Table, TH, TR, TD } from 'components/Nodes/Table';

export const table = {
  render: Table,
  attributes: {
    dividers: { type: Boolean, default: false }
  },
  transform(node: Node, config: Config) {
    const attributes = node.transformAttributes(config);
    const children = node.transformChildren(config);

    // Find the tbody node
    const tbody = children.find(
      (child): child is Tag =>
        child != null &&
        typeof child === 'object' &&
        (child as Tag).name === 'tbody'
    );

    // If there is no tbody, then there is no need to transform the table.
    if (!tbody) return;

    // Find all of the td nodes
    const tdTags = (tbody.children as Tag[])
      .flatMap((child) => child.children)
      .filter((child): child is Tag => (child as Tag).name === 'Td');

    // Set the dividers attribute on all of the td nodes
    if (attributes.dividers)
      tdTags.forEach((td) => (td.attributes.dividers = true));

    return new Tag(`${this.render}`, { ...attributes }, children);
  }
};

export const th = {
  render: TH,
  attributes: nodes.th.attributes
};

export const tr = {
  render: TR,
  attributes: nodes.tr.attributes
};

export const td = {
  render: TD,
  attributes: nodes.td.attributes
};
