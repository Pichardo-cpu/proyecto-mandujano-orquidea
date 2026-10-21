# Práctica 2: cambios realizados sobre el archivo ZIP ORIGINAL

**Origen:** `proyecto-mandujano-orquidea-main (1).zip`, descargado desde el
repositorio `Pichardo-cpu/proyecto-mandujano-orquidea`.

**Método:** este ZIP se generó partiendo de los bytes originales. Solo se
superpusieron cambios indispensables y se agregaron archivos para Docker,
Firebase Emulator Suite, Nginx, OpenAPI, Swagger y documentación de P2.
**No se creó un sitio web nuevo ni se sustituyó el proyecto REFRICAZ.**

## Resumen comparativo comprobable

| Concepto | Archivos |
|---|---:|
| En el ZIP original | 69 |
| Originales preservados sin ningún cambio | 59 |
| Archivos originales modificados por la práctica | 8 |
| Archivos de entorno originales excluidos por seguridad | 2 |
| Archivos nuevos añadidos (sin contar este informe) | 19 |

## Archivos originales modificados

- `.env.example`
- `.gitignore`
- `AUDITORIA.md`
- `README.md`
- `backend/config/firebase.config.js`
- `backend/server.js`
- `firebase-client.js`
- `frontend-404.html`

Estos cambios son adaptaciones a Docker / Swagger o documentación P2. El README
incluye el texto original completo y un apartado adicional de la práctica.

## Archivos originales preservados

- `.firebaserc`
- `Licencia MIT.md`
- `admin.html`
- `api/ai-chat.js`
- `api/leads.js`
- `backend/INSTRUCCIONES-FASE1.md`
- `backend/controllers/ubicaciones-guardadas.controller.js`
- `backend/controllers/ubicaciones.controller.js`
- `backend/models/ubicacion-guardada.model.js`
- `backend/package-lock.json`
- `backend/package.json`
- `backend/routes/ubicaciones-guardadas.routes.js`
- `backend/routes/ubicaciones.routes.js`
- `backend/services/geocoding.service.js`
- `backend/services/ubicaciones-guardadas.service.js`
- `docs/arquitectura-segura.md`
- `docs/firebase-firestore-rules.md`
- `firestore.rules`
- `img/467bc762-0506-410e-8804-bcc5bf1c1645.jpeg`
- `img/a038a097-573a-4b2c-a0d8-36291c0c9a65.jpeg`
- `img/centro-lavado.png`
- `img/edaf4659-7b4f-46a6-aee4-1efd10175327.jpeg`
- `img/favicon.png`
- `img/hero-bg.jpg`
- `img/icon-192.png`
- `img/icon-512.png`
- `img/ingenieros.jpg`
- `img/lavadora.jpg`
- `img/lavadora.png`
- `img/logo-azul.png`
- `img/logo-blanco.png`
- `img/logo-ge.png`
- `img/logo-lg.png`
- `img/logo-mabe.png`
- `img/logo-maytag.png`
- `img/logo-samsung.png`
- `img/logo-subzero.png`
- `img/logo-whirlpool.png`
- `img/microondas.png`
- `img/refrigerador.png`
- `img/secadora.png`
- `img/tecnico.jpg`
- `index.html`
- `manifest.json`
- `middlewares-errores.js`
- `middlewares-validar.js`
- `middlewares.js`
- `package-lock.json`
- `package.json`
- `routers.js`
- `script.js`
- `service-worker.js`
- `src.js`
- `storage.rules`
- `style.css`
- `tools/local-server.js`
- `tools/open-admin.ps1`
- `tools/open-site.ps1`
- `tools/start-local-server.ps1`

## Archivos de entorno excluidos intencionalmente

- `.env` (no subir a GitHub)
- `.env.local` (no subir a GitHub)

El archivo `.env` se reconstruye a partir de `.env.example` en cada instalación.
No conserves contraseñas reales en archivos versionados. Si GitHub ya tenía
secretos en commits pasados, excluirlos del nuevo ZIP no limpia el historial.

## Nuevos archivos de la práctica

- `.dockerignore`
- `LICENSE`
- `backend/.dockerignore`
- `backend/Dockerfile`
- `backend/openapi.yaml`
- `backend/swagger-docs.js`
- `docker-compose.yml`
- `docker/estado-api.html`
- `docker/firebase.json`
- `docker/firestore.Dockerfile`
- `docker/frontend.Dockerfile`
- `docker/start-firestore.sh`
- `docs/P2_DISTRIBUCION.md`
- `docs/P2_EVIDENCIAS_EDITABLE.docx`
- `docs/P2_EVIDENCIAS_PREVIA.pdf`
- `docs/P2_GUIA_ENTREGA.md`
- `docs/PLANTILLA_EVIDENCIAS_P2.md`
- `nginx/default.conf`
- `scripts/validar-p2.mjs`

Para comprobar integridad, consulta el CSV
`docs/P2_COMPARATIVO_SHA256.csv` con el hash de cada archivo de ambas versiones.

## Para que el historial de GitHub muestre el trabajo sobre el proyecto original

**No publiques un repositorio nuevo ni reemplaces su historial con este ZIP.**
Clona el repositorio original con Git, copia el contenido de esta carpeta sobre
la clonación conservando la carpeta oculta `.git`, y usa `git status` y
`git diff --stat` para visualizar cada archivo agregado o modificado.
Las instrucciones detalladas están en `docs/P2_APLICAR_EN_REPOSITORIO.md`.

Hasta que se haya probado Docker y se publique realmente, el release `v1.0.0`
y las capturas de funcionamiento **permanecen pendientes**.
