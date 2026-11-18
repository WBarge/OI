// Development only. Puts the OI UI and the ProductManager UI behind ONE address, the way the gateway does in production,
// so they share one origin and therefore one sign-in.
//
//   http://localhost:4300/            -> the OI UI            (ng serve on 4201)
//   http://localhost:4300/products/   -> the ProductManager UI (ng serve on 4200)
//
// Start it with:  npm run dev-proxy   (from the UI folder)    Browse to http://localhost:4300/
// No packages needed. Change the addresses with PROXY_PORT, OI_UI_TARGET and PRODUCTS_UI_TARGET if you must.

import http from 'node:http';
import net from 'node:net';

const PORT = Number(process.env.PROXY_PORT ?? 4300);
const OI_UI = new URL(process.env.OI_UI_TARGET ?? 'http://localhost:4201');
const PRODUCTS_UI = new URL(process.env.PRODUCTS_UI_TARGET ?? 'http://localhost:4200');
const PRODUCTS_PATH = '/products';

/** Everything under /products goes to the ProductManager UI, everything else to the OI UI. */
export function targetFor(url) {
  const isProducts = url === PRODUCTS_PATH || url.startsWith(PRODUCTS_PATH + '/') || url.startsWith(PRODUCTS_PATH + '?');
  return isProducts ? PRODUCTS_UI : OI_UI;
}

console.log('Starting dev proxy');

const server = http.createServer((request, response) => {
  if (request.url === '/__dev-proxy__') {   // how a second copy tells that one is already running
    response.writeHead(200, { 'content-type': 'text/plain' });
    response.end('dev-proxy');
    return;
  }
  if (request.url === PRODUCTS_PATH) {      // the ProductManager UI lives under /products/
    response.writeHead(302, { location: PRODUCTS_PATH + '/' });
    response.end();
    return;
  }

  const target = targetFor(request.url ?? '/');
  const upstream = http.request(
    { hostname: target.hostname, port: target.port, path: request.url, method: request.method, headers: { ...request.headers, host: target.host } },
    (upstreamResponse) => {
      response.writeHead(upstreamResponse.statusCode ?? 502, upstreamResponse.headers);
      upstreamResponse.pipe(response);
    },
  );
  upstream.on('error', (error) => {
    response.writeHead(502, { 'content-type': 'text/plain' });
    response.end(`Dev proxy: nothing is answering at ${target.origin} (${error.code}). Is that dev server running?`);
  });
  request.pipe(upstream);
});

// the dev servers' live-reload connections
server.on('upgrade', (request, socket, head) => {
  const target = targetFor(request.url ?? '/');
  const upstream = net.connect(Number(target.port), target.hostname, () => {
    const headers = [];
    for (let i = 0; i < request.rawHeaders.length; i += 2) {
      const name = request.rawHeaders[i];
      headers.push(`${name}: ${name.toLowerCase() === 'host' ? target.host : request.rawHeaders[i + 1]}`);
    }
    upstream.write(`${request.method} ${request.url} HTTP/${request.httpVersion}\r\n${headers.join('\r\n')}\r\n\r\n`);
    upstream.write(head);
    socket.pipe(upstream).pipe(socket);
  });
  upstream.on('error', () => socket.destroy());
  socket.on('error', () => upstream.destroy());
});

server.on('error', async (error) => {
  if (error.code !== 'EADDRINUSE') {
    console.log(`DEV-PROXY-ERROR: ${error.message}`);
    process.exit(1);
  }
  // already running (started from another VS Code window)? then that one serves.
  try {
    const answer = await fetch(`http://localhost:${PORT}/__dev-proxy__`).then((r) => r.text());
    if (answer === 'dev-proxy') {
      console.log(`Dev proxy listening on http://localhost:${PORT}/ (already running, reusing it)`);
      process.exit(0);
    }
  } catch {
    // fall through
  }
  console.log(`DEV-PROXY-ERROR: port ${PORT} is in use by something else. Free it, or set PROXY_PORT.`);
  process.exit(1);
});

server.listen(PORT, () => {
  console.log(`Dev proxy listening on http://localhost:${PORT}/`);
  console.log(`  /           -> ${OI_UI.origin}   (OI UI)`);
  console.log(`  /products/  -> ${PRODUCTS_UI.origin}   (ProductManager UI)`);
});
