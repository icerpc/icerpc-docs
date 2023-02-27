// Copyright (c) ZeroC, Inc.

import clsx from 'clsx';
import { useEffect, useState } from 'react';

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

export const FeedbackForm = ({ title, options }: Props) => {
  let [selected, setSelected] = useState(0);
  let [email, setEmail] = useState('');
  let [comment, setComment] = useState('');
  let [opacity, setOpacity] = useState('opacity-0');
  let [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setOpacity('opacity-100');
    }, 100);
  }, []);

  return feedbackSubmitted ? (
    <h3 className="my-8">Thanks for the feedback!</h3>
  ) : (
    <div
      className={`flex flex-col gap-0 ${opacity} transition duration-700 ease-in-out`}
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
                          Feedback *
                        </div>
                      </label>
                      <textarea
                        required
                        placeholder="Your feedback address ..."
                        className={clsx(
                          'mx-2 mt-2 h-16 w-full resize-none rounded-md border border-gray-300 p-3 text-xs shadow-sm',
                          'dark:border-gray-500 dark:focus:border-primary dark:focus:ring-primary',
                          'focus:border-primary focus:ring-primary'
                        )}
                        onChange={(e) => {
                          setComment(e.currentTarget.value);
                        }}
                      />
                      <label className="mt-1 ml-2 text-xs">
                        <div className="font-medium text-gray-900 dark:text-gray-300">
                          Email
                        </div>
                      </label>
                      <input
                        type="email"
                        required={false}
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
            'disabled:cursor-not-allowed disabled:bg-gray-400 disabled:opacity-50'
          )}
          type="submit"
          disabled={comment.length == 0}
          onClick={(e) => {
            e.preventDefault();
            setFeedbackSubmitted(true);
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};
