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
  const lines =
    typeof children === 'string' ? children.split('\n').filter(Boolean) : [];
  const languageIcon = commandLineLanguages.includes(language) ? (
    <BsTerminalFill />
  ) : (
    <FaFile />
  );

  return (
    <div className="container">
      <div className="top-bar">
        <div className="language">
          {languageIcon}
          {language}
        </div>
        <button
          aria-label="Copy to clipboard"
          onClick={() => {
            copy(children);
            setCopied(true);
            setTimeout(() => setCopied(false), 3000);
          }}
        >
          {copied ? '🎉' : <BiCopy />}
        </button>
      </div>
      <Highlight
        {...defaultProps}
        theme={theme}
        code={children.trim()}
        language={language}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={className}
            style={{
              ...style,
              position: 'relative',
              padding: '1rem 0 1rem 1rem'
            }}
          >
            {tokens.map((line, i) => (
              <div className="line" key={i} {...getLineProps({ line, key: i })}>
                <div className="line-no">{i + 1}</div>
                <div className="line-content">
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token, key })} />
                  ))}
                </div>
              </div>
            ))}
          </pre>
        )}
      </Highlight>
      <style jsx>
        {`
          button {
            appearance: none;
            background: var(--code-background);
            top: ${lines.length === 1 ? '2px' : '0.1rem'};
            border: none;
            font-size: 16px;
            margin: 8px 8px auto;
            padding: 0;
            color: white;
          }

          button:hover {
            color: gray;
          }

          pre {
            margin: 0;
            text-align: left;
            overflow: scroll;
            border-radius: 5px;
          }

          .container {
            border-radius: 5px;
            background: #20212a;
            margin: 1rem 0;
          }

          .top-bar {
            position: relative;
            height: 30px;
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            justify-content: space-between;
            color: white;
          }

          .language {
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 0.5rem;
            margin: 8px 8px auto;
            padding: 0;
            font-size: 12px;
          }

          .line {
            display: table-row;
          }

          .line-no {
            display: table-cell;
            text-align: right;
            padding-right: 1em;
            user-select: none;
            opacity: 0.5;
            padding-top: 5px;
          }

          .line-content {
            display: table-cell;
          }
        `}
      </style>
    </div>
  );
}
