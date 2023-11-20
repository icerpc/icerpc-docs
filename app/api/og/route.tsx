// Copyright (c) ZeroC, Inc.

import { NextRequest, NextResponse } from 'next/server';
import { ImageResponse } from 'next/og';
import { getBreadcrumbs } from 'lib/breadcrumbs';

export async function GET(request: NextRequest) {
  try {
    const fonts = await getFonts();
    const { searchParams } = new URL(request.url);
    const hostname = request.headers.get('host');

    // Get the title, description, and path from the URL parameters
    const getUrlParamValue = (param: string) =>
      getUrlParam(searchParams, param);

    const description = getUrlParamValue('description');
    const title = getUrlParamValue('title');
    const path = getUrlParamValue('path');

    const breadcrumbs: string[] = path
      ? getBreadcrumbs(path).map((crumb) => crumb.name)
      : [];

    // Render a different image for the homepage
    const image =
      path === '/'
        ? homeImage(hostname)
        : pageImage(hostname, breadcrumbs, title, description, fonts);

    return image;
  } catch (e: any) {
    console.log(`${e.message}`);
    return new NextResponse(`Failed to generate the image`, {
      status: 500
    });
  }
}

// Image rendering functions
const homeImage = (hostname: string | null) => {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'black',
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          backgroundImage: `url(http://${hostname}/images/og-home.png)`,
          backgroundSize: 'cover'
        }}
      />
    ),
    {
      width: 1200,
      height: 630
    }
  );
};

const pageImage = (
  hostname: string | null,
  breadcrumbs: string[],
  title: string | undefined,
  description: string | undefined,
  fonts: { name: string; data: ArrayBuffer; style: string; weight: number }[]
) => {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'black',
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          backgroundImage: `url(http://${hostname}/images/og.png)`,
          backgroundSize: 'cover'
        }}
      >
        <div
          style={{
            width: '80%',
            height: '360px',
            marginTop: '200px',
            marginLeft: '84px',
            marginRight: '84px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'flex-start'
          }}
        >
          <ol
            style={{
              display: 'flex',
              justifyContent: 'flex-start',
              padding: '0px'
            }}
          >
            {renderBreadcrumb(breadcrumbs)}
          </ol>

          <h1
            style={{
              fontSize: '78px',
              fontWeight: '700',
              lineHeight: '80px',
              marginTop: '4px',
              marginLeft: '-4px'
            }}
          >
            {title}
          </h1>
          <h2
            style={{
              fontSize: '32px',
              fontWeight: '600',
              color: '#64748b',
              maxWidth: '80%',
              lineHeight: '42px'
            }}
          >
            {description}
          </h2>
        </div>
      </div>
    ),
    {
      // @ts-ignore - The FontOptions type cannot be imported
      fonts: fonts,
      width: 1200,
      height: 630
    }
  );
};

// Utility functions
async function getFonts() {
  // See https://github.com/vercel/next.js/issues/48081 for why this is necessary
  const [interRegular, interMedium, interSemiBold, interBold] =
    await Promise.all([
      fetch(`https://rsms.me/inter/font-files/Inter-Regular.woff`).then((res) =>
        res.arrayBuffer()
      ),
      fetch(`https://rsms.me/inter/font-files/Inter-Medium.woff`).then((res) =>
        res.arrayBuffer()
      ),
      fetch(`https://rsms.me/inter/font-files/Inter-SemiBold.woff`).then(
        (res) => res.arrayBuffer()
      ),
      fetch(`https://rsms.me/inter/font-files/Inter-Bold.woff`).then((res) =>
        res.arrayBuffer()
      )
    ]);

  return [
    {
      name: 'Inter',
      data: interRegular,
      style: 'normal',
      weight: 400
    },
    {
      name: 'Inter',
      data: interMedium,
      style: 'normal',
      weight: 500
    },
    {
      name: 'Inter',
      data: interSemiBold,
      style: 'normal',
      weight: 600
    },
    {
      name: 'Inter',
      data: interBold,
      style: 'normal',
      weight: 700
    }
  ];
}

// Utility function for getting URL parameters
const getUrlParam = (searchParams: URLSearchParams, key: string) =>
  searchParams.has(key) ? searchParams.get(key)?.slice(0, 100) : '';

const renderBreadcrumb = (breadcrumbs: string[]) =>
  breadcrumbs.map((crumb, index) => {
    const isFirst = crumb === breadcrumbs[0];
    const isLast = crumb === breadcrumbs[breadcrumbs.length - 1];
    return (
      <li
        key={index}
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: '2px'
        }}
      >
        <h2
          style={{
            fontSize: '26px',
            fontWeight: '700',
            marginLeft: isFirst ? '0px' : '4px'
          }}
        >
          {crumb}
        </h2>
        {!isLast ? (
          <svg
            fill="none"
            height="32"
            shapeRendering="geometricPrecision"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
          >
            <path d="M16.88 3.549L7.12 20.451"></path>
          </svg>
        ) : null}
      </li>
    );
  });
