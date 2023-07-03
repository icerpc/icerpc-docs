// Copyright (c) ZeroC, Inc.

import React, { ReactNode } from 'react';
import { BsBoxArrowUpRight, BsArrowRight } from 'react-icons/bs';
import { IconContext } from 'react-icons';

type Props = {
  children: ReactNode;
  columns?: number;
  trailinglink?: { label: string; link: string };
};

export const Grid = ({ children, trailinglink, columns = 3 }: Props) => {
  const bottomStyle = {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    fontSize: '16px',
    color: 'var(--primary-color)',
    gap: '0.5em',
    padding: '1.5em',
    paddingRight: '0'
  };
  const isExternalURL = (url: string) => {
    return url.startsWith('http');
  };

  return (
    <>
      <div
        key={children?.toString() ?? 'grid'}
        // eslint-disable-next-line tailwindcss/no-custom-classname
        className="dynamic-grid-columns my-8 grid gap-4"
      >
        {React.Children.toArray(children).map((child, index) => {
          return <React.Fragment key={index}>{child}</React.Fragment>;
        })}
      </div>
      {trailinglink && (
        <a
          style={{
            color: 'var(--primary-color)',
            textAlign: 'center',
            textDecoration: 'none'
          }}
          href={trailinglink.link}
          target="_blank"
          rel="noreferrer"
        >
          <div style={bottomStyle}>
            {trailinglink.label}
            <IconContext.Provider value={{ size: '1em' }}>
              {isExternalURL(trailinglink.link) ? (
                <BsBoxArrowUpRight />
              ) : (
                <BsArrowRight />
              )}
            </IconContext.Provider>
          </div>
        </a>
      )}
      <style jsx>
        {`
          .dynamic-grid-columns {
            grid-template-columns: repeat(1, minmax(0, 1fr));
          }

          @media (min-width: 768px) {
            .dynamic-grid-columns {
              grid-template-columns: repeat(${columns}, minmax(0, 1fr));
            }
          }
        `}
      </style>
    </>
  );
};
