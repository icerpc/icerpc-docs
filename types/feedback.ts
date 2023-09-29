// Copyright (c) ZeroC, Inc.

import { Mode, Platform } from 'types';
export type FeedbackData = {
  option: string; // The title of the selected option
  path: string; // The path of the page the feedback was submitted from
  title: string; // The title of the page the feedback was submitted from
  mode: Mode; // The user's currently selected mode
  platform: Platform; // The user's currently selected platform
  additionalFeedback?: string; // Additional feedback from the user
  email?: string; // The user's email address
};

export type FeedbackOption = {
  title: string;
  description: string;
  id: number;
};
