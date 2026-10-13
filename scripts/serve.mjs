import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { dirname, extname, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
const siteRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../dist');
const types = { '.html':'text/html; charset=utf-8', '.css':'text/css; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.json':'application/json', '.svg':'image/svg+xml', '.webp':'image/webp', '.ttf':'font/ttf', '.docx':'application/vnd.openxmlformats-officedocument.wordprocessingml.document' };
const server = createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    const filePath = resolve(siteRoot, `.${pathname === '/' ? '/index.html' : pathname}`);
    if (filePath !== siteRoot && !filePath.startsWith(siteRoot + sep)) { response.writeHead(403); response.end('Forbidden'); return; }
    const info = await stat(filePath); if (!info.isFile()) throw new Error('Not a file');
    response.writeHead(200, { 'Content-Type':types[extname(filePath)] || 'application/octet-stream', 'Cache-Control':'no-cache' });
    response.end(await readFile(filePath));
  } catch { response.writeHead(404, { 'Content-Type':'text/plain' }); response.end('Not found'); }
});
server.listen(4173, '127.0.0.1', () => process.stdout.write('Local: http://127.0.0.1:4173\n'));
