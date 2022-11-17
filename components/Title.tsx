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
    <div className="header">
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <h1>{title}</h1>
      <h2>{description}</h2>
      <style jsx>
        {`
          .header {
            margin: 0;
            padding: 0;
          }

          .header h1 {
            margin: 0;
            font-weight: bold;
          }

          .header h2 {
            margin-top: 10px;
            font-weight: normal;
            color: var(--text-color-secondary);
          }
        `}
      </style>
    </div>
  );
}
