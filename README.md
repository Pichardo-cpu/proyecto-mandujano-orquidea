# REFRICAZ - Servicios Técnicos

Sitio web + panel de administración + backend de práctica (Unidad 2: Servicios Web).

## Estructura
- `index.html` : sitio público **y** acceso único (Cliente / Administrador).
- `admin.html` : panel de administración (solo entra quien tenga rol admin; si no, redirige al inicio de sesión del sitio).
- `backend/`   : servidor Node.js (Fases 1-3). Necesita `backend/config/firebase-service-account.json` (NO se sube a Git).
- `api/`       : funciones serverless (chat IA y leads).

## Ejecutar el sitio en local
```
node tools/local-server.js      # http://127.0.0.1:5600
```

## Ejecutar el backend
```
cd backend
npm install
npm start                       # http://127.0.0.1:8000
```
