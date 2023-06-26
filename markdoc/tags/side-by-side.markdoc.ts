// Copyright (c) ZeroC, Inc.

import { SideBySide } from 'components/SideBySide';

const sideBySide = {
  render: SideBySide,
  attributes: {
    weighted: {
      type: 'string',
      default: 'left'
    },
    alignment: {
      type: 'string',
      default: 'center'
    }
  }
};

export default sideBySide;
