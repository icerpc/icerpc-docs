// Copyright (c) ZeroC, Inc. All rights reserved.

import Link from 'next/link';
import React from 'react';
import { MdHelpCenter, MdVideocam } from 'react-icons/md';

// eslint-disable-next-line no-unused-vars
export function Footer({ children }) {
  return (
    <footer>
      <ul>
        <li>
          <MdHelpCenter size={20} />
          <span>
            Need help? <a>Contact us</a>
          </span>
        </li>
        <li>
          <MdVideocam size={20} />
          <span>
            Watch our <a>Developer tutorials</a>
          </span>
        </li>
      </ul>
      <form action="/send-data-here" method="post">
        <label htmlFor="email">Sign up for developer updates:</label>
        <div className="email">
          <input type="email" id="email" name="first" required />
          <button type="submit">Subscribe</button>
        </div>
        <span>
          You can unsubscribe at any time. Read our{' '}
          <Link href="foo">
            <a>privacy policy.</a>
          </Link>
        </span>
      </form>
      <style jsx>{`
        a {
          color: var(--primary-color);
          text-decoration: none;
        }

        a:hover {
          color: black;
        }

        footer {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          padding-bottom: 4rem;
        }

        form {
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
          margin-left: 2rem;
          padding-top: 1rem;
          color: var(--text-color);
        }

        form button {
          padding: 0.5rem;
          border: 1px solid var(--border-color);
          border-radius: 0.25rem;
          background: var(--primary-color);
          color: var(--background);
          font-weight: bold;
        }

        form input {
          width: 20rem;
          padding: 0.5rem;
          border: 1px solid var(--border-color);
          border-radius: 0.25rem;
        }

        form span {
          font-size: 8pt;
        }

        li {
          display: flex;
          flex-direction: row;
          gap: 0.5rem;
          align-items: center;
          color: var(--text-color);
        }

        ul {
          list-style: none;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          padding-top: 0;
        }

        .email {
          display: flex;
          flex-direction: row;
        }
      `}</style>
    </footer>
  );
}
