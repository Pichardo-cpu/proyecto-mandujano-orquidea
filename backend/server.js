require("dotenv").config();

const http = require("node:http");
const { servirDocumentacion } = require("./swagger-docs");

const {
  manejarRutaUbicacionesGuardadas
} = require("./routes/ubicaciones-guardadas.routes");

const {
  manejarRutaUbicaciones
} = require("./routes/ubicaciones.routes");

// =====================================================
// VALIDACIÓN DE ARRANQUE (BUENAS PRÁCTICAS)
// =====================================================
const PORT = process.env.PORT || 8000;
const HOST = "0.0.0.0";
const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://127.0.0.1:5600";

// =====================================================
// MIDDLEWARE CORS RESTRICTIVO
// =====================================================
function aplicarCors(req, res) {
  // En lugar de "*", usamos la variable de entorno restrictiva
  res.setHeader("Access-Control-Allow-Origin", CORS_ORIGIN);

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );

  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-User-Id"
  );

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return true;
  }

  return false;
}

const server = http.createServer((req, res) => {
  if (servirDocumentacion(req, res)) return;
  if (aplicarCors(req, res)) {
    return;
  }

  if (manejarRutaUbicacionesGuardadas(req, res)) {
    return;
  }

  // ===================================================
  // HEALTH CHECK
  // GET /
  // ===================================================
  if (req.method === "GET" && req.url === "/") {
    res.writeHead(200, {
      "Content-Type": "application/json; charset=utf-8"
    });

    res.end(
      JSON.stringify(
        {
          status: "online",
          message: "Servidor REFRICAZ funcionando",
          fase: 3,
          server_time: new Date().toISOString()
        },
        null,
        2
      )
    );

    return;
  }

  // ===================================================
  // BÚSQUEDA DE UBICACIONES
  // GET /api/ubicaciones/:criterio
  // ===================================================
  if (manejarRutaUbicaciones(req, res)) {
    return;
  }

  // ===================================================
  // RUTA NO ENCONTRADA (404 EN JSON)
  // ===================================================
  res.writeHead(404, {
    "Content-Type": "application/json; charset=utf-8"
  });

  res.end(
    JSON.stringify(
      {
        status: "error",
        message: "Ruta no encontrada"
      },
      null,
      2
    )
  );
});

server.listen(PORT, HOST, () => {
  console.log("========================================");
  console.log("  REFRICAZ - Backend de Ubicaciones");
  console.log("========================================");
  console.log(`Servidor activo en el puerto ${PORT}`);
  console.log(`Health Check: http://127.0.0.1:${PORT}/`);
  console.log(`CORS Origen Permitido: ${CORS_ORIGIN}`);
  console.log("Presiona Ctrl + C para detener el servidor.");
});
