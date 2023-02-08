// Copyright (c) ZeroC, Inc.

import { ReactNode } from 'react';

type Props = { children: ReactNode; className?: string };

export const Section = ({ children, className }: Props) => {
  return (
    <div className={['section', className].filter(Boolean).join(' ')}>
      <section>{children}</section>
      <style jsx>
        {`
          div {
            width: 100%;
            padding: 130px 0 150px;
          }
          section {
            margin: 0 auto;
            max-width: 100%;
          }
          @media screen and (max-width: 1000px) {
            div {
              padding: 4rem 0 5.3125rem;
            }
          }
          @media screen and (max-width: 600px) {
            div {
              padding: 3.75rem 0 3.75rem;
            }
          }
        `}
      </style>
    </div>
  );
};
