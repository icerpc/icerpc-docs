// Copyright (c) ZeroC, Inc.

import { ReactNode, useState } from 'react';
import { BiCopy } from 'react-icons/bi';
import { FaFile } from 'react-icons/fa';
import { BsTerminalFill } from 'react-icons/bs';
import copy from 'copy-to-clipboard';
import Highlight, { Language, defaultProps } from 'prism-react-renderer';

// ts-ignore is required for the following line because the package doesn't have types
// @ts-ignore
import Prism from 'prism-react-renderer/prism';
import dynamic from 'next/dynamic';
const MermaidDiagram = dynamic(() => import('components/Mermaid'), {
  ssr: false
});
// @ts-ignore
(typeof global !== 'undefined' ? global : window).Prism = Prism;

require('prismjs/components/prism-rust');
require('prismjs/components/prism-csharp');

const commandLineLanguages = [
  'bash',
  'sh',
  'zsh',
  'powershell',
  'cmd',
  'batch',
  'dos',
  'shell'
];

Prism.languages.slice = {
  keyword: /\b(interface|module|struct|class|exception|enum|throws|compact)\b/,
  comment: [
    {
      pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
      lookbehind: true,
      greedy: true
    },
    {
      pattern: /(^|[^\\:])\/\/.*/,
      lookbehind: true,
      greedy: true
    }
  ],
  string: {
    pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
    greedy: true
  },
  number: /\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,
  operator: /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
  punctuation: /[{}[\];(),.:]/,
  builtin:
    /\b(?:bool|int8|uint8|int16|uint16|int32|uint32|varint32|varuint32|int64|uint64|varint62|varuint62|float32|float64|string)\b/
};

type Props = {
  children: string;
  'data-language'?: string;
  isValid?: boolean;
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export const CodeBlock = ({
  children,
  'data-language': language,
  isValid
}: Props) => {
  const [copied, setCopied] = useState(false);

  // Split the code into lines
  const lines =
    typeof children === 'string' ? children.split('\n').filter(Boolean) : [];

  // If the code is a command line, add a prompt to the first line
  // If language is undefined or if it is not included in commandLineLanguages, render a file icon
  // Otherwise, render a terminal icon
  const languageIcon =
    language === undefined ? (
      <FaFile />
    ) : commandLineLanguages.includes(language) ? (
      <BsTerminalFill />
    ) : (
      <FaFile />
    );

  // If the language is mermaid, render the mermaid diagram
  if (language?.toLowerCase() === 'mermaid') {
    return (
      <div className="mx-auto my-4 min-w-full">
        <MermaidDiagram value={`${children.trim()}`} />
      </div>
    );
  }

  return (
    // Container for the code block
    <div className="my-5 rounded-2xl bg-[#17232d]">
      {/* Top bar with language and copy button */}

      <TopBar
        languageIcon={languageIcon}
        language={language}
        lines={lines}
        setCopied={setCopied}
        copied={copied}
      >
        {children}
      </TopBar>
      {/* PrismJS styled code block*/}
      <Highlight
        {...defaultProps}
        code={children?.trim()}
        language={language as Language}
        theme={undefined}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={classNames(
              className,
              'm-0 my-1 overflow-auto rounded-b-2xl px-4 py-3 text-left'
            )}
            style={{ ...style }}
          >
            {tokens.map((line, i) => (
              <div
                key={i}
                {...getLineProps({ line, key: i })}
                className={classNames(className, 'table-row')}
              >
                <LineNumber number={i + 1} />
                <LineContent>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token, key })} />
                  ))}
                </LineContent>
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
};

type LineContentProps = {
  children: ReactNode;
};

const LineContent = ({ children }: LineContentProps) => {
  return <div className="table-cell py-[3px] text-xs">{children}</div>;
};

type LineNumberProps = {
  number: number;
};

const LineNumber = ({ number }: LineNumberProps) => {
  return (
    <div className="table-cell select-none py-[1px] pr-4 text-right text-xs opacity-50">
      {number}
    </div>
  );
};

type TopBarProps = {
  languageIcon: ReactNode;
  language?: string;
  lines: string[];
  setCopied: (copied: boolean) => void;
  copied: boolean;
  children: ReactNode;
};

const TopBar = ({
  languageIcon,
  language,
  lines,
  setCopied,
  copied
}: TopBarProps) => {
  // If the language is csharp, change it to C#
  // TODO: Add more languages
  if (language?.toLowerCase() === 'csharp') {
    language = 'C#';
  }

  return (
    <div className="flex h-8 flex-row justify-between text-white">
      <div className="m-0 ml-4 flex flex-row items-center gap-2 p-0 text-xs">
        {languageIcon}
        {language}
      </div>
      <button
        aria-label="Copy to clipboard"
        className={`mr-4 ${
          lines.length === 1 ? 'top-[2px]' : 'top-[0.1rem]'
        } hover:text-gray-400 `}
        onClick={() => {
          copy(lines.join('\n'));
          setCopied(true);
          setTimeout(() => setCopied(false), 3000);
        }}
      >
        {copied ? '🎉' : <BiCopy />}
      </button>
    </div>
  );
};
