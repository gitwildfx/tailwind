import { NextResponse } from 'next/server';
import { subscribeWithButtondown } from '@/services/newsletter';  // assuming you put the Buttondown logic in a service
import { NewsletterAPI } from 'pliny/newsletter';
import siteMetadata from '@/data/siteMetadata';

export const dynamic = 'force-static';

const handler = NewsletterAPI({
  // @ts-ignore
  provider: siteMetadata?.newsletter?.provider,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = body.email;

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    if (siteMetadata?.newsletter?.provider === 'buttondown') {
      const data = await subscribeWithButtondown(email);
      return NextResponse.json(data, { status: 200 });
    }

    return handler(request);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to subscribe', details: (error as Error).message },
      { status: 500 }
    );
  }
}

export { handler as GET };
