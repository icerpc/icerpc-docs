// Copyright (c) ZeroC, Inc.
//
// A page's Markdoc tree as plain Markdown, for the Markdown copy of every page
// that lib/page-markdown.ts serves: CommonMark, with the site's tags written
// out as text. A callout is a quote that opens with its label in bold, a code
// block a fence with its title in the info string, a step a heading over its
// content, and a card a list item. A heading whose anchor its text does not
// yield, one set by hand or one the site derives without the heading's code
// spans and emphasis, carries it as `{#anchor}`, and one marked `icerpcSlice`
// is followed by the note its badge shows on the site. A tag this file does
// not name renders its children, as an aside does its two columns, one after
// the other, so a new tag's text is in the copy before this file knows the tag.

import Markdoc, { type RenderableTreeNode, type Tag } from '@markdoc/markdoc';

import { headingAnchor } from '../markdoc/nodes/heading.markdoc.ts';
import {
  CALLOUT_LABELS,
  type CalloutType
} from '../markdoc/tags/callout.markdoc.ts';

export interface RenderOptions {
  /** The URL to write for a link or an image, given its target as the page's source writes it. */
  href: (href: string) => string;
}

/** The tags that render within a line of text; every other tag is a block. */
const INLINE = new Set(['em', 'strong', 's', 'code', 'br', 'AppLink', 'img']);

const isTag = (node: RenderableTreeNode): node is Tag =>
  Markdoc.Tag.isTag(node);

const isInline = (node: RenderableTreeNode) =>
  !isTag(node) || INLINE.has(node.name);

/** The text of a code node's children. */
const codeText = (nodes: RenderableTreeNode[]) =>
  nodes.filter((node) => typeof node === 'string').join('');

/** Text as Markdown reads it back: the characters that would open markup are escaped. */
export const escapeText = (text: string) =>
  text.replace(/[\\`*_[\]<]/g, '\\$&');

const link = (text: string, href: string, title?: string) =>
  `[${text}](${href}${title ? ` "${title}"` : ''})`;

function longestBacktickRun(text: string): number {
  let longest = 0;
  for (const run of text.match(/`+/g) ?? [])
    longest = Math.max(longest, run.length);
  return longest;
}

function codeSpan(code: string): string {
  const ticks = '`'.repeat(longestBacktickRun(code) + 1);
  const pad = code.startsWith('`') || code.endsWith('`') ? ' ' : '';
  return `${ticks}${pad}${code}${pad}${ticks}`;
}

function fence(language: string | undefined, code: string, title?: string) {
  const body = code.replace(/\n$/, '');
  const ticks = '`'.repeat(Math.max(3, longestBacktickRun(body) + 1));
  const info = [language ?? '', title ? `title="${title}"` : '']
    .filter(Boolean)
    .join(' ');
  return `${ticks}${info}\n${body}\n${ticks}`;
}

const quote = (text: string) =>
  text
    .split('\n')
    .map((line) => (line ? `> ${line}` : '>'))
    .join('\n');

/** Indent every line after the first; a blank line stays blank. */
const indent = (text: string, by: string) =>
  text.replace(/\n(?!\n|$)/g, `\n${by}`);

/** The text a reader sees in a heading, code spans and emphasis included. */
function plainText(nodes: RenderableTreeNode[]): string {
  return nodes
    .map((node) => (isTag(node) ? plainText(node.children) : String(node)))
    .join('');
}

/** A heading's `{#anchor}`, when its anchor is not the one its whole text yields. */
const anchorFor = (id: string, children: RenderableTreeNode[]) =>
  id === headingAnchor([plainText(children)]) ? '' : ` {#${id}}`;

/** A page's tree as Markdown, ending in a newline. */
export function renderMarkdown(
  tree: RenderableTreeNode,
  options: RenderOptions
): string {
  return `${renderBlock(tree, options).trim()}\n`;
}

/** Blocks one under another; inline nodes between them, if any, make a paragraph. */
function renderChildren(
  nodes: RenderableTreeNode[],
  options: RenderOptions,
  separator = '\n\n'
): string {
  const parts: string[] = [];
  let inline: RenderableTreeNode[] = [];
  const flush = () => {
    const text = renderInline(inline, options).trim();
    if (text) parts.push(text);
    inline = [];
  };
  for (const node of nodes) {
    if (isInline(node)) {
      inline.push(node);
      continue;
    }
    flush();
    const text = renderBlock(node, options);
    if (text) parts.push(text);
  }
  flush();
  return parts.join(separator);
}

function renderBlock(node: RenderableTreeNode, options: RenderOptions): string {
  if (!isTag(node)) return renderInline([node], options);
  const { name, attributes, children } = node;
  switch (name) {
    case 'p':
      return renderInline(children, options).trim();
    case 'Heading': {
      const { level, id, icerpcSlice } = attributes as {
        level: number;
        id: string;
        icerpcSlice: boolean;
      };
      const heading = `${'#'.repeat(level)} ${renderInline(children, options).trim()}${anchorFor(id, children)}`;
      if (!icerpcSlice) return heading;
      const integration = link(
        'IceRPC + Slice integration',
        options.href('/slice#slice-and-icerpc')
      );
      return `${heading}\n\n*This section is specific to the ${integration}.*`;
    }
    case 'Step': {
      const { title, level, id } = attributes as {
        title: string;
        level: number;
        id: string;
      };
      const heading = `${'#'.repeat(level)} ${escapeText(title)}${anchorFor(id, [title])}`;
      return `${heading}\n\n${renderChildren(children, options)}`;
    }
    case 'List':
      return renderList(node, options);
    case 'CodeBlock': {
      const { 'data-language': language, title } = attributes as {
        'data-language'?: string;
        title?: string;
      };
      return fence(language, codeText(children), title);
    }
    case 'Callout': {
      const { type } = attributes as { type: CalloutType };
      const body = renderChildren(children, options);
      return quote(`**${CALLOUT_LABELS[type]}**\n\n${body}`);
    }
    case 'blockquote':
      return quote(renderChildren(children, options));
    case 'hr':
      return '---';
    case 'Table':
      return renderTable(node, options);
    case 'Grid':
      return renderChildren(children, options, '\n');
    case 'Card': {
      const { title, description, href } = attributes as {
        title: string;
        description: string;
        href: string;
      };
      return `- ${link(escapeText(title), options.href(href))}: ${escapeText(description)}`;
    }
    default:
      return renderChildren(children, options);
  }
}

function renderInline(
  nodes: RenderableTreeNode[],
  options: RenderOptions
): string {
  return nodes.map((node) => renderInlineNode(node, options)).join('');
}

function renderInlineNode(
  node: RenderableTreeNode,
  options: RenderOptions
): string {
  if (typeof node === 'string') return escapeText(node);
  if (!isTag(node)) return '';
  const { name, attributes, children } = node;
  const inner = () => renderInline(children, options);
  switch (name) {
    case 'em':
      return `*${inner()}*`;
    case 'strong':
      return `**${inner()}**`;
    case 's':
      return `~~${inner()}~~`;
    case 'code':
      return codeSpan(codeText(children));
    case 'br':
      return '  \n';
    case 'AppLink': {
      const { href, title } = attributes as { href: string; title?: string };
      return link(inner(), options.href(href), title);
    }
    case 'img': {
      const {
        src,
        alt = '',
        title
      } = attributes as {
        src: string;
        alt?: string;
        title?: string;
      };
      return `!${link(escapeText(alt), options.href(src), title)}`;
    }
    default:
      return renderBlock(node, options);
  }
}

function renderList(list: Tag, options: RenderOptions): string {
  const { ordered } = list.attributes as { ordered?: boolean };
  const items = list.children.filter(isTag).map((item, i) => {
    const marker = ordered ? `${i + 1}.` : '-';
    // A tight item is its text, and maybe a nested list; a loose one has paragraphs.
    const loose = item.children.some(
      (child) => isTag(child) && child.name === 'p'
    );
    const body = renderChildren(item.children, options, loose ? '\n\n' : '\n');
    return `${marker} ${indent(body, ' '.repeat(marker.length + 1))}`;
  });
  return items.join(
    items.some((item) => item.includes('\n\n')) ? '\n\n' : '\n'
  );
}

function renderTable(table: Tag, options: RenderOptions): string {
  const rows = (section: string) =>
    table.children
      .filter((child): child is Tag => isTag(child) && child.name === section)
      .flatMap((part) => part.children.filter(isTag))
      .map((row) =>
        row.children.filter(isTag).map((cell) =>
          renderInline(cell.children, options)
            .replace(/\s*\n\s*/g, ' ')
            .trim()
            .replace(/\|/g, '\\|')
        )
      );
  const [header = []] = rows('thead');
  const line = (cells: string[]) => `| ${cells.join(' | ')} |`;
  return [
    line(header),
    line(header.map(() => '---')),
    ...rows('tbody').map(line)
  ].join('\n');
}
