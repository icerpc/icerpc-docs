// Copyright (c) ZeroC, Inc.

import { Node, Config, Tag } from '@markdoc/markdoc';
import { VersionSection } from 'components/SliceVersionSection';
import { SliceVersion } from 'types';

export const slice1 = {
  render: VersionSection,
  transform(node: Node, config: Config) {
    const children = node.transformChildren(config);
    const version = SliceVersion.Slice1;

    return new Tag(`${this.render}`, { version }, children);
  }
};

export const slice2 = {
  render: VersionSection,
  transform(node: Node, config: Config) {
    const children = node.transformChildren(config);
    const version = SliceVersion.Slice2;

    return new Tag(`${this.render}`, { version }, children);
  }
};
