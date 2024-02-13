// Copyright (c) ZeroC, Inc.

'use client';

import { useState } from 'react';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import copy from 'copy-to-clipboard';

export const CopyButton = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);
  return (
    <button
      aria-label="Copy to clipboard"
      className="rounded px-[6px] py-1 text-white hover:bg-gray-800 hover:text-gray-300"
      onClick={() => {
        copy(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
      }}
    >
      {copied ? '🎉' : <FontAwesomeIcon icon={faCopy} className="size-4" />}
    </button>
  );
};
