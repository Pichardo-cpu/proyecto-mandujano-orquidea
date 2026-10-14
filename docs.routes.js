const fs = require("node:fs");
const path = require("node:path");
const YAML = require("yaml");
const swaggerUiDist = require("swagger-ui-dist");

const RUTA_DOCS = "/api-docs";
const CARPETA_SWAGGER = swaggerUiDist.getAbsoluteFSPath();

const especificacion = YAML.parse(
  fs.readFileSync(path.join(__dirname, "..", "openapi.yaml"), "utf8")
);
const especificacionJson = JSON.stringify(especificacion);

// Solo se sirven estos archivos de swagger-ui-dist (lista blanca).
const ARCHIVOS_PERMITIDOS = {
  "swagger-ui.css": "text/css; charset=utf-8",
  "swagger-ui-bundle.js": "text/javascript; charset=utf-8"
};

const PAGINA_HTML = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>REFRICAZ API - Documentación</title>
  <link rel="stylesheet" href="${RUTA_DOCS}/swagger-ui.css">
</head>
<body>
  <div id="swagger-ui"></div>
  <script src="${RUTA_DOCS}/swagger-ui-bundle.js"></script>
  <script src="${RUTA_DOCS}/init.js"></script>
</body>
</html>`;

const SCRIPT_INICIO = `window.ui = SwaggerUIBundle({
  url: "${RUTA_DOCS}/openapi.json",
  dom_id: "#swagger-ui"
});`;

function responder(res, tipo, contenido) {
  res.writeHead(200, {
    "Content-Type": tipo,
    "Cache-Control": "no-cache"
  });
  res.end(contenido);
}

function manejarRutaDocs(req, res) {
  if (req.method !== "GET") {
    return false;
  }

  const { pathname } = new URL(req.url, "http://localhost");

  if (pathname !== RUTA_DOCS && !pathname.startsWith(`${RUTA_DOCS}/`)) {
    return false;
  }

  const recurso = pathname.slice(RUTA_DOCS.length).replace(/^\//, "");

  if (recurso === "") {
    responder(res, "text/html; charset=utf-8", PAGINA_HTML);
    return true;
  }

  if (recurso === "openapi.json") {
    responder(res, "application/json; charset=utf-8", especificacionJson);
    return true;
  }

  if (recurso === "init.js") {
    responder(res, "text/javascript; charset=utf-8", SCRIPT_INICIO);
    return true;
  }

  const tipo = ARCHIVOS_PERMITIDOS[recurso];

  if (!tipo) {
    return false;
  }

  fs.readFile(path.join(CARPETA_SWAGGER, recurso), (error, datos) => {
    if (error) {
      res.writeHead(404, { "Content-Type": "application/json; charset=utf-8" });
      res.end(JSON.stringify({ status: "error", message: "Ruta no encontrada" }));
      return;
    }

    res.writeHead(200, {
      "Content-Type": tipo,
      "Cache-Control": "public, max-age=3600"
    });
    res.end(datos);
  });

  return true;
}

module.exports = { manejarRutaDocs };
