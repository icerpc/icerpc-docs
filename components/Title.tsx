// Copyright (c) ZeroC, Inc.

import { Breadcrumbs, Breadcrumb } from 'components/Breadcrumbs';

type Props = {
  title: string;
  description: string;
  breadcrumbs: Breadcrumb[];
};

export const Title = ({ title, description, breadcrumbs }: Props) => {
  return (
    <div className="m-0 p-0">
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <h1 className="text-4xl font-bold text-[#333333]">{title}</h1>
      <h2 className="mt-2.5 text-2xl text-[var(--text-color-secondary)]">
        {description}
      </h2>
    </div>
  );
};
