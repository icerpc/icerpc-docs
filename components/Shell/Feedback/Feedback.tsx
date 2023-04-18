// Copyright (c) ZeroC, Inc.

import { useState } from 'react';
import { MdThumbDownOffAlt, MdThumbUpOffAlt } from 'react-icons/md';
import clsx from 'clsx';
import {
  negativeFeedbackOptions,
  positiveFeedbackOptions,
  FeedbackForm
} from './FeedbackForm';

enum FeedbackType {
  Negative,
  Positive
}

export const Feedback = () => {
  // Undefined means the user has not yet clicked a feedback button
  const [feedbackType, setFeedbackType] = useState<FeedbackType>();

  switch (feedbackType) {
    case FeedbackType.Negative:
      return (
        <FeedbackForm
          title="What went wrong?"
          options={negativeFeedbackOptions}
        />
      );
    case FeedbackType.Positive:
      return (
        <FeedbackForm
          title="What did you like?"
          options={positiveFeedbackOptions}
        />
      );
    default:
      return (
        <div className={clsx('mb-16 flex flex-col items-center')}>
          <h3 className="text-base text-[var(--text-color)]">
            Was this page helpful?
          </h3>
          <div className="flex gap-8 text-4xl">
            <button
              aria-label="Thumbs up"
              className="hover:text-primary dark:text-slate-200 hover:dark:text-primary"
              onClick={() => setFeedbackType(FeedbackType.Positive)}
            >
              <MdThumbUpOffAlt />
            </button>
            <button
              aria-label="Thumbs down"
              className="hover:text-primary dark:text-slate-200 hover:dark:text-primary"
              onClick={() => setFeedbackType(FeedbackType.Negative)}
            >
              <MdThumbDownOffAlt />
            </button>
          </div>
        </div>
      );
  }
};
