// Copyright (c) ZeroC, Inc.

'use client';

import { useState, useEffect, Key } from 'react';
import { faFileLines, faTerminal } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';
import { Highlight, themes, Prism } from 'prism-react-renderer';
import { Fira_Mono } from 'next/font/google';

import dynamic from 'next/dynamic';
import { useMode } from 'context/state';
import { Mode } from 'types';
import { CopyButton } from './CopyButton';
import { useTheme } from 'next-themes';
import { Theme } from 'types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const firaMono = Fira_Mono({ weight: '400', subsets: ['latin', 'latin-ext'] });

const MermaidDiagram = dynamic(() => import('components/Tags/Mermaid'), {
  ssr: false
});

(typeof global !== 'undefined' ? global : window).Prism = Prism;

require('prismjs/components/prism-rust');
require('prismjs/components/prism-csharp');
require('prismjs/components/prism-bash');
require('prismjs/components/prism-protobuf');
require('utils/prism-ebnf');
require('utils/prism-ice');
require('utils/prism-slice');

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

type Props = {
  children: string;
  'data-language'?: string;
  title?: string;
  addMode?: boolean;
  lineNumbers?: boolean;
  showTitle?: boolean;
};

export const CodeBlock = ({
  children,
  'data-language': language,
  title,
  addMode,
  lineNumbers = false,
  showTitle = true
}: Props) => {
  const { mode } = useMode();
  const { resolvedTheme } = useTheme();

  const [theme, setTheme] = useState<any>(themes.jettwaveDark);

  useEffect(() => {
    if (resolvedTheme === Theme.Dark) {
      const darkTheme = { ...themes.vsDark }; // Create a new theme object
      darkTheme.plain = { ...darkTheme.plain, backgroundColor: '#0e1116' };
      setTheme(darkTheme);
    } else {
      setTheme(themes.jettwaveDark);
    }
  }, [resolvedTheme]);

  // If the code is a slice file, add the mode to the first line if the current
  if (language?.toLowerCase() === 'slice' && addMode && mode == Mode.Slice1) {
    const modeLines = [`mode = ${mode}`, '\n'];
    children = modeLines.join('\n').concat(children);
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
    <div className="group relative my-4 w-full items-center overflow-hidden rounded-lg border border-[rgb(46,46,46)] bg-[rgb(6,22,38)] dark:bg-[#0e1116]">
      <TopBar
        language={language}
        code={children}
        title={title}
        hideTitle={!showTitle}
      />
      <Highlight
        theme={theme}
        language={language ?? ''}
        code={children?.trim()}
      >
        {({ className, tokens, getLineProps, getTokenProps, style }) => (
          <pre
            className={clsx(className, firaMono.className, 'my-2 pl-[10px]')}
            style={style}
          >
            <code>
              {tokens.map((line, i) => {
                const { key, ...rest } = getLineProps({
                  line,
                  key: i,
                  className: 'ml-0 max-w-0 py-[3px] pr-5 text-xs'
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
            </code>
          </pre>
        )}
      </Highlight>
      {!showTitle && (
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
  hideTitle?: boolean;
};

const TopBar = ({ language, code, title, hideTitle }: TopBarProps) =>
  language && !hideTitle ? (
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
    <FontAwesomeIcon icon={faFileLines} className="h-4 w-4" />
  ) : commandLineLanguages.includes(language) ? (
    <FontAwesomeIcon icon={faTerminal} className="h-4 w-4" />
  ) : (
    <FontAwesomeIcon icon={faFileLines} className="h-4 w-4" />
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
