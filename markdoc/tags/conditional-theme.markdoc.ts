// Copyright (c) ZeroC, Inc.

import { Node, Config, Tag } from '@markdoc/markdoc';
import { Theme } from 'types';

export const lightMode = {
  render: 'ConditionalTheme',
  transform(node: Node, config: Config) {
    const children = node.transformChildren(config);
    const theme = Theme.Light;

    return new Tag(`${this.render}`, { theme }, children);
  }
};

export const darkMode = {
  render: 'ConditionalTheme',
  transform(node: Node, config: Config) {
    const children = node.transformChildren(config);
    const theme = Theme.Dark;

    return new Tag(`${this.render}`, { theme }, children);
  }
};
