// Copyright (c) ZeroC, Inc.

import React, { ReactElement } from 'react';

import { Mode } from 'types';
import { AsideItem, ModeSection } from 'components';

type Heading = {
  level: number;
  id: string;
  children: string;
};

export function collectHeadings(
  children: ReactElement[],
  mode: Mode
): AsideItem[] {
  // Check if a given node is a heading
  const isHeading = (x: any): x is Heading => {
    return (
      (x as Heading).level !== undefined &&
      (x as Heading).id !== undefined &&
      (x as Heading).children !== undefined &&
      typeof (x as Heading).children == 'string'
    );
  };

  // Check if a given node is a step

  // Filter out any nodes that don't match the mode, flatten the nodes and then map them to an array of AsideItem
  // objects
  const filterNodesByMode = (node: ReactElement, mode: Mode) => {
    if (node.type == ModeSection)
      if (node.props.mode === mode) return true;
      else return false;
    return true;
  };

  // Flattens a node if it has an mode prop, otherwise returns the node as an array with a single element
  const flattenNodes = (node: ReactElement) => {
    if (node.props?.mode) return node.props.children;
    else return node;
  };

  const mapNodesToHeadings = (
    node: ReactElement
  ): AsideItem | AsideItem[] | null => {
    const { id, children, level, title } = node.props;

    let result: AsideItem | AsideItem[] | null = null;

    if (isHeading(node.props)) {
      result = { id, title: children, level };
    } else if (id && title && level) {
      const baseHeading = { id, title, level };

      // Recursively collect subheadings from the children of the `step` node
      const subHeadings = collectHeadings(children, mode).filter(
        Boolean
      ) as AsideItem[];

      result =
        subHeadings.length > 0 ? [baseHeading, ...subHeadings] : baseHeading;
    }

    return result;
  };

  return React.Children.toArray(children)
    .map((c) => c as ReactElement)
    .filter((c) => filterNodesByMode(c, mode))
    .flatMap(flattenNodes)
    .map(mapNodesToHeadings)
    .flatMap((x) => x)
    .filter(Boolean) as AsideItem[];
}
