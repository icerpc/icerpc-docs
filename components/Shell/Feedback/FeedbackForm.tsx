// Copyright (c) ZeroC, Inc.

'use client';

import clsx from 'clsx';
import { useMode, usePlatform, usePath } from 'context/state';
import { useEffect, useState } from 'react';
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

type FeedbackOption = {
  title: string;
  description: string;
  id: number;
};

type Props = {
  title: string;
  options: FeedbackOption[];
};

export const negativeFeedbackOptions: FeedbackOption[] = [
  {
    title: 'Inaccurate',
    description: 'The information is incorrect or out of date.',
    id: 1
  },
  {
    title: 'Could not find what I was looking for',
    description: 'Missing important information.',
    id: 2
  },
  {
    title: 'Hard to understand',
    description: 'Too complicated or unclear.',
    id: 3
  },
  {
    title: 'Code examples are incorrect',
    description: 'The code examples do not work as expected.',
    id: 4
  },
  {
    title: 'Other',
    description: 'Something else.',
    id: 5
  }
];

export const positiveFeedbackOptions: FeedbackOption[] = [
  {
    title: 'Accurate',
    description: 'The information is correct and up to date.',
    id: 1
  },
  {
    title: 'Easy to understand',
    description: 'The information is easy to understand.',
    id: 2
  },
  {
    title: 'Solves my problem',
    description: 'The information helped me solve my problem.',
    id: 3
  },
  {
    title: 'Helped me decide to use the feature',
    description: 'The information helped me decide to use the feature.',
    id: 4
  },
  {
    title: 'Other',
    description: 'Something else.',
    id: 5
  }
];

// Send feedback to the server
const sendFeedback = async (feedback: FeedbackData) => {
  try {
    const response = await fetch('/api/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(feedback)
    });
    return response.status === 200;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export const FeedbackForm = ({ title, options }: Props) => {
  const { mode } = useMode();
  const { platform } = usePlatform();
  const path = usePath();
  const pageTitle = window.document.title;

  const [selected, setSelected] = useState<number>();
  const [email, setEmail] = useState<string>();
  const [comment, setComment] = useState<string>();
  const [opacity, setOpacity] = useState('opacity-0');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setOpacity('opacity-100');
    }, 100);
  }, []);

  return feedbackSubmitted ? (
    <h3 className="mb-10 mt-5">Thanks for the feedback!</h3>
  ) : (
    <div
      className={`mb-9 mt-4 flex flex-col gap-0 ${opacity} transition duration-700 ease-in-out`}
    >
      <h3 className="my-0">{title}</h3>
      <form className="w-full p-3 pl-0 text-sm text-gray-700 dark:text-gray-200">
        <ul className="list-none pl-0">
          {options.map((option) => (
            <li key={option.title} className="pl-0">
              <div className="flex shrink rounded py-1">
                <input
                  id={'helper-radio' + option.title.replace(' ', '')}
                  name="helper-radio"
                  type="radio"
                  value=""
                  aria-controls={'feedback-fields-' + option.id}
                  tabIndex={0}
                  className={clsx(
                    'mt-1 h-3 w-3 rounded-full border-gray-300 bg-gray-100 text-primary',
                    'dark:border-gray-500 dark:bg-gray-600 dark:ring-offset-gray-700 dark:focus:ring-primary dark:focus:ring-offset-gray-700',
                    'focus:ring-2 focus:ring-primary'
                  )}
                  onClick={() => {
                    setSelected(option.id);
                  }}
                />

                <div
                  id={'feedback-fields-' + option.id}
                  className={clsx(
                    'flex w-full shrink flex-col',
                    option.id == selected && 'visible'
                  )}
                >
                  <div className="ml-2 text-sm">
                    <label
                      htmlFor={'helper-radio' + option.title.replace(' ', '')}
                      className="font-medium text-gray-900 dark:text-gray-300"
                    >
                      <div>{option.title}</div>
                      <p
                        id="helper-radio-text-4"
                        className="mb-0 text-xs font-normal text-gray-500 dark:text-gray-300"
                      >
                        {option.description}
                      </p>
                    </label>
                  </div>
                  {option.id == selected && (
                    <>
                      <div className="ml-2 mt-2 text-xs">
                        <label
                          htmlFor="feedback-comment"
                          className="font-medium text-gray-900 dark:text-gray-300"
                        >
                          Feedback
                        </label>
                        <textarea
                          id="feedback-comment"
                          placeholder="Your feedback ..."
                          className={clsx(
                            'mx-2 mt-2 h-14 w-full resize-none rounded-md border border-gray-300 p-3 text-xs shadow-sm',
                            'dark:border-darkBorder dark:bg-black dark:focus:border-primary dark:focus:ring-primary',
                            'focus:border-primary focus:ring-primary'
                          )}
                          onChange={(e) => {
                            setComment(e.currentTarget.value);
                          }}
                        />
                      </div>
                      <div className="ml-2 mt-1 text-xs">
                        <label
                          htmlFor="feedback-email"
                          className="font-medium text-gray-900 dark:text-gray-300"
                        >
                          Email
                        </label>
                        <input
                          id="feedback-email"
                          type="email"
                          placeholder="Your email address ... "
                          className={clsx(
                            'm-2 h-[40px] w-full resize-none rounded-md border border-gray-300 p-3 text-xs shadow-sm',
                            'dark:border-darkBorder dark:bg-black dark:focus:border-primary dark:focus:ring-primary',
                            'focus:border-primary focus:ring-primary'
                          )}
                          onChange={(e) => {
                            setEmail(e.currentTarget.value);
                          }}
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
        <button
          className={clsx(
            'mt-4 flex h-[28px] w-[60px] items-center justify-center rounded border-lightBorder bg-primary py-2',
            'text-center text-sm font-semibold text-white shadow-sm',
            'disabled:cursor-not-allowed disabled:bg-gray-400/80 disabled:opacity-50'
          )}
          type="submit"
          disabled={selected === undefined}
          onClick={(e) => {
            e.preventDefault();
            setFeedbackSubmitted(true);

            // Get the option that was selected
            const selectedOption =
              options.find((option) => option.id == selected) ?? options[0];

            // Send the feedback to the server
            sendFeedback({
              additionalFeedback: comment,
              email,
              mode,
              option: selectedOption.title,
              path,
              platform,
              title: removeTrailingDocs(pageTitle)
            });
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

function removeTrailingDocs(text: string) {
  return text.replace(/\s*\|\s*IceRPC Docs$/, '');
}
