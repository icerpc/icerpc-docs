// Copyright (c) ZeroC, Inc.

import { VersionSection } from 'components/SliceVersionSection';
import { SliceVersion } from 'types';

export const sliceVersionSection = {
  render: VersionSection,
  attributes: {
    version: {
      type: SliceVersion,
      required: true
    }
  }
};
