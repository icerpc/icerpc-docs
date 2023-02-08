// Copyright (c) ZeroC, Inc.

import React, { ReactNode } from 'react';
import { BsBoxArrowUpRight, BsArrowRight } from 'react-icons/bs';
import { IconContext } from 'react-icons';

type Props = {
  children: ReactNode;
  columns: number;
  rows: number;
  trailinglink?: { label: string; link: string };
};

export const Grid = ({ children, columns, rows, trailinglink }: Props) => {
  // TODO: Add support for detecting external links.
  // eslint-disable-next-line no-unused-vars
  const isExternalURL = (_url: string) => {
    return true;
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gridTemplateRows: `repeat(${rows}, 1fr)`,
    gridGap: '1em',
    paddingTop: '0.5em',
    paddingBottom: '0.5em'
  };
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

  return (
    <>
      <div key={children!.toString()} style={gridStyle}>
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
