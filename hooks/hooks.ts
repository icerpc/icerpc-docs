// Copyright (c) ZeroC, Inc.

import { useEffect, useState, useRef } from 'react';
import { TOCItem } from 'components';

export function useHeadsObserver(toc: TOCItem[]) {
  const observer = useRef<IntersectionObserver>();
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const handleObserver = (entries: any[]) => {
      entries.forEach((entry) => {
        if (entry?.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    };

    observer.current = new IntersectionObserver(handleObserver, {
      rootMargin: '-20% 0% -45% 0px'
    });

    toc
      .filter(
        (item) =>
          item.id &&
          (item.level === 2 || item.level === 3) &&
          item.title !== 'Next steps'
      )
      .map((item) => document.getElementById(item.id))
      .filter((elem) => elem !== null)
      .forEach((elem) => observer.current?.observe(elem!));
    return () => observer.current?.disconnect();
  }, [toc]);

  return { activeId };
}
