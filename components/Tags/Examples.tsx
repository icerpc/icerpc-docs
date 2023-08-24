// Copyright (c) ZeroC, Inc.

import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

export const Examples = () => {
  return (
    <div className="mb-10 grid grid-cols-1  gap-4 md:grid-cols-2 lg:grid-cols-3">
      <ExampleCard
        title="Greeter"
        description="Illustrates how to send a request and wait for the response."
        href="https://github.com/icerpc/icerpc-csharp/tree/main/examples/Greeter"
      />
      <ExampleCard
        title="GreeterProtobuf"
        description="Illustrates how to use Protobuf with IceRPC."
        href="https://github.com/icerpc/icerpc-csharp/tree/main/examples/GreeterProtobuf"
      />
      <ExampleCard
        title="Interop/Minimal"
        description="Illustrates how IceRPC can communicate with ZeroC Ice."
        href="https://github.com/icerpc/icerpc-csharp/tree/main/examples/Interop/Minimal"
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
