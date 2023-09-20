// Copyright (c) ZeroC, Inc.

import { useEffect, useState } from 'react';
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

export const Feedback = ({ path }: { path: string }) => {
  // Undefined means the user has not yet clicked a feedback button
  const [feedbackType, setFeedbackType] = useState<FeedbackType>();

  // Reset feedback type when the route changes
  useEffect(() => setFeedbackType(undefined), [path]);

  switch (feedbackType) {
    case FeedbackType.Negative:
      return (
        <FeedbackForm
          title="What went wrong?"
          options={negativeFeedbackOptions}
          path={path}
        />
      );
    case FeedbackType.Positive:
      return (
        <FeedbackForm
          title="What did you like?"
          options={positiveFeedbackOptions}
          path={path}
        />
      );
    default:
      return (
        <div id="Feedback" className={clsx('my-12 flex flex-col items-center')}>
          <h3 className="my-0 text-base text-[var(--text-color)]">
            Was this page helpful?
          </h3>
          <div className="mt-4 flex gap-8 text-4xl">
            <button
              aria-label="Thumbs up"
              className="hover:text-primary dark:text-slate-200 hover:dark:text-primary"
              onClick={() => setFeedbackType(FeedbackType.Positive)}
            >
              <ThumbUp />
            </button>
            <button
              aria-label="Thumbs down"
              className="hover:text-primary dark:text-slate-200 hover:dark:text-primary"
              onClick={() => setFeedbackType(FeedbackType.Negative)}
            >
              <ThumbDown />
            </button>
          </div>
        </div>
      );
  }
};

const ThumbDown = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="100%"
    viewBox="0 0 24 24"
    width="100%"
    fill="currentColor"
    className="h-8 w-8"
  >
    <path d="M0 0h24v24H0V0zm0 0h24v24H0V0z" fill="none" />
    <path d="M15 3H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v2c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 23l6.59-6.59c.36-.36.58-.86.58-1.41V5c0-1.1-.9-2-2-2zm0 12-4.34 4.34L12 14H3v-2l3-7h9v10zm4-12h4v12h-4z" />
  </svg>
);

const ThumbUp = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="100%"
    viewBox="0 0 24 24"
    width="100%"
    fill="currentColor"
    className="h-8 w-8"
  >
    <path d="M0 0h24v24H0V0zm0 0h24v24H0V0z" fill="none" />
    <path d="M9 21h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.58 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2zM9 9l4.34-4.34L12 10h9v2l-3 7H9V9zM1 9h4v12H1z" />
  </svg>
);
