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
      className="flex h-[100px] flex-col justify-center gap-2 rounded-md border-[1.5px] p-4 transition-shadow  duration-300 ease-in-out hover:scale-[1.01] hover:shadow-lg"
      target="_blank"
      rel="noreferrer"
    >
      <h4 className="m-0 pt-[0.5rem] font-semibold text-[var(--primary-color)]">
        {title}
      </h4>
      <IconContext.Provider value={{ size: '1em' }}>
        <div className="flex flex-row items-center gap-2">
          <BsGithub />
          <span style={{ fontSize: '25px' }}>&middot;</span>
          <SiDotnet size={30} />
        </div>
      </IconContext.Provider>
    </a>
  );
}

export function Card({ title, description, icon, link }) {
  return (
    <Link key={title} href={link} style={{ textDecoration: 'None' }}>
      <div className="flex h-[15rem] flex-col rounded-md border-[1.5px] p-4 transition-shadow  duration-300 ease-in-out hover:scale-[1.01] hover:shadow-lg">
        <IconContext.Provider
          value={{ color: 'var(--primary-color)', size: '1.5em' }}
        >
          <div style={{ padding: '1rem 0' }}>{Icon(icon)}</div>
        </IconContext.Provider>
        <h3 className="my-2">{title}</h3>
        <p>{description}</p>
      </div>
    </Link>
  );
}
