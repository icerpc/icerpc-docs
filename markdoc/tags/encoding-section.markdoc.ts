// Copyright (c) ZeroC, Inc.

import { Node, Config, Tag } from '@markdoc/markdoc';
import { EncodingSection } from 'components/Tags/EncodingSection';
import { Encoding } from 'types';

export const slice1 = {
  render: EncodingSection,
  transform(node: Node, config: Config) {
    const children = node.transformChildren(config);
    const encoding = Encoding.Slice1;
    return new Tag(`${this.render}`, { encoding }, children);
  }
};

export const slice2 = {
  render: EncodingSection,
  transform(node: Node, config: Config) {
    const children = node.transformChildren(config);
    const encoding = Encoding.Slice2;

    return new Tag(`${this.render}`, { encoding }, children);
  }
};
