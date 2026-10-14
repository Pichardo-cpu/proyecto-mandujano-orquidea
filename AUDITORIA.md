# Auditoría de Buenas Prácticas

| # | Revisión | Estado inicial | Estado después de la práctica 2 | Evidencia |
|---|---|---|---|---|
| 1 | Existe .gitignore que excluye .env y dependencias | ❌ Falta | ✅ Cumple | `.gitignore` (excluye `.env`, `node_modules/` y la llave de Firebase) |
| 2 | Existe .env y sin datos sensibles en código | ❌ Falta | ✅ Cumple | `.env` local (no versionado); configuración leída con `process.env` en `backend/server.js` y `backend/config/firebase.config.js`; sin credenciales en Dockerfile ni Compose |
| 3 | Existe .env.example sin valores reales | ❌ Falta | ✅ Cumple | `.env.example` |
| 4 | Endpoints claros, en plural y consistentes | ❌ Falta | — | |
| 5 | Respuestas JSON con estructura consistente | ❌ Falta | — | |
| 6 | Validación de entradas en endpoints | ❌ Falta | — | |
| 7 | Códigos de estado HTTP correctos | ❌ Falta | — | |
| 8 | Manejo de errores centralizado | ❌ Falta | — | |
| 9 | Respuesta 404 controlada en la API | ❌ Falta | — | |
| 10 | CORS restrictivo (no *) | ❌ Falta | ✅ Cumple | `backend/server.js` (origen tomado de `CORS_ORIGIN`) |
| 11 | Cabeceras de seguridad (Helmet) | ❌ Falta | — | |
| 12 | HTML con <head> completo | ❌ Falta | — | |
| 13 | Fuentes alojadas localmente | ❌ Falta | — | |
| 14 | Página 404 personalizada en Frontend | ❌ Falta | ✅ Cumple | `frontend/404.html` + `nginx/default.conf` (`error_page 404`) |
| 15 | Archivo LICENSE | ❌ Falta | ✅ Cumple | `LICENSE` (MIT) |
| 16 | README.md completo | ❌ Falta | ✅ Cumple | `README.md` |
| 17 | Contenerización (Dockerfile, .dockerignore y Compose) | — | ✅ Cumple | `backend/Dockerfile`, `backend/.dockerignore`, `docker-compose.yml` |
| 18 | API documentada con OpenAPI / Swagger UI | — | ✅ Cumple | `backend/openapi.yaml`, `http://localhost:8000/api-docs` |

> Los estados "después" corresponden a los ítems reevaluados en la práctica 2. Agrega capturas como evidencia en el PDF.
> Las filas 17 y 18 se añadieron porque la práctica pide reevaluarlas; ajusta su descripción si tu docente las define distinto.
