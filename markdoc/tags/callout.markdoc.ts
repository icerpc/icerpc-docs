// Copyright (c) ZeroC, Inc.

import { Callout } from 'components/Callout';

const callout = {
  render: Callout,
  children: ['paragraph', 'tag', 'list'],
  attributes: {
    type: String,
    default: 'note',
    matches: ['critical', 'info']
  }
};

export default callout;
