// Copyright (c) ZeroC, Inc.

import React, { ReactNode } from 'react';
import { BsBoxArrowUpRight, BsArrowRight } from 'react-icons/bs';
import { IconContext } from 'react-icons';
import clsx from 'clsx';

type Props = {
  children: ReactNode;
  columns: number;
  rows: number;
  trailinglink?: { label: string; link: string };
};

export const Grid = ({ children, trailinglink }: Props) => {
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
        className={clsx('grid gap-4', `grid-cols-1 md:grid-cols-3`)}
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
    </>
  );
};
