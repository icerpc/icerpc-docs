// Copyright (c) ZeroC, Inc. All rights reserved.

import Link from 'next/link';
import useCollapse from 'react-collapsed';
import React, { Fragment, useState } from 'react';
import { FaChevronRight, FaChevronDown } from 'react-icons/fa';
import { SideBarLink } from '../data/sideBarData';
import { useRouter } from 'next/router';

export function CollapsibleCell({
  title,
  children
}: {
  title: string;
  children: SideBarLink[];
}): React.ReactElement {
  const [isExpanded, setExpanded] = useState(true);
  const { getCollapseProps, getToggleProps } = useCollapse({ isExpanded });
  const router = useRouter();
  const caret = isExpanded ? (
    <FaChevronDown size={12} />
  ) : (
    <FaChevronRight size={12} />
  );
  const header = (
    <Fragment>
      {title}
      {caret}
    </Fragment>
  );

  if (children && children.length > 0) {
    return (
      <div className="collapsible">
        <div
          className="header"
          {...getToggleProps({ onClick: () => setExpanded(!isExpanded) })}
        >
          {children.some(function (link) {
            return link.path.replace(/\/$/, '') === router.pathname;
          }) ? (
            <>
              {title}
              <div className="header-highlighted">{caret}</div>
            </>
          ) : (
            header
          )}
        </div>
        <div {...getCollapseProps()}>
          <ul className="flex column">
            {children.map((link) => {
              const active = link.path.replace(/\/$/, '') === router.pathname;
              return (
                <li key={link.path} className={active ? 'active' : ''}>
                  <Link href={link.path}>
                    <a href={link.path}>{link.title}</a>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <style jsx>
          {`
            h3 {
              font-weight: 500;
              margin: 0.5rem 0 0;
            }

            ul {
              margin: 0;
              padding: 0;
              flex: none;
            }

            li {
              list-style-type: none;
              margin: 0 0 0 0.5rem;
              font-size: 14px;
              font-weight: 400;
              padding: 0.5rem;
            }

            li a {
              text-decoration: none;
              color: var(--link-color);
            }

            li a:hover {
              color: var(--highlighted-link-color);
            }

            li.active > a {
              text-decoration: none;
              color: var(--primary-color);
              font-weight: 400;
            }

            .header {
              font-size: 14px;
              display: flex;
              align-items: center;
              justify-content: space-between;
              width: 12rem;
              padding: 0.5rem;
              margin: 0;
              color: var(--link-color);
            }

            .header-highlighted {
              color: var(--primary-color);
            }
          `}
        </style>
      </div>
    );
  } else {
    //
    return null;
  }
}
