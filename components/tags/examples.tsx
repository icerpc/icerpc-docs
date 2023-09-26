// Copyright (c) ZeroC, Inc.

import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

export const Examples = () => {
  return (
    <div className="mb-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      <ExampleCard
        title="GreeterLog"
        description="A typical IceRPC application."
        href="https://github.com/icerpc/icerpc-csharp/tree/main/examples/GreeterLog"
      />
      <ExampleCard
        title="GenericHost"
        description="IceRPC with the Microsoft DI container."
        href="https://github.com/icerpc/icerpc-csharp/tree/main/examples/GenericHost"
      />
      <ExampleCard
        title="Stream"
        description="Stream your data with IceRPC and Slice."
        href="https://github.com/icerpc/icerpc-csharp/tree/main/examples/Stream"
      />
    </div>
  );
};

type ExampleCardProps = {
  title: string;
  description: string;
  href: string;
};

const ExampleCard = ({ title, description, href }: ExampleCardProps) => (
  <Link
    href={href}
    className="flex flex-col justify-start rounded-xl border bg-white p-6 shadow-sm dark:border-darkBorder dark:bg-darkAccent"
  >
    <div className="relative flex h-6 w-6 items-center justify-center rounded-full ">
      <FontAwesomeIcon icon={faGithub} className="h-6 w-6" />
    </div>
    <div className="mt-8 flex flex-col justify-between">
      <h3 className="my-0 text-[16px] font-semibold">{title}</h3>
      <p className="my-0 mt-1 text-[13px] text-[var(--text-color-secondary)] dark:text-white/80">
        {description}
      </p>
    </div>
  </Link>
);
