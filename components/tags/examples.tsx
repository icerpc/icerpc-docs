// Copyright (c) ZeroC, Inc.

import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

export const Examples = () => {
  return (
    <div className="mb-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2">
      <ExampleCard
        title="IceRPC + Slice"
        description="Example applications that use both IceRPC and Slice."
        href="https://github.com/icerpc/icerpc-csharp/tree/0.4.x/examples/slice/"
      />
      <ExampleCard
        title="IceRPC + Protobuf"
        description="Example applications that use both IceRPC and Protobuf."
        href="https://github.com/icerpc/icerpc-csharp/tree/0.4.x/examples/protobuf"
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
    <div className="relative flex size-6 items-center justify-center rounded-full ">
      <FontAwesomeIcon icon={faGithub} className="size-6" />
    </div>
    <div className="mt-8 flex flex-col justify-between">
      <h3 className="my-0 text-[16px] font-semibold">{title}</h3>
      <p className="my-0 mt-1 text-[13px] text-[var(--text-color-secondary)] dark:text-white/80">
        {description}
      </p>
    </div>
  </Link>
);
