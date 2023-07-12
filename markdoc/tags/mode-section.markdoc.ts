// Copyright (c) ZeroC, Inc.

import { Node, Config, Tag } from '@markdoc/markdoc';
import { Mode } from 'types';

export const slice1 = {
  render: 'ModeSection',
  transform(node: Node, config: Config) {
    const children = node.transformChildren(config);
    const mode = Mode.Slice1;
    return new Tag(`${this.render}`, { mode }, children);
  }
};

export const slice2 = {
  render: 'ModeSection',
  transform(node: Node, config: Config) {
    const children = node.transformChildren(config);
    const mode = Mode.Slice2;

    return new Tag(`${this.render}`, { mode }, children);
  }
};
