// Copyright (c) ZeroC, Inc.

import { useState } from 'react';
import copy from 'copy-to-clipboard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';

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
      {copied ? '🎉' : <FontAwesomeIcon icon={faCopy} className="h-4 w-4" />}
    </button>
  );
};
