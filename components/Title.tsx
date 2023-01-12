// Copyright (c) ZeroC, Inc. All rights reserved.

import * as React from 'react';
import { Breadcrumbs } from './Breadcrumbs';

export function Title({
  title,
  description,
  breadcrumbs
}: {
  title: string;
  description: string;
  breadcrumbs: any;
}) {
  return (
    <div className="p-0 m-0">
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <h1 className="m-0 font-bold">{title}</h1>
      <h2 className="text-2xl mt-2.5 text-[var(--text-color-secondary)]">
        {description}
      </h2>
    </div>
  );
}
