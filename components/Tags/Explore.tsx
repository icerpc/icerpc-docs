// Copyright (c) ZeroC, Inc.

import Link from 'next/link';

export const Explore = () => {
  return (
    <div className="mb-10 grid grid-cols-1  gap-4 md:grid-cols-2 lg:grid-cols-3">
      <ExploreCard
        title="Getting Started"
        description="Learn how to use IceRPC in your C# project."
        href="/getting-started"
      />
      <ExploreCard
        title="IceRPC"
        description="A modular RPC framework built for QUIC."
        href="/icerpc"
      />
      <ExploreCard
        title="Slice"
        description="Strongly-Typed Network Calls Made Easy."
        href="/slice"
      />
      <ExploreCard
        title="IceRPC for Ice Users"
        description="Understand how IceRPC relates to Ice, and how to use IceRPC and Ice together."
        href="icerpc-for-ice-users"
      />
      <ExploreCard
        title="API Reference"
        description="An in-depth reference for all IceRPC APIs."
        href="https://docs.testing.zeroc.com/api/csharp/api/IceRpc.html"
      />
    </div>
  );
};

type ExploreCardProps = {
  title: string;
  description: string;
  href: string;
};

const ExploreCard = ({ title, description, href }: ExploreCardProps) => (
  <Link
    href={href}
    className="flex flex-col justify-between rounded-xl border bg-white p-6 shadow-sm dark:border-darkBorder dark:bg-black"
  >
    <div className="flex flex-col justify-between">
      <h3 className="my-0 text-[16px] font-semibold">{title}</h3>
      <p className="my-0 mt-1 text-[13px] text-gray-500">{description}</p>
    </div>
  </Link>
);
