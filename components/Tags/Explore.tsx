// Copyright (c) ZeroC, Inc.

import { AppLink } from 'components/Nodes/AppLink';

export const Explore = () => {
  return (
    <div className="mb-10 grid grid-cols-1  gap-4 md:grid-cols-2 lg:grid-cols-3">
      <ExploreCard
        title="Getting Started"
        description="Learn how to install IceRPC and write your first IceRPC application."
        href="/getting-started"
      />
      <ExploreCard
        title="IceRPC"
        description="A modular RPC framework built for QUIC."
        href="/icerpc"
      />
      <ExploreCard
        title="Slice"
        description="Strongly-typed network calls made easy."
        href="/slice"
      />
      <ExploreCard
        title="IceRPC for Ice Users"
        description="Start here if you are coming from Ice."
        href="/icerpc-for-ice-users"
      />
      <ExploreCard
        title="API Reference"
        description="The IceRPC for C# API reference."
        href="https://docs.icerpc.dev/api/csharp/api/IceRpc.html"
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
  <AppLink
    href={href}
    className="flex flex-col justify-between rounded-xl border bg-white p-6 shadow-sm dark:border-darkBorder dark:bg-darkAccent"
    showArrow={false}
  >
    <div className="flex flex-col justify-between">
      <h3 className="my-0 text-[16px] font-semibold">{title}</h3>
      <p className="my-0 mt-1 text-[13px] text-[var(--text-color-secondary)] dark:text-white/80">{description}</p>
    </div>
  </AppLink>
);
