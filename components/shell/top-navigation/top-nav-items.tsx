'use client';

import TopNavigationItem from './top-navigation-item';

export const TopNavigationItems = () => {
  return [
    {
      name: 'Getting Started',
      href: '/getting-started'
    },
    {
      name: 'IceRPC',
      href: '/icerpc'
    },
    {
      name: 'Slice',
      href: '/slice'
    },
    {
      name: 'Protobuf',
      href: '/protobuf'
    },
    {
      name: 'IceRPC for Ice users',
      href: '/icerpc-for-ice-users'
    },
    {
      name: 'API Reference',
      href: `${process.env.NEXT_PUBLIC_API_HOST}/csharp/0.5.x/api/index.html`
    }
  ].map((item) => (
    <TopNavigationItem key={item.href} name={item.name} href={item.href} />
  ));
};
