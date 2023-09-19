import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const config = {
  runtime: 'edge'
};

export default async function handler(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const hostname = req.headers.get('host');

    // ?description=<description>
    const hasDescription = searchParams.has('description');
    const description = hasDescription
      ? searchParams.get('description')?.slice(0, 100)
      : '';

    // ?title=<title>
    const hasTitle = searchParams.has('title');
    const title = hasTitle ? searchParams.get('title')?.slice(0, 100) : '';

    // ?breadcrumbs=<breadcrumbs>
    const hasBreadcrumbs = searchParams.has('breadcrumbs');
    // Breadcrumbs is a JSON stringified array of strings ex.) breadcrumbs=%5B&quot%3BGetting+Started=&quot%3B%2C=&quot%3BInstallation=&quot%3B%5D=
    // We need to parse it and then slice it to 100 characters
    const breadcrumbs: string[] = hasBreadcrumbs
      ? JSON.parse(
          decodeURIComponent(searchParams.get('breadcrumbs') ?? '[]')
        ).map((crumb: string) => crumb.slice(0, 100))
      : [];

    const fonts = await getFonts();

    // Render a different image for the homepage
    if (title == 'Home') {
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
    }

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
              {breadcrumbs.map((crumb, index) => {
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
              })}
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
  } catch (error: any) {
    return new Response(error.message, { status: 500 });
  }
}

// See https://github.com/vercel/next.js/issues/48081 for why this is necessary
export async function getFonts() {
  // This is unfortunate but I can't figure out how to load local font files
  // when deployed to vercel.
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
