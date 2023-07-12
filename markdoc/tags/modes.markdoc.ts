// Copyright (c) ZeroC, Inc.

import { Tag, Config, Node } from '@markdoc/markdoc';
import { Mode } from 'types';

const modes = {
  render: 'SupportedModes',
  transform(node: Node, config: Config) {
    const attributes = node.transformAttributes(config);
    const frontmatter = config.variables?.markdoc.frontmatter;
    const supported = frontmatter.mode
      ? [frontmatter.mode]
      : [Mode.Slice1, Mode.Slice2];
    return new Tag(`${this.render}`, {
      ...attributes,
      supported
    });
  }
};

export default modes;
