import http from 'k6/http';
import { check, sleep } from 'k6';

// Usuarios virtuales (VUs). Por defecto 5; para subir la carga:
//   ... run -e VUS=15 /scripts/carga.js
const VUS = Number(__ENV.VUS || 5);

export const options = {
  stages: [
    { duration: '10s', target: VUS }, // sube a VUS usuarios en 10s
    { duration: '20s', target: VUS }, // mantiene VUS usuarios 20s
    { duration: '5s', target: 0 },    // baja a 0
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'], // 95% de peticiones < 500ms
    http_req_failed: ['rate<0.01'],   // menos del 1% de errores
  },
};

export default function () {
  // Endpoint de lectura de REFRICAZ (pasa por Nginx -> backend).
  // Requiere el encabezado x-user-id, si no responde 401.
  const res = http.get(
    'http://host.docker.internal:8080/api/ubicaciones-guardadas',
    { headers: { 'x-user-id': 'equipo-practica-2' } }
  );

  check(res, {
    'status es 200': (r) => r.status === 200,
  });

  sleep(1);
}
