// Copyright (c) ZeroC, Inc.

import { SideBySide } from 'components/SideBySide';

export default {
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
