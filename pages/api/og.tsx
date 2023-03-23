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
            justifyContent: 'center',
            backgroundImage: `url(http://${hostname}/images/og.png)`,
            backgroundSize: 'cover'
          }}
        >
          <div
            style={{
              marginLeft: 190,
              marginRight: 500,
              marginBottom: 200,
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <div
              style={{
                fontSize: 128,
                letterSpacing: '-0.05em',
                color: 'black',
                lineHeight: '120px',
                whiteSpace: 'pre-wrap',
                fontWeight: '1000',
                marginRight: '200px'
              }}
            >
              {title}
            </div>
            <div
              style={{
                fontWeight: '300',
                color: 'gray',
                fontSize: 48,
                marginTop: '40px',
                marginRight: '200px'
              }}
            >
              {description}
            </div>
          </div>
        </div>
      ),
      {
        width: 1920,
        height: 1080
      }
    );
  } catch (error: any) {
    return new Response(error.message, { status: 500 });
  }
}
