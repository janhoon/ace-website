import type { APIRoute } from 'astro';

export const prerender = false;

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const runtime = (locals as any).runtime;
    const env = runtime?.env || {};
    const formData = await request.formData();

    // Honeypot check
    const honeypot = formData.get('website');
    if (honeypot) {
      return jsonResponse({ success: true });
    }

    const name = (formData.get('name') as string)?.trim();
    const email = (formData.get('email') as string)?.trim();
    const subject = (formData.get('subject') as string)?.trim();
    const message = (formData.get('message') as string)?.trim();
    const turnstileToken = formData.get('cf-turnstile-response') as string;

    if (!name || !email || !subject || !message) {
      return jsonResponse({ success: false, error: 'All fields are required.' }, 400);
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return jsonResponse({ success: false, error: 'Invalid email address.' }, 400);
    }

    // Validate Turnstile
    const turnstileSecret = env.TURNSTILE_SECRET_KEY;
    if (turnstileSecret) {
      const turnstileResult = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          secret: turnstileSecret,
          response: turnstileToken || '',
          remoteip: request.headers.get('CF-Connecting-IP') || '',
        }),
      });

      const turnstileData = await turnstileResult.json() as { success: boolean };
      if (!turnstileData.success) {
        return jsonResponse({ success: false, error: 'Bot verification failed. Please try again.' }, 403);
      }
    }

    const ip = request.headers.get('CF-Connecting-IP') || 'unknown';

    // Store in D1
    const db = env.DB;
    if (db) {
      await db.prepare(
        'INSERT INTO leads (name, email, subject, message, ip, created_at) VALUES (?, ?, ?, ?, ?, ?)'
      ).bind(name, email, subject, message, ip, new Date().toISOString()).run();
    } else {
      console.log('LEAD (no DB):', JSON.stringify({ name, email, subject, message, ip, timestamp: new Date().toISOString() }));
    }

    return jsonResponse({ success: true });
  } catch (err) {
    console.error('Contact form error:', err);
    return jsonResponse({ success: false, error: 'Server error. Please try again.' }, 500);
  }
};

function jsonResponse(data: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
    },
  });
}
