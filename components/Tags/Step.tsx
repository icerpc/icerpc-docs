// Copyright (c) ZeroC, Inc.

import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
type StepProps = {
  title: string;
  children: React.ReactNode;
  level?: 1 | 2 | 3 | 4;
  id: string;
};

export const Step = ({ title, level = 2, id, children }: StepProps) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const Component: any = `h${level}`;
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsExpanded(!isExpanded);
    }
  };

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.style.height = isExpanded
        ? contentRef.current.scrollHeight + 'px'
        : '0';
    }
  }, [isExpanded]);

  return (
    <div className="border-b-[1px] border-lightBorder dark:border-darkBorder">
      <div
        className="mb-4 flex cursor-pointer flex-row items-center justify-between"
        onClick={() => setIsExpanded(!isExpanded)}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        aria-expanded={isExpanded}
      >
        <Component
          id={id}
          data-text={children}
          role="presentation"
          // eslint-disable-next-line tailwindcss/no-custom-classname
          className="step mb-0 mt-4 items-center hover:[&>*]:opacity-100"
        >
          <span role="heading" aria-level={level}>
            {title}
          </span>
        </Component>
        <FontAwesomeIcon
          icon={isExpanded ? faChevronUp : faChevronDown}
          className="mt-4 h-4 w-4 text-gray-400"
        />
      </div>
      <div
        ref={contentRef}
        style={{
          height: 'auto',
          overflow: 'hidden',
          transition: 'height 0.3s ease-in-out'
        }}
      >
        {children}
        <div />
      </div>
      <style jsx>{`
        .step::before {
          counter-increment: step-counter;
          content: counter(step-counter) ' ';
          color: gray;
          margin-right: 0.5rem;
        }
      `}</style>
    </div>
  );
};
