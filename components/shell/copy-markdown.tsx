// Copyright (c) ZeroC, Inc.

'use client';

import { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheck,
  type IconDefinition
} from '@fortawesome/free-solid-svg-icons';
import { faCircleXmark, faCopy } from '@fortawesome/free-regular-svg-icons';

type CopyStatus = 'ready' | 'copied' | 'failed';

const STATUS: Record<CopyStatus, { label: string; icon: IconDefinition }> = {
  ready: { label: 'Copy as Markdown', icon: faCopy },
  copied: { label: 'Copied', icon: faCheck },
  failed: { label: 'Copy failed', icon: faCircleXmark }
};

// Puts the page's Markdown on the clipboard, for pasting into a chat with an AI
// assistant. The clipboard item takes the download's promise rather than its
// text, because Safari allows a clipboard write only within the click's
// handler, and awaiting the download would end it.
export const CopyMarkdown = ({ href }: { href: string }) => {
  const [status, setStatus] = useState<CopyStatus>('ready');
  // The status of the latest click resets 3 seconds after it, not after an
  // earlier click's.
  const reset = useRef<ReturnType<typeof setTimeout>>(undefined);
  const copyMarkdown = async () => {
    const markdown = fetch(href).then(async (response) => {
      if (!response.ok)
        throw new Error(`Markdown download failed with ${response.status}`);
      return new Blob([await response.text()], { type: 'text/plain' });
    });
    try {
      await navigator.clipboard.write([
        new ClipboardItem({ 'text/plain': markdown })
      ]);
      setStatus('copied');
    } catch {
      // A failed download or clipboard write is one the reader can retry.
      setStatus('failed');
    }
    clearTimeout(reset.current);
    reset.current = setTimeout(() => setStatus('ready'), 3000);
  };
  const { label, icon } = STATUS[status];
  return (
    <li className="mb-2 text-sm leading-6">
      <button
        type="button"
        onClick={() => void copyMarkdown()}
        className="flex items-center gap-[0.5em] dark:text-[rgba(255,255,255,0.8)]"
      >
        <FontAwesomeIcon icon={icon} className="mr-1.5 size-3.5 text-primary" />
        <span aria-live="polite">{label}</span>
      </button>
    </li>
  );
};
