// Copyright (c) ZeroC, Inc.

import { AppLink } from 'components/Nodes/AppLink';

type CardProps = {
  title: string;
  description: string;
  href: string;
};

export const Card = ({ title, description, href }: CardProps) => {
  return (
    <AppLink
      href={href}
      className="h-full rounded-md border-[1px] bg-white p-4 transition-shadow duration-300 ease-in-out hover:scale-[1.01] hover:shadow-lg dark:border-darkBorder dark:bg-black"
    >
      <h4 className="m-0 font-semibold text-primary dark:text-white">
        {title}
      </h4>
      <div className="mt-2 text-sm text-[var(--text-color-secondary)] dark:text-white/80">
        {description}
      </div>
    </AppLink>
  );
};

// type MiniLinkProps = {
//   title: string;
//   link: string;
// };

// export const MiniLink = ({ title, link }: MiniLinkProps) => {
//   return (
//     <a
//       href={link ? link : '#'}
//       key={title}
//       className="flex h-[100px] flex-col justify-center gap-2 rounded-md border-[1px] bg-white p-4 transition-shadow duration-300  ease-in-out hover:scale-[1.01] hover:shadow-lg dark:border-darkBorder dark:bg-black"
//       target="_blank"
//       rel="noreferrer"
//     >
//       <h4 className="m-0 pt-[0.5rem] font-semibold dark:text-white">{title}</h4>
//       <IconContext.Provider value={{ size: '1em' }}>
//         <div className="flex flex-row items-center gap-2">
//           <BsGithub className="dark:text-white/80" />
//           <span style={{ fontSize: '25px' }}>&middot;</span>
//           <SiDotnet className="dark:text-white/80" size={30} />
//         </div>
//       </IconContext.Provider>
//     </a>
//   );
// };
