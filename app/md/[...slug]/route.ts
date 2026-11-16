// Copyright (c) ZeroC, Inc.

import { getAllPagePaths } from '@/lib/markdown';
import { pageMarkdown } from '@/lib/page-markdown';

// Every page as Markdown, at the page's path with `.md` appended; see the
// rewrite and redirect in next.config.ts.

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPagePaths().map((path) => ({ slug: path.slice(1).split('/') }));
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  return pageMarkdown('/' + (await params).slug.join('/'));
}
