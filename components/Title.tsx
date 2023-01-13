// Copyright (c) ZeroC, Inc. All rights reserved.

import * as React from 'react';
import { Breadcrumbs } from './Breadcrumbs';

export function Title({ title, description, breadcrumbs }) {
  return (
    <div className="m-0 p-0">
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <h1 className="m-0 font-bold">{title}</h1>
      <h2 className="mt-2.5 text-2xl text-[var(--text-color-secondary)]">{description}</h2>
    </div>
  );
}
