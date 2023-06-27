// Copyright (c) ZeroC, Inc.

import { Callout } from 'components/Tags/Callout';

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
