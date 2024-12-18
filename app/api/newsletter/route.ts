import { NewsletterAPI } from 'pliny/newsletter';
import siteMetadata from '@/data/siteMetadata';
import { NextResponse } from 'next/server';

export const dynamic = 'force-static';

const handler = NewsletterAPI({
  provider: siteMetadata?.newsletter?.provider, // Safely accessing provider with optional chaining
});

// Custom POST logic for Buttondown
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = body.email;

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Check if the provider is Buttondown before applying custom logic
    if (siteMetadata?.newsletter?.provider === 'buttondown') {
      const response = await fetch('https://api.buttondown.email/v1/subscribers', {
        method: 'POST',
        headers: {
          Authorization: `Token ${process.env.BUTTONDOWN_API_KEY}`, // Use your API key
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email_address: email }), // Correctly map field
      });

      if (!response.ok) {
        const error = await response.json();
        return NextResponse.json(error, { status: response.status });
      }

      const data = await response.json();
      return NextResponse.json(data, { status: 200 });
    }

    // Default behavior for other providers
    return handler(request);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to subscribe', details: (error as Error).message },
      { status: 500 }
    );
  }
}

// Export GET method from pliny/newsletter
export { handler as GET };
