// Copyright (c) ZeroC, Inc. All rights reserved.

import { SideBySide } from 'components/SideBySide';

export default {
  render: SideBySide,
  attributes: {
    weighted: {
      type: 'string',
      default: 'left'
    }
  }
};
