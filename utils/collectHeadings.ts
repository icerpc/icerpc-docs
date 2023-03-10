// Copyright (c) ZeroC, Inc.

import React, { ReactElement } from 'react';

import { Encoding } from 'types';
import { TOCItem, EncodingSection } from 'components';

type Heading = {
  level: number;
  id: string;
  children: string;
};

export function collectHeadings(
  children: ReactElement[],
  encoding: Encoding
): TOCItem[] {
  // Check if a given node is a heading
  const isHeading = (x: any): x is Heading => {
    return (
      (x as Heading).level !== undefined &&
      (x as Heading).id !== undefined &&
      (x as Heading).children !== undefined
    );
  };

  // Filter out any nodes that don't match the encoding, flatten the nodes and then map them to an array of TOCItem
  // objects
  const filterNodesByEncoding = (node: ReactElement, encoding: Encoding) => {
    if (node.type == EncodingSection)
      if (node.props.encoding === encoding) return true;
      else return false;
    return true;
  };

  // Flattens a node if it has an encoding prop, otherwise returns the node as an array with a single element
  const flattenNodes = (node: ReactElement) => {
    if (node.props?.encoding) return node.props.children;
    else return node;
  };

  const mapNodesToHeadings = (node: ReactElement): TOCItem | null => {
    if (isHeading(node.props)) {
      const { id, children, level } = node.props;
      return { id, title: children, level };
    }
    return null;
  };

  return React.Children.toArray(children)
    .map((c) => c as ReactElement)
    .filter((c) => filterNodesByEncoding(c, encoding))
    .flatMap(flattenNodes)
    .map(mapNodesToHeadings)
    .filter(Boolean) as TOCItem[];
}
