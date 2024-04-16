// Copyright (c) ZeroC, Inc.

import { AppLink } from '@/components/nodes/app-link';

type CardProps = {
  title: string;
  description: string;
  href: string;
  level?: 1 | 2 | 3 | 4 | 5;
};

export const Card = ({ title, description, href, level = 3 }: CardProps) => {
  return (
    <AppLink
      href={href}
      className="col-span-1 h-full flex-col justify-between rounded-xl border bg-white p-4 shadow-sm dark:border-darkBorder dark:bg-darkAccent"
      showArrow={false}
    >
      <div
        className="m-0 font-semibold text-primary dark:text-white"
        role="heading"
        aria-level={level}
      >
        {title}
      </div>
      <div className="my-0 mt-1 text-[13px] text-[var(--text-color-secondary)] dark:text-white/80">
        {description}
      </div>
    </AppLink>
  );
};
