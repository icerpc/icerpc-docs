// Copyright (c) ZeroC, Inc.

const callout = {
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
