// Copyright (c) ZeroC, Inc. All rights reserved.

import React, { Fragment, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import useCollapse from 'react-collapsed';
import { motion, useCycle, AnimatePresence, LayoutGroup } from 'framer-motion';
import css from 'styled-jsx/css';

import { sideBarData } from '../../data/sideBarData';

import {
  BsFillCaretRightFill,
  BsFillCaretDownFill,
  BsArrowBarLeft,
  BsArrowBarRight
} from 'react-icons/bs';

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
    <BsFillCaretDownFill size={8} />
  ) : (
    <BsFillCaretRightFill size={8} />
  );
  const header = (
    <Fragment>
      {caret} {title}{' '}
    </Fragment>
  );

  if (children.length > 0) {
    return (
      <div className="collapsible" style={{ paddingBottom: '1rem' }}>
        <div
          className="header"
          {...getToggleProps({ onClick: () => setExpanded(!isExpanded) })}
        >
          {children.some(function (link) {
            return link.href === router.pathname;
          }) ? (
            <b style={{ color: 'var(--primary-color)' }}>{header}</b>
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
            }

            h3 {
              font-weight: 500;
              margin: 0.5rem 0 0;
              padding-bottom: 0.5rem;
            }

            ul {
              margin: 0;
              padding: 0;
              padding-top: 1rem;
              flex: none;
            }

            li {
              list-style-type: none;
              margin: 0 0 1rem 1.5rem;
              font-size: 14px;
              font-weight: 400;
            }

            li a {
              text-decoration: none;
            }

            li a:hover,
            li.active > a {
              text-decoration: underline;
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
      gap: 3rem;
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
      margin-left: 1rem;
      margin-right: 2rem;
      color: gray;
    }

    .content {
      display: flex;
      flex-direction: row;
      gap: 1rem;
      justify-content: space-between;
      justify-items: center;
      height: 100%;
      width: 100%;
      text-wrap: none;
    }

    .overview {
      font-size: 14px;
      padding-bottom: 1rem;
      padding-left: 0.8rem;
      flex: 0 0 auto;
      justify-content: space-between;
    }
  `;
}

export function SideNav({ path }) {
  const [open, cycleOpen] = useCycle(true, false);
  const data = sideBarData.find((item) => path.startsWith(item.base));
  const { className, styles } = getStyles();
  const router = useRouter();

  const categories = {
    close: { opacity: 0 },
    open: { opacity: 1 }
  };

  if (data) {
    return (
      <motion.nav
        className={className}
        initial="open"
        animate={{
          width: open ? 260 : 80,
          transition: {
            duration: 0.1,
            when: open ? 'afterChildren' : 'beforeChildren',
            type: 'spring',
            stiffness: 700,
            damping: 100
          }
        }}
      >
        <LayoutGroup>
          <AnimatePresence>
            <motion.div className={`${className} content`} initial="open">
              {open && (
                <motion.div
                  initial={{ opacity: 0 }}
                  variants={categories}
                  animate={{
                    opacity: 1
                  }}
                  exit={{
                    opacity: 0
                  }}
                  style={{ flex: 'none' }}
                >
                  <motion.div className={`${className} overview`}>
                    <Link href={data.base}>
                      {router.pathname === data.base ? (
                        <b style={{ color: 'var(--primary-color)' }}>
                          Overview
                        </b>
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
              )}

              <motion.button
                className={className}
                onClick={() => cycleOpen()}
                layout
              >
                {open ? (
                  <BsArrowBarLeft strokeWidth={1} />
                ) : (
                  <BsArrowBarRight strokeWidth={1} style={{ margin: 0 }} />
                )}
              </motion.button>
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
