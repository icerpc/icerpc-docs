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
      className="col-span-1 h-full rounded-md border-DEFAULT bg-white p-4 transition-shadow duration-300 ease-in-out hover:scale-[1.01] hover:shadow-lg dark:border-darkBorder dark:bg-darkAccent"
      showArrow={false}
    >
      <div
        className="m-0 font-semibold text-primary dark:text-white"
        role="heading"
        aria-level={level}
      >
        {title}
      </div>
      <div className="mt-2 text-sm text-[var(--text-color-secondary)] dark:text-white/80">
        {description}
      </div>
    </AppLink>
  );
};
