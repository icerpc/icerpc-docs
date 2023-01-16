// Copyright (c) ZeroC, Inc. All rights reserved.

import { useState } from 'react';
import { BiCopy } from 'react-icons/bi';
import { FaFile } from 'react-icons/fa';
import { BsTerminalFill } from 'react-icons/bs';
import copy from 'copy-to-clipboard';
import Highlight, { defaultProps } from 'prism-react-renderer';
import themeLight from 'prism-react-renderer/themes/dracula';
import themeDark from 'prism-react-renderer/themes/dracula';
import Prism from 'prism-react-renderer/prism';
import { useTheme } from 'next-themes';

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
  keyword: /\b(interface|module|struct|class|exception|enum|throws)\b/,
  punctuation: /[{}[\];(),.:]/,
  number: /\b-?(?:0x[\da-f]+|\d*\.?\d+(?:e[+-]?\d+)?)[ful]*\b/i,
  comment: [
    {
      pattern: /(^|[^\\])\/\*[\w\W]*?\*\//,
      lookbehind: true
    },
    {
      pattern: /(^|[^\\:])\/\/.*/,
      lookbehind: true
    }
  ],
  string: {
    pattern: /(^|[^\\])"(?:\\[\s\S]|[^"\\])*"/,
    lookbehind: true
  },
  operator: /[-+]{1,2}|!|<=?|>=?|={1,3}|&{1,2}|\|?\||\?|\*|\/|~|\^|%/,
  builtin:
    /\b(?:bool|int8|uint8|int16|uint16|int32|uint32|varint32|varuint32|int64|uint64|varint62|varuint62|float32|float64|string)\b/
};

export function CodeBlock({
  children,
  'data-language': language,
  // eslint-disable-next-line no-unused-vars
  multiple = false
}) {
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
    <div className="my-3 rounded-md bg-[#20212a]">
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
        code={children.trim()}
        language={language}
      >
        {({ style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className="relative m-0  overflow-scroll rounded-md p-4 text-left"
            style={{ ...style }}
          >
            {tokens.map((line, i) => (
              <div
                key={i}
                {...getLineProps({ line, key: i })}
                className="table-row"
              >
                <div className="table-cell select-none py-[1px] pr-4 text-right text-sm opacity-50">
                  {i + 1}
                </div>
                <div className="table-cell text-sm">
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token, key })} />
                  ))}
                </div>
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
}

function TopBar({
  languageIcon,
  language,
  lines,
  setCopied,
  copied,
  children
}) {
  return (
    <div className="relative flex h-8 flex-row flex-nowrap justify-between text-white">
      <div className="m-0 ml-4 flex flex-row items-center gap-2 p-0 text-sm">
        {languageIcon}
        {language}
      </div>
      <button
        aria-label="Copy to clipboard"
        className={`mr-2 ${
          lines.length === 1 ? 'top-[2px]' : 'top-[0.1rem]'
        } hover:text-gray-400 `}
        onClick={() => {
          copy(children);
          setCopied(true);
          setTimeout(() => setCopied(false), 3000);
        }}
      >
        {copied ? '🎉' : <BiCopy />}
      </button>
    </div>
  );
}
