// Copyright (c) ZeroC, Inc. All rights reserved.

import React from 'react';
import { BsBoxArrowUpRight, BsArrowRight } from 'react-icons/bs';
import { IconContext } from 'react-icons';

export default function Grid({ children, columns, rows, trailingLink }) {
  // TODO: Add support for detecting external links.
  // eslint-disable-next-line no-unused-vars
  const isExternalURL = (url) => {
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
      <div key={children} style={gridStyle}>
        {children.map((child, index) => {
          return <React.Fragment key={index}>{child}</React.Fragment>;
        })}
      </div>
      {trailingLink && (
        <a
          style={{
            color: 'var(--primary-color)',
            textAlign: 'center',
            textDecoration: 'none'
          }}
          href={trailingLink.link}
          target="_blank"
          rel="noreferrer"
        >
          <div className="bottom-link" style={bottomStyle}>
            {trailingLink.label}
            <IconContext.Provider value={{ size: '1em' }}>
              {isExternalURL(trailingLink.link) ? <BsBoxArrowUpRight /> : <BsArrowRight />}
            </IconContext.Provider>
          </div>
        </a>
      )}
    </>
  );
}
