// Copyright (c) ZeroC, Inc.

import { ReactNode } from 'react';
import { clsx } from 'clsx';

type Props = {
  children: ReactNode;
  type: 'danger' | 'note';
};

export const Callout = ({ children, type }: Props) => {
  return (
    <div
      // eslint-disable-next-line tailwindcss/no-custom-classname
      className={clsx(
        'callout',
        'my-6 flex items-start justify-start gap-2.5 rounded-xl border p-3 py-2 text-sm leading-6 ',
        type === 'danger'
          ? 'border-red-600/20 bg-red-600/20  text-red-600/90 dark:*:text-red-500/80'
          : 'border-primary/20 bg-primary/10 text-primary/90 dark:*:text-primary'
      )}
    >
      <div className="mx-0 mt-[8px] flex items-center justify-center">
        <svg
          width="16"
          height="16"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_254_53)">
            <path
              d="M9.96094 19.9219C15.4102 19.9219 19.9219 15.4004 19.9219 9.96094C19.9219 4.51172 15.4004 0 9.95117 0C4.51172 0 0 4.51172 0 9.96094C0 15.4004 4.52148 19.9219 9.96094 19.9219ZM9.96094 18.2617C5.35156 18.2617 1.66992 14.5703 1.66992 9.96094C1.66992 5.35156 5.3418 1.66016 9.95117 1.66016C14.5605 1.66016 18.2617 5.35156 18.2617 9.96094C18.2617 14.5703 14.5703 18.2617 9.96094 18.2617ZM8.25195 15.4297H12.2266C12.627 15.4297 12.9395 15.1367 12.9395 14.7363C12.9395 14.3555 12.627 14.0527 12.2266 14.0527H11.0156V9.08203C11.0156 8.55469 10.752 8.20312 10.2539 8.20312H8.41797C8.01758 8.20312 7.70508 8.50586 7.70508 8.88672C7.70508 9.28711 8.01758 9.58008 8.41797 9.58008H9.46289V14.0527H8.25195C7.85156 14.0527 7.53906 14.3555 7.53906 14.7363C7.53906 15.1367 7.85156 15.4297 8.25195 15.4297ZM9.87305 6.58203C10.5859 6.58203 11.1426 6.01562 11.1426 5.30273C11.1426 4.58984 10.5859 4.02344 9.87305 4.02344C9.16992 4.02344 8.60352 4.58984 8.60352 5.30273C8.60352 6.01562 9.16992 6.58203 9.87305 6.58203Z"
              fill={type === 'danger' ? '#e02424' : '#43a0f7'}
            />
          </g>
          <defs>
            <clipPath id="clip0_254_53">
              <rect width="19.9219" height="19.9316" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>
      <div className="mx-0 flex flex-col *:my-1 *:text-sm *:leading-6">
        {children}
      </div>
    </div>
  );
};
