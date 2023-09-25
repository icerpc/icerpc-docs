// Copyright (c) ZeroC, Inc.

import '/public/globals.css';
import { ThemeProvider } from 'components/ThemeProvider';

export default function RootLayout(props: any) {
  return (
    <html lang="en">
      {/* <Head>
          <title>
            {frontmatter && frontmatter.title
              ? `${title} | IceRPC Docs`
              : title}
          </title>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <meta name="referrer" content="strict-origin" />
          <meta name="title" content={title} />
          <meta name="description" content={description} />
          <meta
            name="keywords"
            content="IceRPC, RPC, Ice, ZeroC, networking, documentation, docs, guide"
          />
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:site" content="@zeroc" />
          <meta name="twitter:creator" content="@zeroc" />
          <meta name="twitter:title" content={title} />
          <meta name="twitter:description" content={description} />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://docs.icerpc.dev/" />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="og:locale" content="en_US" />
          <meta
            property="og:image"
            content={`${hostname}/api/og?title=${
              baseUrls.includes(path) ? 'Overview' : title
            }&description=${description}&path=${encodeURIComponent(path)}`}
          />
          <link rel="icon" href="/favicon.ico" sizes="any" />
          <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
          <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        </Head> */}
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {props.children}
        </ThemeProvider>
      </body>
    </html>
  );
}
