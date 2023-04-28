// Copyright (c) ZeroC, Inc.

import { Callout } from 'components/Callout';

export default {
  render: Callout,
  children: ['paragraph', 'tag', 'list'],
  attributes: {
    type: String,
    default: 'note',
    matches: ['critical', 'info']
  }
};
