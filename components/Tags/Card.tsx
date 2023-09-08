// Copyright (c) ZeroC, Inc.

import { AppLink } from 'components/Nodes/AppLink';

type CardProps = {
  title: string;
  description: string;
  href: string;
};

export const Card = ({ title, description, href }: CardProps) => {
  return (
    <AppLink
      href={href}
      className="h-full rounded-md border-[1px] bg-white p-4 transition-shadow duration-300 ease-in-out hover:scale-[1.01] hover:shadow-lg dark:border-darkBorder dark:bg-black"
      showArrow={false}
    >
      <h4 className="m-0 font-semibold text-primary dark:text-white">
        {title}
      </h4>
      <div className="mt-2 text-sm text-[var(--text-color-secondary)] dark:text-white/80">
        {description}
      </div>
    </AppLink>
  );
};
