// Copyright (c) ZeroC, Inc.

import { IconContext } from 'react-icons';
import { BsBox, BsQuestionSquare, BsTerminal, BsGithub } from 'react-icons/bs';
import { SiDotnet } from 'react-icons/si';
import Link from 'next/link';

function Icon(icon: string) {
  switch (icon) {
    case 'box':
      return <BsBox className="text-primary dark:text-white" />;
    case 'question':
      return <BsQuestionSquare className="text-primary dark:text-white" />;
    case 'terminal':
      return <BsTerminal className="text-primary dark:text-white" />;
    default:
      return null;
  }
}

interface MiniCardProps {
  title: string;
  description: string;
  href: string;
}

export const MiniCard = ({ title, description, href }: MiniCardProps) => {
  return (
    <Link
      href={href}
      className="h-fit min-h-[100px] gap-2 rounded-md border-[1px] bg-white p-4 transition-shadow duration-300 ease-in-out  hover:scale-[1.01] hover:shadow-lg dark:border-darkBorder dark:bg-black md:min-h-[150px]"
    >
      <h4 className="m-0 pt-[0.5rem] font-semibold text-primary dark:text-white">
        {title}
      </h4>
      <div className="mt-2 dark:text-white/80">{description}</div>
    </Link>
  );
};

interface MiniLinkProps {
  title: string;
  link: string;
}

export const MiniLink = ({ title, link }: MiniLinkProps) => {
  return (
    <a
      href={link ? link : '#'}
      key={title}
      className="flex h-[100px] flex-col justify-center gap-2 rounded-md border-[1px] bg-white p-4 transition-shadow duration-300  ease-in-out hover:scale-[1.01] hover:shadow-lg dark:border-darkBorder dark:bg-black"
      target="_blank"
      rel="noreferrer"
    >
      <h4 className="m-0 pt-[0.5rem] font-semibold text-primary dark:text-white">
        {title}
      </h4>
      <IconContext.Provider value={{ size: '1em' }}>
        <div className="flex flex-row items-center gap-2">
          <BsGithub className="dark:text-white/80" />
          <span style={{ fontSize: '25px' }}>&middot;</span>
          <SiDotnet className="dark:text-white/80" size={30} />
        </div>
      </IconContext.Provider>
    </a>
  );
};

interface CardProps {
  title: string;
  description: string;
  icon: string;
  link: string;
}

export const Card = ({ title, description, icon, link }: CardProps) => {
  return (
    <Link key={title} href={link} style={{ textDecoration: 'None' }}>
      <div className="flex h-fit flex-col rounded-md border-[1px] bg-white p-4 transition-shadow duration-300 ease-in-out  hover:scale-[1.01] hover:shadow-lg dark:border-darkBorder dark:bg-black md:h-[15rem]">
        <IconContext.Provider value={{ size: '1.5em' }}>
          <div style={{ padding: '1rem 0' }}>{Icon(icon)}</div>
        </IconContext.Provider>
        <h3 className="my-2 text-base">{title}</h3>
        <p>{description}</p>
      </div>
    </Link>
  );
};
