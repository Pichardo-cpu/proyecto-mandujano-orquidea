# REFRICAZ — Servicios de Línea Blanca

Sitio web y backend de **REFRICAZ**, empresa mexicana de servicio técnico para línea blanca (refrigeradores, lavadoras, secadoras, microondas y más). Incluye un sitio público instalable como PWA, un chatbot que arma reportes de falla y los envía por WhatsApp, un panel de administración y un backend en Node.js para búsqueda y guardado de ubicaciones.

> Proyecto académico: Unidad 2 (Creación de Servicios Web) y práctica P1U3 (configuración de un servicio web).

---

## Contenido

- [Características](#características)
- [Tecnologías](#tecnologías)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Requisitos previos](#requisitos-previos)
- [Instalación y ejecución local](#instalación-y-ejecución-local)
- [Variables de entorno](#variables-de-entorno)
- [Referencia de la API](#referencia-de-la-api)
- [Firebase: Auth, Firestore y Storage](#firebase-auth-firestore-y-storage)
- [Despliegue](#despliegue)
- [Seguridad](#seguridad)
- [Documentación adicional](#documentación-adicional)
- [Licencia](#licencia)

---

## Características

### Sitio público (`index.html`)

- Secciones: inicio, nosotros, ofertas, servicios, protocolos, garantía, marcas, historial, testimonios, preguntas frecuentes, contacto y sede/horarios.
- **Chatbot guiado** que recopila municipio, equipo, marca, falla y nombre, y genera un reporte listo para enviar por **WhatsApp**.
- **Ofertas dinámicas por mes**: el banner cambia según el mes actual (`ofertasPorMes` en `script.js`) y puede administrarse desde Firebase.
- **Formularios de contacto y de cita** que registran *leads*.
- **Registro e inicio de sesión** de usuarios con Firebase Authentication, con distinción entre rol `user` y `admin`.
- **Comentarios y calificaciones** (1 a 5 estrellas) de usuarios autenticados, con moderación desde el panel.
- **Mapa de la sede** con iframe de Google Maps (sin API key).
- **PWA**: manifiesto y *service worker* para instalación y soporte sin conexión.

### Panel de administración (`admin.html`)

Pestañas: **Resumen** (gráficas con Chart.js), **Ofertas**, **Historial**, **Usuarios**, **Comentarios** y **Leads**. Solo accesible para usuarios con rol `admin`.

### Funciones serverless (`api/`)

- `POST /api/ai-chat`: asistente de soporte con IA (OpenAI Responses API). Desactivado por defecto.
- `POST /api/leads`: recibe y limpia leads, y los reenvía a un webhook (SheetDB, Zapier, Make, Google Sheets).

### Backend Node.js (`backend/`)

- Health check del servidor.
- Búsqueda de ubicaciones en México con **OpenStreetMap Nominatim** (con caché y límite de 1 petición por segundo).
- CRUD de **ubicaciones guardadas** por usuario, persistidas en **Cloud Firestore**.

---

## Tecnologías

| Capa | Tecnología |
|---|---|
| Frontend | HTML5, CSS3, JavaScript (vanilla), Font Awesome, Chart.js |
| PWA | `manifest.json`, `service-worker.js` |
| Autenticación y datos | Firebase Auth, Cloud Firestore, Firebase Storage |
| Funciones serverless | Node.js (estilo Vercel Functions) |
| Backend | Node.js con módulo `http` nativo, `axios`, `firebase-admin`, `dotenv` |
| IA | OpenAI Responses API |
| Geocodificación | OpenStreetMap Nominatim |
| Herramientas locales | Servidor estático en Node.js y scripts de PowerShell |

---

## Estructura del proyecto

```text
.
├── index.html                 # Sitio público
├── admin.html                 # Panel de administración
├── frontend-404.html          # Página 404
├── script.js                  # Lógica del sitio (chatbot, ofertas, sesión, leads)
├── firebase-client.js         # Cliente de Firebase (Auth, Firestore, Storage)
├── style.css                  # Estilos
├── manifest.json              # Manifiesto PWA
├── service-worker.js          # Caché y modo sin conexión
├── firestore.rules            # Reglas de seguridad de Firestore
├── storage.rules              # Reglas de seguridad de Storage
├── .firebaserc                # Proyecto de Firebase
├── .env.example               # Plantilla de variables de entorno
├── package.json               # Dependencias de la raíz
├── api/
│   ├── ai-chat.js             # Endpoint del chatbot con IA
│   └── leads.js               # Endpoint de leads
├── backend/
│   ├── server.js              # Servidor HTTP (puerto 8000)
│   ├── config/firebase.config.js
│   ├── routes/                # ubicaciones y ubicaciones-guardadas
│   ├── controllers/
│   ├── services/              # geocoding (Nominatim) y Firestore
│   └── models/                # validación de ubicaciones guardadas
├── tools/
│   ├── local-server.js        # Servidor estático local (puerto 5600)
│   ├── start-local-server.ps1
│   ├── open-site.ps1
│   └── open-admin.ps1
├── docs/
│   ├── arquitectura-segura.md
│   └── firebase-firestore-rules.md
├── img/                       # Logos, íconos e imágenes
├── src.js, routers.js,        # Plantilla Express de la práctica P1U3
│   middlewares*.js            # (configuración, rutas y validación)
├── AUDITORIA.md               # Reporte de calidad y seguridad (ISO/IEC 25010)
└── Licencia MIT.md
```

---

## Requisitos previos

- [Node.js](https://nodejs.org/) 18 o superior y npm
- Una cuenta y un proyecto de [Firebase](https://firebase.google.com/) (el proyecto por defecto está en `.firebaserc`)
- Opcional: llave de [OpenAI](https://platform.openai.com/api-keys) para el chatbot con IA
- Opcional: [Firebase CLI](https://firebase.google.com/docs/cli) y [Vercel CLI](https://vercel.com/docs/cli)

---

## Instalación y ejecución local

### 1. Clonar el repositorio

```bash
git clone <URL-DEL-REPOSITORIO>
cd proyecto-mandujano-orquidea-main
```

### 2. Configurar variables de entorno

```bash
cp .env.example .env.local
```

Completa los valores en `.env.local` (consulta [Variables de entorno](#variables-de-entorno)).

### 3. Levantar el sitio (frontend)

```bash
node tools/local-server.js
```

El sitio queda disponible en <http://127.0.0.1:5600> y el panel en <http://127.0.0.1:5600/admin.html>.

En Windows también puedes usar los scripts de PowerShell:

```powershell
.\tools\open-site.ps1     # inicia el servidor y abre el sitio
.\tools\open-admin.ps1    # inicia el servidor y abre el panel admin
```

### 4. Levantar el backend de ubicaciones

```bash
cd backend
npm install
```

Coloca tu credencial de servicio de Firebase en `backend/config/firebase-service-account.json` (descárgala desde *Configuración del proyecto → Cuentas de servicio* en la consola de Firebase). Después:

```bash
npm start
```

El backend queda en <http://127.0.0.1:8000>. Comprueba que funciona:

```bash
curl http://127.0.0.1:8000/
```

```json
{
  "status": "online",
  "message": "Servidor REFRICAZ funcionando",
  "fase": 3,
  "server_time": "..."
}
```

### 5. Probar las funciones serverless (opcional)

```bash
npm install
vercel dev
```

### Activar funciones opcionales

En `script.js` existen banderas de características, ambas desactivadas por defecto:

```js
const REF_FEATURES = {
    aiChatbot: false,    // true para usar /api/ai-chat
    backendLeads: false  // true para enviar leads a /api/leads
};
```

---

## Variables de entorno

Nunca subas llaves reales al repositorio. `.gitignore` excluye `.env`, `.env.*` (salvo `.env.example`) y las credenciales de Firebase.

### Raíz del proyecto (`.env.local`)

| Variable | Descripción |
|---|---|
| `OPENAI_API_KEY` | Llave privada de OpenAI para `/api/ai-chat` |
| `OPENAI_MODEL` | Modelo de OpenAI a utilizar |
| `ALLOWED_ORIGINS` | Orígenes permitidos por CORS, separados por comas (ej. `http://localhost:5600,https://tu-dominio.com`) |
| `LEADS_WEBHOOK_URL` | Webhook temporal para enviar leads (SheetDB, Zapier, Make) |

### Backend (`backend/.env`)

| Variable | Valor por defecto | Descripción |
|---|---|---|
| `PORT` | `8000` | Puerto del servidor |
| `CORS_ORIGIN` | `http://127.0.0.1:5600` | Origen permitido por CORS |

Las credenciales de Firebase Admin se leen de `backend/config/firebase-service-account.json`.

---

## Referencia de la API

### Backend (`http://127.0.0.1:8000`)

| Método | Ruta | Descripción |
|---|---|---|
| `GET` | `/` | Health check |
| `GET` | `/api/ubicaciones/:criterio` | Busca una ubicación en México (código postal, colonia, municipio, etc.) |
| `POST` | `/api/ubicaciones-guardadas` | Guarda una ubicación para el usuario |
| `GET` | `/api/ubicaciones-guardadas` | Lista las ubicaciones guardadas del usuario |
| `GET` | `/api/ubicaciones-guardadas/:id` | Obtiene una ubicación guardada |
| `PUT` / `PATCH` | `/api/ubicaciones-guardadas/:id` | Actualiza las notas de una ubicación |
| `DELETE` | `/api/ubicaciones-guardadas/:id` | Elimina una ubicación guardada |

Las rutas de `ubicaciones-guardadas` requieren el encabezado `x-user-id`.

**Ejemplo: guardar una ubicación**

```bash
curl -X POST http://127.0.0.1:8000/api/ubicaciones-guardadas \
  -H "Content-Type: application/json" \
  -H "x-user-id: usuario123" \
  -d '{
    "external_id": "osm-123456",
    "nombre": "Sucursal Centro",
    "categoria": "sucursal",
    "estado": "Ciudad de México",
    "municipio": "Cuauhtémoc",
    "latitud": 19.4326,
    "longitud": -99.1332,
    "notas": "Cerca del metro"
  }'
```

Reglas de validación: `latitud` entre -90 y 90, `longitud` entre -180 y 180, `notas` hasta 250 caracteres y `recurso_visual` solo con URL `https://`.

Las respuestas de error siguen el formato:

```json
{ "status": "error", "message": "Descripción del error" }
```

### Funciones serverless

| Método | Ruta | Descripción |
|---|---|---|
| `POST` | `/api/ai-chat` | Recibe `{ "message": "...", "context": { ... } }` y responde `{ "reply": "..." }` |
| `POST` | `/api/leads` | Recibe un lead, lo limpia y lo reenvía al webhook configurado |

---

## Firebase: Auth, Firestore y Storage

**Colecciones de Firestore**

| Colección | Uso | Acceso |
|---|---|---|
| `users` | Perfil y rol (`user` o `admin`) | Cada usuario lee su perfil; el admin gestiona roles |
| `leads` | Solicitudes de servicio | Cualquiera crea; solo admin lee, edita o elimina |
| `comments` | Comentarios y calificaciones | Lectura pública de visibles; crea un usuario autenticado; modera el admin |
| `siteConfig` | Configuración y ofertas del sitio | Lectura pública; escritura solo admin |
| `ubicaciones_guardadas` | Ubicaciones guardadas (vía backend) | Solo a través de Firebase Admin SDK |

**Storage**: la ruta `site/` permite lectura pública y escritura solo para admin (imágenes o video de hasta 10 MB).

**Desplegar reglas**

```bash
firebase deploy --only firestore:rules,storage
```

El primer administrador se define en `firestore.rules` (función `bootstrapAdmin`). Cámbialo por el correo de tu administrador antes de desplegar.

---

## Despliegue

- **Sitio y funciones `api/`**: Vercel. Sube el repositorio y configura las variables `OPENAI_API_KEY`, `OPENAI_MODEL`, `ALLOWED_ORIGINS` y `LEADS_WEBHOOK_URL`.
- **Backend `backend/`**: cualquier servicio que ejecute Node.js. Configura `PORT`, `CORS_ORIGIN` y la credencial de Firebase como secreto.
- **Reglas de seguridad**: con Firebase CLI, como se indica arriba.

---

## Seguridad

- Las llaves privadas viven solo en variables de entorno del servidor, nunca en el navegador.
- CORS restrictivo por variable de entorno (`ALLOWED_ORIGINS` y `CORS_ORIGIN`), sin comodines.
- Reglas de Firestore y Storage con denegación por defecto y roles de administrador.
- Validación y limpieza de datos en el backend y en las funciones serverless.
- Alertas de Dependabot activas. Consulta [`AUDITORIA.md`](AUDITORIA.md) para el reporte completo (ISO/IEC 25010).

---

## Documentación adicional

- [`docs/arquitectura-segura.md`](docs/arquitectura-segura.md): variables de entorno, Vercel Functions, integración de IA, leads, Firestore y PWA.
- [`docs/firebase-firestore-rules.md`](docs/firebase-firestore-rules.md): reglas de Firestore.
- [`backend/INSTRUCCIONES-FASE1.md`](backend/INSTRUCCIONES-FASE1.md): evidencias de la Fase 1 del servicio web.
- [`AUDITORIA.md`](AUDITORIA.md): auditoría de calidad y seguridad.

---

## Licencia

Distribuido bajo la licencia MIT. Consulta el archivo [`Licencia MIT.md`](Licencia%20MIT.md).
