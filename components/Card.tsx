// Copyright (c) ZeroC, Inc. All rights reserved.

import { IconContext } from 'react-icons';
import { BsBox, BsQuestionSquare, BsTerminal, BsGithub } from 'react-icons/bs';
import { SiDotnet } from 'react-icons/si';

import Link from 'next/link';

function Icon(icon: string) {
  switch (icon) {
    case 'box':
      return <BsBox />;
    case 'question':
      return <BsQuestionSquare />;
    case 'terminal':
      return <BsTerminal />;
    default:
      return null;
  }
}

export function MiniCard({ title, link }) {
  return (
    <a
      href={link ? link : '#'}
      key={title}
      className="card"
      target="_blank"
      rel="noreferrer"
    >
      <h4
        style={{
          padding: '0.5rem 0 0 0',
          margin: 0,
          color: 'var(--primary-color)'
        }}
      >
        {title}
      </h4>
      <div className="bottom-container">
        <IconContext.Provider value={{ size: '1em' }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <BsGithub />
            <span style={{ fontSize: '25px' }}>&middot;</span>
            <SiDotnet size={30} />
          </div>
        </IconContext.Provider>
      </div>
      <style jsx>
        {`
          .card {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            gap: 1rem;
            border: 1px solid var(--border-color);
            border-radius: 4px;
            text-decoration: none;
            color: var(--text-color);
            height: 100px;
            padding-left: 1rem;
            transition: box-shadow 0.2s ease-in-out;
          }

          .card:hover {
            transform: scale(1.01);
            box-shadow: 0 5px 25px rgba(0, 0, 0, 0.1);
          }
        `}
      </style>
    </a>
  );
}

export function Card({ title, description, icon, link }) {
  return (
    <Link key={title} href={link} style={{ textDecoration: 'None' }}>
      <div className="card">
        <IconContext.Provider
          value={{ color: 'var(--primary-color)', size: '1.5em' }}
        >
          <div style={{ padding: '1rem 0' }}>{Icon(icon)}</div>
        </IconContext.Provider>
        <h3>{title}</h3>
        <p>{description}</p>
        <div className="shine"></div>
        <style jsx>
          {`
            h3 {
              margin: 5px 0;
            }

            p {
              margin: 0;
            }

            .card {
              display: flex;
              flex-direction: column;
              padding: 18px;
              border: 1px solid #dce6e9;
              border-radius: 5px;
              transition: box-shadow 0.2s ease-in-out;
              text-decoration: none;
              height: 15rem;
            }

            .card:hover {
              transform: scale(1.01);
              box-shadow: 0 5px 25px rgba(0, 0, 0, 0.1);
            }
          `}
        </style>
      </div>
    </Link>
  );
}
