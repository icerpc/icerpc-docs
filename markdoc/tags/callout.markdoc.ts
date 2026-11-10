// Copyright (c) ZeroC, Inc.

import type { Schema } from '@markdoc/markdoc';

/** The kinds of callout, each with its label in a page's Markdown copy. */
export const CALLOUT_LABELS = {
  note: 'Note',
  danger: 'Danger'
} as const;

export type CalloutType = keyof typeof CALLOUT_LABELS;

const callout: Schema = {
  render: 'Callout',
  children: ['paragraph', 'tag', 'list'],
  attributes: {
    type: {
      type: String,
      default: 'note',
      matches: Object.keys(CALLOUT_LABELS)
    }
  }
};

export default callout;
