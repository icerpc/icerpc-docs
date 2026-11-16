// Copyright (c) ZeroC, Inc.
//
// Every page as Markdown, for agents and crawlers, which read a page far more
// easily as Markdown than as HTML. The copy is served at the page's URL with
// `.md` appended, which the rewrite in next.config.ts sends to the route under
// `app/md/`. Links between pages point at the Markdown copies, and `/llms.txt`
// lists every page by section.

import {
  baseUrls,
  currentNavItem,
  flattenSideBarData,
  sideBarData
} from '@/data';
import { isExternalLink, resolveLink } from '@/lib/links';
import { getAllPagePaths, getMarkdownContent } from '@/lib/markdown';
import { escapeText, renderMarkdown } from '@/lib/plain-markdown';
import { isLink } from '@/types';

const SITE_TITLE = 'IceRPC Docs';

const SUMMARY =
  'IceRPC is an RPC framework for C# and .NET that runs over QUIC or TCP, with RPCs defined in Slice or Protobuf.';

const INDEX = '/llms.txt';

const absolute = (href: string) =>
  new URL(href, process.env.NEXT_PUBLIC_BASE_URL).href;

/** The URL of the Markdown copy of the page at `path`: its URL with `.md` appended. */
export const markdownHref = (path: string) => `${path}.md`;

/** The headers of a Markdown response: readable by a page on another origin, as a tool in a browser is. */
export const MARKDOWN_HEADERS = {
  'Content-Type': 'text/markdown; charset=utf-8',
  'Access-Control-Allow-Origin': '*'
};

/**
 * Where a link on the page at `path` goes in its Markdown copy: a link to a
 * page goes to that page's copy, with its anchor, and a link to an anchor of
 * the page itself is that anchor. Anything else, such as an image or an
 * external page, goes where it goes on the site.
 */
function markdownLink(href: string, path: string, pages: Set<string>): string {
  const link = resolveLink(href, path);
  if (isExternalLink(link)) return link;
  const hashAt = link.indexOf('#');
  const target = hashAt === -1 ? link : link.slice(0, hashAt);
  const hash = hashAt === -1 ? '' : link.slice(hashAt);
  if (target === path && hash) return hash;
  return absolute(pages.has(target) ? markdownHref(target) + hash : link);
}

/** The page's Markdoc tree, and its title and description from its frontmatter. */
async function readPage(path: string) {
  const { content, frontmatter } = await getMarkdownContent(path);
  const { title, description } = frontmatter!;
  return { tree: content!, title: title!, description };
}

/** The Markdown copy of the page at `path`, as the response to serve. */
export async function pageMarkdown(path: string): Promise<Response> {
  const { tree, title, description } = await readPage(path);
  // What nextjs.org's own copies open with: the page's facts as frontmatter,
  // then a pointer to the index.
  const frontmatter = [
    `title: ${JSON.stringify(title)}`,
    description && `description: ${JSON.stringify(description)}`,
    `url: ${absolute(path)}`,
    `docs_index: ${absolute(INDEX)}`
  ]
    .filter(Boolean)
    .join('\n');
  const head =
    `---\n${frontmatter}\n---\n\n` +
    `> For an index of every page, see [llms.txt](${absolute(INDEX)}).\n\n` +
    `# ${escapeText(title)}\n\n${description ? `${escapeText(description)}\n\n` : ''}`;

  const pages = new Set(getAllPagePaths());
  const body = renderMarkdown(tree, {
    href: (href) => markdownLink(href, path, pages)
  });
  // The HTML page is the canonical form of its copy, as its head says in turn
  // with its `rel="alternate"` link to the copy.
  return new Response(head + body, {
    headers: {
      ...MARKDOWN_HEADERS,
      Link: `<${absolute(path)}>; rel="canonical"`
    }
  });
}

/**
 * The index at `/llms.txt`: how the Markdown copies are laid out, and every
 * page by section, in the order of the section's sidebar and then, by path,
 * the pages the sidebar leaves out.
 */
export async function llmsTxt(): Promise<string> {
  const paths = getAllPagePaths();
  const entry = async (path: string) => {
    const { title, description } = await readPage(path);
    const note = description ? `: ${escapeText(description)}` : '';
    return `- [${escapeText(title)}](${absolute(markdownHref(path))})${note}`;
  };
  const sections = await Promise.all(
    baseUrls.map(async (section) => {
      const sidebar = flattenSideBarData(sideBarData(section))
        .filter(isLink)
        .map((link) => link.path.replace(/\/$/, ''));
      const rest = paths
        .filter(
          (path) =>
            (path === section || path.startsWith(`${section}/`)) &&
            !sidebar.includes(path)
        )
        .sort();
      const entries = await Promise.all([...sidebar, ...rest].map(entry));
      return `## ${currentNavItem(section)}\n\n${entries.join('\n')}`;
    })
  );

  return `${[
    `# ${SITE_TITLE}`,
    `> ${SUMMARY}`,
    'Every page is available as Markdown at its URL with `.md` appended. Context7 indexes these docs as ' +
      '`/icerpc/icerpc-docs`.',
    ...sections
  ].join('\n\n')}\n`;
}
