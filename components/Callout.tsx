// Copyright (c) ZeroC, Inc. All rights reserved.

import * as React from 'react';

export function Callout({
  title,
  children
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col rounded border-2 bg-[#f6f9fc] py-3 px-4">
      <strong>{title}</strong>
      <span>{children}</span>
    </div>
  );
}
