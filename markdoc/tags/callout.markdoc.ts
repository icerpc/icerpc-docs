// Copyright (c) ZeroC, Inc.

import { Callout } from 'components/Callout';

export const callout = {
  render: Callout,
  children: ['paragraph', 'tag', 'list'],
  attributes: {
    type: String,
    default: 'note',
    matches: ['caution', 'check', 'note', 'warning'],
    errorLevel: 'critical'
  }
};
