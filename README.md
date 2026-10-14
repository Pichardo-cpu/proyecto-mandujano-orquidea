# REFRICAZ - Servicios Técnicos

Sitio web + panel de administración + API REST (Node.js y Firestore) del proyecto integrador de Servicios Web.

**Integrantes:** NOMBRE-1, NOMBRE-2

## Requisitos
- Docker y Docker Compose (en Windows: Docker Desktop con WSL2)
- Git

## Instalación y ejecución
```bash
git clone https://github.com/Pichardo-cpu/proyecto-mandujano-orquidea.git
cd proyecto-mandujano-orquidea
cp .env.example .env
# editar .env con sus propios valores (opcional)
docker compose up --build
```
La primera vez tarda unos minutos porque construye las imágenes.

## Accesos
- Frontend: http://localhost:8080
- Prueba de consumo de la API desde el frontend: http://localhost:8080/api-demo.html
- API: http://localhost:8000
- Documentación (Swagger UI): http://localhost:8000/api-docs

## Estructura
- `frontend/` : sitio público (`index.html`) y panel (`admin.html`), servidos con nginx.
- `backend/`  : API Node.js (módulo `http`), con `openapi.yaml` y su `Dockerfile`.
- `emulator/` : emulador de Firestore que actúa como base de datos en Docker.
- `nginx/`    : configuración del servidor del frontend (incluye la página 404).
- `api/`      : funciones serverless (chat IA y leads, para Vercel; no forman parte de Docker Compose).
- `legacy-p1/`: archivos de la práctica anterior (no se usan en la ejecución).

## Variables de entorno
| Variable | Significado |
|---|---|
| `PORT` | Puerto del backend dentro del contenedor (8000) |
| `CORS_ORIGIN` | Único origen autorizado por CORS (el frontend: `http://localhost:8080`) |
| `FIREBASE_PROJECT_ID` | Id del proyecto usado por el emulador de Firestore |
| `FIRESTORE_EMULATOR_HOST` | Host y puerto del emulador (`db:8081`, servicio `db` de Compose) |
| `OPENAI_API_KEY` | (Opcional) llave del chat IA de `api/` |
| `OPENAI_MODEL` | (Opcional) modelo del chat IA |
| `ALLOWED_ORIGINS` | (Opcional) orígenes permitidos en las funciones de `api/` |
| `LEADS_WEBHOOK_URL` | (Opcional) webhook que recibe los leads |

## Uso rápido de la API
Las rutas `/api/ubicaciones-guardadas` requieren el encabezado `X-User-Id` (cualquier texto, por ejemplo `demo-usuario`).
Los datos del emulador se conservan en el volumen `db_data` entre reinicios.

## Ejecución con Firebase real (opcional)
Quita `FIRESTORE_EMULATOR_HOST` del `.env` y coloca tu llave en `backend/config/firebase-service-account.json` (nunca se sube a Git).

## Detener el proyecto
```bash
docker compose down      # conserva los datos
docker compose down -v   # además borra la base de datos (volumen)
```

## Licencia
MIT (ver [LICENSE](LICENSE))
