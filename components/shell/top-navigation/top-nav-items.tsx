'use client';

import { useMode } from 'context/state';
import TopNavigationItem from './top-navigation-item';
import { Mode } from 'types';

export const TopNavigationItems = () => {
  const { mode } = useMode();
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
      href: mode === Mode.Slice1 ? '/slice1' : '/slice2'
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
