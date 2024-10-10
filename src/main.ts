import { serve } from 'bun';
import { RandomQuote } from './controllers/MistralController.ts';

const PORT = 8080;

serve({
  port: PORT,
  async fetch(req) {
    const method = req.method;
    const url = new URL(req.url);
    const path = url.pathname;
    const headers = req.headers;

    console.log(`Received request: ${method} ${path}`);

    switch (method) {
      case 'GET':
        switch (path) {
          case '/':
            return new Response('Hello, world!', { status: 200 });
          case '/health':
            return new Response('ALIVE', { status: 204 });
          case '/api/quote':
            return new Response(JSON.stringify({ quote: await RandomQuote() }), {
              status: 200,
              headers: { 'content-type': 'application/json' },
            });
          default:
            return new Response(null, { status: 404 });
        }
      case 'POST':
        switch (path) {
          case '/':
            return new Response('Halo, world!', { status: 200 });
          case '/health':
            return new Response(null, { status: 204 });
          case '/api/quote':
            return new Response(JSON.stringify({ quote: await RandomQuote() }), {
              status: 200,
              headers: { 'content-type': 'application/json' },
            });
          default:
            return new Response(null, { status: 404 });
        }
      default:
        return new Response(null, { status: 405 });
    }
  },
});