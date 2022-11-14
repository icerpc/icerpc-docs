// Copyright (c) ZeroC, Inc. All rights reserved.

import React, { Fragment, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import useCollapse from 'react-collapsed';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import css from 'styled-jsx/css';

import { sideBarData } from '../../data/sideBarData';
import { FaChevronRight, FaChevronDown } from 'react-icons/fa';

function Collapsible({
  title,
  children
}: {
  title: string;
  children: any;
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

  if (children.length > 0) {
    return (
      <div className="collapsible">
        <div
          className="header"
          {...getToggleProps({ onClick: () => setExpanded(!isExpanded) })}
        >
          {children.some(function (link) {
            return link.href === router.pathname;
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
              const active = router.pathname === link.href;
              return (
                <li key={link.href} className={active ? 'active' : ''}>
                  <Link {...link}>
                    <a href={link.href}>{link.name}</a>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <style jsx>
          {`
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
          `}
        </style>
      </div>
    );
  } else {
    //
    return null;
  }
}

function getStyles() {
  return css.resolve`
    nav {
      /* https://stackoverflow.com/questions/66898327/how-to-keep-footer-from-pushing-up-sticky-sidebar */
      position: sticky;
      top: var(--nav-height);
      height: calc(100vh - var(--nav-height));
      width: 260px;
      padding: 2rem 0 2rem 1rem;
      border-right: 1px solid var(--border-color);
      flex-shrink: 0;
    }

    @media screen and (max-width: 1000px) {
      nav {
        display: none;
      }
    }

    button {
      border: none;
      background: none;
      align-self: flex-start;
      font-size: 14px;
      padding: 0;
      margin: 0;
      color: gray;
    }

    .content {
      height: 100%;
      width: 100%;
      text-wrap: none;
    }

    .overview {
      font-size: 14px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 0;
      padding: 0.5rem;
    }
  `;
}

export function SideNav({ path }) {
  const data = sideBarData.find((item) => path.startsWith(item.base));
  const { className, styles } = getStyles();
  const router = useRouter();

  if (data) {
    return (
      <motion.nav className={className}>
        <LayoutGroup>
          <AnimatePresence>
            <motion.div className={`${className} content`}>
              <motion.div initial={{ opacity: 1 }} style={{ flex: 'none' }}>
                <motion.div className={`${className} overview`}>
                  <Link href={data.base}>
                    {router.pathname === data.base ? (
                      <b style={{ color: 'var(--primary-color)' }}>Overview</b>
                    ) : (
                      <a>Overview</a>
                    )}
                  </Link>
                </motion.div>
                {data.categories.map((category) => (
                  <Collapsible key={category.title} title={category.title}>
                    {category.links}
                  </Collapsible>
                ))}
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </LayoutGroup>
        {styles}
        <style jsx>
          {`
            a {
              text-decoration: none;
            }
          `}
        </style>
      </motion.nav>
    );
  }
}
