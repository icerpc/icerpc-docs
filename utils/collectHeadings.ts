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

  const mapNodesToHeadings = (node: ReactElement): AsideItem | null => {
    if (isHeading(node.props)) {
      const { id, children, level } = node.props;
      return { id, title: children, level };
    } else if (node.props?.title && node.props?.level && node.props?.id) {
      return {
        id: node.props.id,
        title: node.props.title,
        level: node.props.level
      };
    } else {
      return null;
    }
  };

  return React.Children.toArray(children)
    .map((c) => c as ReactElement)
    .filter((c) => filterNodesByMode(c, mode))
    .flatMap(flattenNodes)
    .map(mapNodesToHeadings)
    .filter(Boolean) as AsideItem[];
}
