// Copyright (c) ZeroC, Inc.

import clsx from 'clsx';
import { useEncoding, usePlatform } from 'context/state';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Encoding, Platform } from 'types';

export interface Feedback {
  option: string; // The title of the selected option
  path: string; // The path of the page the feedback was submitted from
  title: string; // The title of the page the feedback was submitted from
  encoding: Encoding; // The user's currently selected encoding
  platform: Platform; // The user's currently selected platform
  additionalFeedback?: string; // Additional feedback from the user
  email?: string; // The user's email address
}

interface FeedbackOption {
  title: string;
  description: string;
  id: number;
}

interface Props {
  title: string;
  options: FeedbackOption[];
}

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
const sendFeedback = async (feedback: Feedback) => {
  const { option, path, additionalFeedback, email, title, encoding, platform } =
    feedback;
  try {
    const response = await fetch('/api/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        additionalFeedback,
        email,
        encoding,
        option,
        path,
        platform,
        title
      })
    });
    if (response.status === 200) return true;
    return false;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export const FeedbackForm = ({ title, options }: Props) => {
  const { pathname } = useRouter();
  const { encoding } = useEncoding();
  const { platform } = usePlatform();
  const pageTitle = window.document.title;

  let [selected, setSelected] = useState<number>();
  let [email, setEmail] = useState<string>();
  let [comment, setComment] = useState<string>();
  let [opacity, setOpacity] = useState('opacity-0');
  let [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setOpacity('opacity-100');
    }, 100);
  }, []);

  return feedbackSubmitted ? (
    <h3 className="mt-5 mb-10">Thanks for the feedback!</h3>
  ) : (
    <div
      className={`mt-4 mb-9 flex flex-col gap-0 ${opacity} transition duration-700 ease-in-out`}
    >
      <h3 className="my-0">{title}</h3>
      <form className="w-full p-3 pl-0 text-sm text-gray-700 dark:text-gray-200">
        <ul>
          {options.map((option) => (
            <li key={option.title}>
              <div className="flex shrink rounded py-1">
                <input
                  id={'helper-radio' + option.title.replace(' ', '')}
                  name="helper-radio"
                  type="radio"
                  value=""
                  className={clsx(
                    'mt-1 h-3 border-gray-300 bg-gray-100 text-primary',
                    'dark:border-gray-500 dark:bg-gray-600 dark:ring-offset-gray-700 dark:focus:ring-primary dark:focus:ring-offset-gray-700',
                    'focus:ring-2 focus:ring-primary'
                  )}
                  onClick={() => {
                    setSelected(option.id);
                  }}
                />
                <div className="flex w-full shrink flex-col">
                  <div className="ml-2 text-sm">
                    <label className="font-medium text-gray-900 dark:text-gray-300">
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
                      <label className="mt-2 ml-2 text-xs">
                        <div className="font-medium text-gray-900 dark:text-gray-300">
                          Feedback
                        </div>
                        <textarea
                          placeholder="Your feedback address ..."
                          className={clsx(
                            'mx-2 mt-2 h-14 w-full resize-none rounded-md border border-gray-300 p-3 text-xs shadow-sm',
                            'dark:border-gray-500 dark:focus:border-primary dark:focus:ring-primary',
                            'focus:border-primary focus:ring-primary'
                          )}
                          onChange={(e) => {
                            setComment(e.currentTarget.value);
                          }}
                        />
                      </label>
                      <label className="mt-1 ml-2 text-xs">
                        <div className="font-medium text-gray-900 dark:text-gray-300">
                          Email
                        </div>
                        <input
                          type="email"
                          placeholder="Your email address ... "
                          className={clsx(
                            'm-2 h-[40px] w-full resize-none rounded-md border border-gray-300 p-3 text-xs shadow-sm',
                            'dark:border-gray-500 dark:focus:border-primary dark:focus:ring-primary',
                            'focus:border-primary focus:ring-primary'
                          )}
                          onChange={(e) => {
                            setEmail(e.currentTarget.value);
                          }}
                        />
                      </label>
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
            const selectedOption = options.find(
              (option) => option.id == selected
            )!;

            // Send the feedback to the server
            sendFeedback({
              additionalFeedback: comment,
              email,
              encoding,
              option: selectedOption.title,
              path: pathname,
              platform,
              title: pageTitle
            });
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};
