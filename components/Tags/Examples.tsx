// Copyright (c) ZeroC, Inc.

import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

export const Examples = () => {
  return (
    <div className="mb-10 grid grid-cols-1  gap-4 md:grid-cols-2 lg:grid-cols-3">
      <ExampleCard
        title="Stream"
        description="Illustrates how to stream random numbers from a server to a client."
        href="https://github.com/icerpc/icerpc-csharp/tree/main/examples/Stream"
      />
      <ExampleCard
        title="Telemetry"
        description="How to use the IceRPC telemetry interceptor and middleware."
        href="https://github.com/icerpc/icerpc-csharp/tree/main/examples/Telemetry"
      />
      <ExampleCard
        title="Retry"
        description="How to use the retry interceptor to retry failed invocations."
        href="https://github.com/icerpc/icerpc-csharp/tree/main/examples/Retry"
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
    className="flex flex-col justify-between rounded-xl border bg-white p-6 shadow-sm dark:border-darkBorder dark:bg-black"
  >
    <div className="relative flex h-6 w-6 items-center justify-center rounded-full ">
      <FontAwesomeIcon icon={faGithub} />
    </div>
    <div className="mt-8 flex flex-col justify-between">
      <h3 className="my-0 text-[16px] font-semibold">{title}</h3>
      <p className="my-0 mt-1 text-[13px] text-gray-500">{description}</p>
    </div>
  </Link>
);
