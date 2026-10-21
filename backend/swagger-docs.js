'use strict';
// Documentación servida por el MISMO backend Node.js sin Express.
const fs = require('node:fs');
const path = require('node:path');
const uiDir = path.join(__dirname, 'swagger-ui');
const types = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8', '.png': 'image/png', '.svg': 'image/svg+xml',
  '.map': 'application/json', '.ico': 'image/x-icon', '.yaml': 'application/yaml; charset=utf-8'
};
function servirDocumentacion(req, res) {
  if (req.method !== 'GET' && req.method !== 'HEAD') return false;
  const url = new URL(req.url, 'http://localhost');
  const ruta = url.pathname;
  if (ruta === '/openapi.yaml') {
    res.writeHead(200, { 'Content-Type': types['.yaml'] });
    if (req.method === 'GET') res.end(fs.readFileSync(path.join(__dirname, 'openapi.yaml')));
    else res.end();
    return true;
  }
  if (ruta === '/api-docs') {
    res.writeHead(301, { Location: '/api-docs/' }); res.end(); return true;
  }
  if (!ruta.startsWith('/api-docs/')) return false;
  const recurso = decodeURIComponent(ruta.slice('/api-docs/'.length)) || 'index.html';
  if (recurso === 'swagger-initializer.js') {
    res.writeHead(200, { 'Content-Type': types['.js'] });
    res.end(`window.onload = function() { window.ui = SwaggerUIBundle({url:'/openapi.yaml',dom_id:'#swagger-ui',deepLinking:true,presets:[SwaggerUIBundle.presets.apis,SwaggerUIStandalonePreset],plugins:[SwaggerUIBundle.plugins.DownloadUrl],layout:'StandaloneLayout'}); };`);
    return true;
  }
  // Impedir acceso a archivos fuera de swagger-ui (path traversal).
  const archivo = path.resolve(uiDir, recurso);
  if (archivo !== uiDir && !archivo.startsWith(uiDir + path.sep)) {
    res.writeHead(403); res.end(); return true;
  }
  try {
    const st = fs.statSync(archivo);
    if (!st.isFile()) throw new Error('not file');
    res.writeHead(200, { 'Content-Type': types[path.extname(archivo)] || 'application/octet-stream' });
    if (req.method === 'GET') fs.createReadStream(archivo).pipe(res);
    else res.end();
  } catch (_) { res.writeHead(404); res.end('Recurso Swagger no encontrado'); }
  return true;
}
module.exports = { servirDocumentacion };
