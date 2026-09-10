// Copyright (c) ZeroC, Inc.

import { Schema } from '@markdoc/markdoc';

const callout: Schema = {
  render: 'Callout',
  children: ['paragraph', 'tag', 'list'],
  attributes: {
    type: {
      type: String,
      default: 'note',
      matches: ['danger', 'note']
    }
  }
};

export default callout;
