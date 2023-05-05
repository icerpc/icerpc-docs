// Copyright (c) ZeroC, Inc.

import { useState, useEffect, Key } from 'react';
import { FaFile } from 'react-icons/fa';
import { BsTerminalFill } from 'react-icons/bs';
import clsx from 'clsx';
import { Highlight, themes, Prism } from 'prism-react-renderer';

import dynamic from 'next/dynamic';
import { useEncoding } from 'context/state';
import { Encoding } from 'types';
import { CopyButton } from './CopyButton';
import { useTheme } from 'next-themes';

const MermaidDiagram = dynamic(() => import('components/Mermaid'), {
  ssr: false
});

(typeof global !== 'undefined' ? global : window).Prism = Prism;

require('prismjs/components/prism-rust');
require('prismjs/components/prism-csharp');
require('prismjs/components/prism-bash');

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
    /\b(?:bool|int8|uint8|int16|uint16|int32|uint32|varint32|varuint32|int64|uint64|varint62|varuint62|float32|float64|string|Slice1|Slice2)\b/
};

type Props = {
  children: string;
  'data-language'?: string;
  title?: string;
  addEncoding?: boolean;
  lineNumbers?: boolean;
};

export const CodeBlock = ({
  children,
  'data-language': language,
  title,
  addEncoding,
  lineNumbers = false
}: Props) => {
  const { encoding } = useEncoding();
  const { resolvedTheme } = useTheme();

  const [theme, setTheme] = useState<any>(themes.jettwaveDark);

  useEffect(() => {
    if (resolvedTheme === 'dark') {
      setTheme(themes.vsDark);
    } else {
      setTheme(themes.jettwaveDark);
    }
  }, [resolvedTheme]);

  // If the code is a slice file, add the encoding to the first line if the current
  if (
    language?.toLowerCase() === 'slice' &&
    addEncoding &&
    encoding == Encoding.Slice1
  ) {
    const encodingLines = [`encoding = ${encoding}`, '\n'];
    children = encodingLines.join('\n').concat(children);
  }

  // If the language is mermaid, render the mermaid diagram
  if (language?.toLowerCase() === 'mermaid') {
    return (
      <div className="mx-auto my-4 w-full">
        <MermaidDiagram value={`${children.trim()}`} />
      </div>
    );
  }

  return (
    <div className="group relative my-4 w-full items-center overflow-hidden rounded-lg border border-[rgb(46,46,46)] bg-[rgb(6,22,38)] dark:bg-[rgb(30,30,30)]">
      <TopBar language={language} code={children} title={title} />
      <Highlight
        theme={theme}
        language={language ?? ''}
        code={children?.trim()}
      >
        {({ className, tokens, getLineProps, getTokenProps, style }) => (
          <pre className={clsx(className, 'my-3')} style={style}>
            {tokens.map((line, i) => {
              const { key, ...rest } = getLineProps({
                line,
                key: i,
                className: 'ml-1 pr-5 max-w-0 py-[3px] text-xs'
              });
              const lineKey = key as Key;
              return (
                <div key={lineKey} {...rest}>
                  {lineNumbers && (
                    <span className="mr-4 text-white/40">{i + 1}</span>
                  )}
                  {line.map((token, key) => {
                    const { key: tokenKey, ...rest } = getTokenProps({
                      token,
                      key
                    });
                    return <span key={tokenKey as Key} {...rest} />;
                  })}
                </div>
              );
            })}
          </pre>
        )}
      </Highlight>
      {language == undefined && (
        <div
          className={clsx(
            'absolute right-0 top-2 mr-4 rounded border border-[rgb(46,46,46)] bg-[rgb(6,22,38)] opacity-0',
            'transition-opacity duration-500 group-hover:opacity-100'
          )}
        >
          <CopyButton text={children} />
        </div>
      )}
    </div>
  );
};

type TopBarProps = {
  language?: string;
  title?: string;
  code: string;
};

const TopBar = ({ language, code, title }: TopBarProps) =>
  language ? (
    <div className="flex h-12 flex-row items-center justify-between border-b border-b-[hsl(0,0%,18%)] bg-black/20 text-white dark:bg-black/20">
      <div className="m-0 ml-4 flex flex-row items-center gap-3 p-0 text-sm">
        {LanguageIcon(language ?? '')}
        {title ?? fixLanguage(language) ?? ''}
      </div>
      <div className="mr-4 flex flex-row items-center gap-4">
        <CopyButton text={code} />
      </div>
    </div>
  ) : null;

// Provides an icon given the language of the code block
function LanguageIcon(language: string) {
  return language === undefined ? (
    <FaFile />
  ) : commandLineLanguages.includes(language) ? (
    <BsTerminalFill />
  ) : (
    <FaFile />
  );
}

// A function to fix the spelling of the language
function fixLanguage(language: string) {
  if (language === 'csharp') {
    return 'C#';
  } else {
    return language;
  }
}
