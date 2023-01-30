// Copyright (c) ZeroC, Inc. All rights reserved.

import { MdThumbDownOffAlt, MdThumbUpOffAlt } from 'react-icons/md';

export const Feedback = () => {
  return (
    <div className="mt-0 flex flex-col items-center pb-8">
      <h3 className="text-base text-[var(--text-color)]">
        Was this page helpful?
      </h3>
      <div className="flex gap-8 text-4xl">
        {/* TODO: Add click functionality to the feedback buttons */}
        <button aria-label="Thumbs down" className="hover:text-primary">
          <MdThumbDownOffAlt />
        </button>
        <button aria-label="Thumbs up" className="hover:text-primary">
          <MdThumbUpOffAlt />
        </button>
      </div>
    </div>
  );
};
