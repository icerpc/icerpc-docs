// Copyright (c) ZeroC, Inc.

const callout = {
  render: 'Callout',
  children: ['paragraph', 'tag', 'list'],
  attributes: {
    type: {
      type: String,
      default: 'info',
      matches: ['critical', 'info']
    }
  }
};

export default callout;
