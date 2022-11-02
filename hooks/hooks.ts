// Copyright (c) ZeroC, Inc. All rights reserved.

import { useEffect, useState, useRef } from 'react';

export function useHeadsObserver(toc) {
  const observer = useRef<IntersectionObserver>()
  const [activeId, setActiveId] = useState('')

  useEffect(() => {
    const handleObsever = (entries) => {
      entries.forEach((entry) => {
        if (entry?.isIntersecting) {
          setActiveId(entry.target.id)
        }
      })
    }

    observer.current = new IntersectionObserver(handleObsever, {
      rootMargin: "-25% 0px -75% 0px"}
    )

    toc
      .filter(
        (item) =>
          item.id &&
          (item.level === 2 || item.level === 3) &&
          item.title !== 'Next steps'
      )
      .map((item) => document.getElementById(item.id))
      .forEach((elem) => observer.current.observe(elem));
    return () => observer.current.disconnect()
  }, [toc])

  return {activeId}
}
