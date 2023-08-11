// Copyright (c) ZeroC, Inc.

// The home page will be handled separately from the other pages in the
// future so that we can have a different layout for the home page. For now
// we just use the same layout as the rest of the docs and use a top level
// index.md file.

import { useRouter } from 'next/router';

import Markdoc, { Config } from '@markdoc/markdoc';
import React, { useEffect, useState } from 'react';
import config, { components } from 'markdoc/schema';
import fs from 'fs';
import yaml from 'js-yaml';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Logo } from 'components';
import { useTheme } from 'next-themes';
import { Theme } from 'types';

export async function getStaticProps() {
  let source;
  let frontmatter;

  try {
    source = fs.readFileSync('pages/index.md', 'utf8');
    const ast = Markdoc.parse(source);
    frontmatter = ast.attributes.frontmatter
      ? yaml.load(ast.attributes.frontmatter)
      : {};
  } catch (error) {
    console.error('Error reading index.md:', error);
    return { props: {} };
  }

  return {
    props: {
      source,
      frontmatter
    }
  };
}

export default function Home({
  source,
  frontmatter
}: {
  source: string;
  frontmatter: any;
}) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  if (source) {
    // Import markdoc nodes and tags from markdoc folder
    const tokenizer = new Markdoc.Tokenizer({ allowComments: true });
    const tokens = tokenizer.tokenize(source);
    const ast = Markdoc.parse(tokens);

    const updatedConfig: Config = {
      ...config,
      variables: {
        frontmatter
      }
    };

    const content = Markdoc.transform(ast, updatedConfig);
    return (
      <div className="mt-[3.75rem] flex grow flex-row justify-center lg:mt-[3.75rem]">
        <div className="flex max-w-[120rem] grow flex-row justify-center">
          <div id="skip-nav" />
          <section className="relative">
            <Hero />
            {Markdoc.renderers.react(content, React, { components })}
            {/* <div className="absolute right-0 top-0 h-[400px] w-[200px] translate-x-[200px] bg-red-500 " /> */}
          </section>
        </div>
      </div>
    );
  } else {
    return <div>Home page not found</div>;
  }
}

const Hero = () => {
  const { resolvedTheme } = useTheme();
  const [background, setBackground] = useState<any>();

  useEffect(() => {
    if (resolvedTheme === Theme.Dark) {
      setBackground({
        backgroundImage: `
        radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.05) 1px, transparent 0)
    `,
        backgroundSize: '16px 16px',
        backgroundRepeat: 'repeat'
      });
    } else {
      setBackground({
        background: `
            radial-gradient(circle at center, rgba(250, 250, 250, 0) 55%, rgba(250, 250, 250, 1) 100%),
            url('/hero-no-grid.png') no-repeat center top
        `,
        backgroundSize: 'cover'
      });
    }
  }, [resolvedTheme]);

  return (
    <div
      className="relative flex w-full max-w-[52rem] flex-col items-center space-y-2 border-b border-b-lightBorder py-10 dark:border-b-darkBorder dark:bg-transparent sm:mx-6 md:mx-10 lg:mx-16"
      style={background}
    >
      <Logo height={75} className="my-4 pt-10" />
      <h2 className="bg-gradient-to-b from-slate-800 to-black bg-clip-text text-[40px] font-extrabold dark:bg-none dark:text-white">
        IceRPC Documentation
      </h2>
      <p className="prose mx-4 max-w-xl text-center text-xl dark:prose-invert">
        IceRPC empowers developers to craft efficient, scalable, and tailored
        network application solutions.
      </p>
      <div className="flex flex-row items-center space-x-4 py-4">
        <Link
          className="flex w-full min-w-[130px] flex-row items-center justify-between rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 px-3 py-[8px] text-center text-sm text-white"
          href="/getting-started"
        >
          Get Started
          <FontAwesomeIcon icon={faArrowRight} className="h-4 w-4" />
        </Link>
        <span className="prose dark:prose-invert">or</span>
        <a
          className="w-full min-w-[120px] rounded-lg border border-black/20 bg-white px-3 py-[8px] text-center text-sm text-black/40 hover:border-black hover:text-black"
          href="https://github.com/icerpc/"
          target="_blank"
        >
          View Source
        </a>
      </div>
    </div>
  );
};
