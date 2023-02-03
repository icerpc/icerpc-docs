// Copyright (c) ZeroC, Inc. All rights reserved.

import { ReactNode, useState } from 'react';
import { BiCopy } from 'react-icons/bi';
import { FaFile } from 'react-icons/fa';
import { BsTerminalFill } from 'react-icons/bs';
import copy from 'copy-to-clipboard';
import Highlight, { Language, defaultProps } from 'prism-react-renderer';
import themeLight from 'prism-react-renderer/themes/dracula';
import themeDark from 'prism-react-renderer/themes/dracula';
import { useTheme } from 'next-themes';

// ts-ignore is required for the following line because the package doesn't have types
// @ts-ignore
import Prism from 'prism-react-renderer/prism';
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
  'data-language': string;
  isValid?: boolean;
};

export const CodeBlock = ({
  children,
  'data-language': language,
  isValid
}: Props) => {
  const [copied, setCopied] = useState(false);

  // Switch to dark theme if the user has dark mode enabled
  const { resolvedTheme } = useTheme();
  const theme = resolvedTheme === 'dark' ? themeDark : themeLight;

  // Split the code into lines
  const lines =
    typeof children === 'string' ? children.split('\n').filter(Boolean) : [];

  // If the code is a command line, add a prompt to the first line
  const languageIcon = commandLineLanguages.includes(language) ? (
    <BsTerminalFill />
  ) : (
    <FaFile />
  );

  return (
    // Container for the code block
    <div className="my-5 rounded-2xl bg-[#20212a]">
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
        theme={theme}
        code={children?.trim()}
        language={language as Language}
      >
        {({ style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className="m-0 overflow-auto rounded-2xl px-4 py-3 text-left"
            style={{ ...style }}
          >
            {tokens.map((line, i) => (
              <div
                key={i}
                {...getLineProps({ line, key: i })}
                className="table-row"
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
  return <div className="table-cell py-[2px] text-xs">{children}</div>;
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
  language: string;
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
