// Copyright (c) ZeroC, Inc.

import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = new URL(request.nextUrl).searchParams;
  const allowCookies = searchParams.get('allow-cookies');

  if (allowCookies !== null) {
    // Send the cookie back to the client in the response
    const response = new NextResponse();

    // Using the cookies utility to set the cookie
    response.cookies.set('allow.cookies', allowCookies, {
      secure: process.env.NODE_ENV === 'production',
      maxAge: 10000000,
      path: '/'
    });

    return response;
  }

  return new Response('No tracking preferences provided.');
}
