// Copyright (c) ZeroC, Inc.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import Markdoc from '@markdoc/markdoc';

import * as nodes from '../markdoc/nodes/index.ts';
import * as tags from '../markdoc/tags/index.ts';
import { renderMarkdown } from './plain-markdown.ts';

/** A page's source as the site transforms it. */
function tree(source: string) {
  const tokenizer = new Markdoc.Tokenizer({ allowComments: true });
  return Markdoc.transform(Markdoc.parse(tokenizer.tokenize(source)), {
    nodes,
    tags,
    variables: { frontmatter: { title: 'Page' }, path: '/icerpc/page' }
  });
}

/** A page's source as Markdown, with every link and image left as the source gives it. */
const md = (source: string) =>
  renderMarkdown(tree(source), { href: (href) => href });

test('inline markup is written back as Markdown', () => {
  assert.equal(
    md('Plain *em* **strong** ~~gone~~ `code` and a literal \\* star.'),
    'Plain *em* **strong** ~~gone~~ `code` and a literal \\* star.\n'
  );
});

test('headings keep their level, and an anchor set by hand', () => {
  assert.equal(
    md('## Title {% id="custom" %}\n\nText.\n\n### Sub'),
    '## Title {#custom}\n\nText.\n\n### Sub\n'
  );
});

test('a heading whose anchor leaves out its markup carries the anchor', () => {
  assert.equal(
    md('## The `Invoker` property\n\n## Plain words'),
    '## The `Invoker` property {#the-property}\n\n## Plain words\n'
  );
});

test('a heading for the IceRPC + Slice integration says so under it', () => {
  assert.equal(
    md('## C# mapping {% icerpcSlice=true %}\n\nText.'),
    '## C# mapping\n\n*This section is specific to the [IceRPC + Slice integration](/slice#slice-and-icerpc).*\n\nText.\n'
  );
});

test('lists keep nesting, numbering, and loose paragraphs', () => {
  assert.equal(
    md('- one\n- two\n  - nested\n\n1. a\n\n   para\n2. b'),
    '- one\n- two\n  - nested\n\n1. a\n\n   para\n\n2. b\n'
  );
});

test('a code block keeps its language and title, and a longer fence when it holds one', () => {
  assert.equal(
    md(
      '```csharp {% title="Program.cs" %}\nawait server.ShutdownAsync();\n```'
    ),
    '```csharp title="Program.cs"\nawait server.ShutdownAsync();\n```\n'
  );
  assert.equal(md('````md\n```\n````'), '````md\n```\n````\n');
});

test('a callout is a quote that opens with its label', () => {
  assert.equal(
    md('{% callout %}\n\nBody.\n\n- item\n\n{% /callout %}'),
    '> **Note**\n>\n> Body.\n>\n> - item\n'
  );
  assert.equal(
    md('{% callout type="danger" %}\n\nBody.\n\n{% /callout %}'),
    '> **Danger**\n>\n> Body.\n'
  );
});

test('a step is a heading over its content', () => {
  assert.equal(
    md(
      '{% step title="Create the server" %}\n\nRun it.\n\n{% /step %}\n\n' +
        '{% step title="Run it" id="run" %}\n\nDone.\n\n{% /step %}'
    ),
    '## Create the server\n\nRun it.\n\n## Run it {#run}\n\nDone.\n'
  );
});

test('an aside is its two columns, one after the other', () => {
  assert.equal(
    md(
      '{% aside alignment="top" %}\n\nThe contract.\n\n```slice\ninterface Greeter {}\n```\n\n{% /aside %}'
    ),
    'The contract.\n\n```slice\ninterface Greeter {}\n```\n'
  );
});

test('a grid of cards is a list of links', () => {
  assert.equal(
    md(
      '{% grid %}\n\n' +
        '{% card title="Slice" description="A modern IDL." href="/slice" /%}\n\n' +
        '{% card title="Protobuf" description="Protocol Buffers with IceRPC." href="/protobuf" /%}\n\n' +
        '{% /grid %}'
    ),
    '- [Slice](/slice): A modern IDL.\n- [Protobuf](/protobuf): Protocol Buffers with IceRPC.\n'
  );
});

test('a table is a pipe table with its pipes escaped', () => {
  assert.equal(
    md('| Value | Description |\n| --- | --- |\n| `a` | first \\| pipe |'),
    '| Value | Description |\n| --- | --- |\n| `a` | first \\| pipe |\n'
  );
});

test('links and images go through the href mapping', () => {
  const out = renderMarkdown(
    tree(
      '[Router](../dispatch/router), [API](csharp:IceRpc.Router), [here](#anchor) ![alt](/images/x.png)'
    ),
    { href: (href) => `<${href}>` }
  );
  assert.equal(
    out,
    '[Router](<../dispatch/router>), [API](<csharp:IceRpc.Router>), [here](<#anchor>) ![alt](</images/x.png>)\n'
  );
});
