// Copyright (c) ZeroC, Inc. All rights reserved.

import * as React from 'react';

export function SideBySide({ children }) {
  const [first, ...rest] = React.Children.toArray(children);
  return (
    <div className="side-by-side">
      <div className="left">{first}</div>
      <div className="right">{rest}</div>
      <style jsx>
        {`
          .side-by-side {
            width: 100%;
            padding: 0;
            margin-top: 1rem;
            border-radius: 4px;
            display: flex;
            flex-direction: row;
          }
          .column {
            overflow: auto;
            padding-top: var(--default-vertical-spacing);
          }
          .left {
            padding-right: 3rem;
            border-right: 1px solid var(--toc-border);
            display: flex;
            flex-direction: column;
            width: 50%;
          }
          .right {
            padding-left: 3rem;
            display: flex;
            flex-direction: column;
            width: 50%;
          }
          .side-by-side :global(.heading) {
            margin: 0;
          }
          @media screen and (max-width: 1000px) {
            .side-by-side {
              flex-direction: column;
            }
            .column {
              overflow: initial;
            }
            .left {
              padding: 0;
              border: none;
            }
            .right {
              padding-top: 1rem;
              padding-left: 0rem;
            }
          }
        `}
      </style>
    </div>
  );
}
