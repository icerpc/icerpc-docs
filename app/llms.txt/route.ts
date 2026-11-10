// Copyright (c) ZeroC, Inc.

import { llmsTxt, MARKDOWN_HEADERS } from '@/lib/page-markdown';

// The index of the Markdown copies of the pages (see lib/page-markdown.ts).

export const dynamic = 'force-static';

export async function GET() {
  return new Response(await llmsTxt(), { headers: MARKDOWN_HEADERS });
}
