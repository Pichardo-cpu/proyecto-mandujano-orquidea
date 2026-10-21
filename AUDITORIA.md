# Reporte de Auditoría de Calidad y Seguridad (SQA)
**Proyecto:** proyecto-mandujano-orquidea  
**Fecha de Evaluación:** 18 de octubre de 2026  
**Norma de Referencia:** ISO/IEC 25010  

---

## 1. Auditoría de Seguridad y Protección de Datos
- [x] **Aislamiento de Claves:** El archivo `.gitignore` excluye `.env`, `.env.local` y credenciales de Firebase (`firebase-service-account*.json`).
- [x] **Configuración de Plantilla:** Existe `.env.example` en la raíz para guiado de variables de entorno.
- [x] **Seguridad de Dependencias:** Activas las alertas automáticas de **Dependabot** y verificadas sin vulnerabilidades abiertas en `/backend`.
- [x] **Protección CORS:** Definida la variable `ALLOWED_ORIGINS` para restricción de dominios autorizados en endpoints serverless.

---

## 2. Arquitectura y Estructura del Código
- [x] **Separación de Responsabilidades:** Decoupling claro entre frontend web (`index.html`, `script.js`), funciones serverless (`/api`) y backend Node.js (`/backend`).
- [x] **Persistencia de Datos:** Reglas de seguridad de Firestore (`firestore.rules`) y Storage (`storage.rules`) creadas para control de acceso.
- [x] **PWA / Service Worker:** Archivo `service-worker.js` y manifiesto presentes para soporte sin conexión / instalación.

---

## 3. Plan de Pruebas y Validación Recomendada
- [x] **Pruebas de Integración API:** Validar endpoints del Chatbot IA ( `/api/ai-chat.js` ) con llaves de OpenAI.
- [x] **Auditoría Lighthouse:** Medir métricas de Rendimiento, Accesibilidad y SEO en el frontend.
- [x] **Simulación Firebase:** Ejecutar `firebase emulators:start` para validar reglas de seguridad de Firestore localmente.

---

## 4. Estado Final de la Auditoría
**Dictamen anterior (antes de P2):** aprobado con observaciones de pruebas de entorno. La validación real de P2 está pendiente.

---

## Auditoría posterior a la práctica 2 (evaluación pendiente de pruebas Docker)

La auditoría original no está organizada por los ítems numerados del 1 al 18 de la guía P1. A continuación se registran los ítems solicitados por la práctica P2 (1, 2, 3, 14, 15, 16, 17 y 18) como **correspondencias provisionales**. Debe cotejarse la numeración con el archivo original de P1 si el docente lo proporciona.

| Ítem | Comprobación requerida | Estado después de la práctica 2 | Archivo o evidencia |
|---|---|---|---|
| 1 | Imagen Docker del backend | Configurado, falta verificar build | `backend/Dockerfile`, captura `docker compose build` |
| 2 | Orquestación de tres servicios | Configurado, falta ejecutar | `docker-compose.yml`, captura `docker compose ps` |
| 3 | Variables/secretos seguros | Plantilla e ignorados; falta comprobar historial del remoto | `.env.example`, `.gitignore`, `git ls-files` |
| 14 | OpenAPI de tres o más endpoints | Archivo preparado, falta validación Swagger Editor | `backend/openapi.yaml` |
| 15 | Swagger UI desde backend | Ruta integrada, falta prueba con navegador | `backend/swagger-docs.js`, `/api-docs/` |
| 16 | Consumir API con Try it out | Pendiente de ejecución real y capturas | Swagger GET/POST/GET por ID |
| 17 | Distribución legible, README/Licencia | Archivos preparados; necesita comprobación ajena | `README.md`, `LICENSE` |
| 18 | Release y clonación limpia | Pendiente de GitHub/otro equipo | Enlace a release y reporte del otro equipo |

**Precaución de seguridad:** el ZIP original incluía `.env` y `.env.local`, que se excluyen del ZIP preparado. Si fueron publicados en commits anteriores, es necesario comprobar el historial y rotar cualquier secreto real expuesto. El nuevo `.gitignore` no retira por sí solo archivos ya rastreados en Git.

**Conclusión de auditoría P2:** la configuración está escrita y se puede revisar estáticamente. El estado de cumplimiento final **no puede marcarse** hasta que el equipo ejecute contenedores, haga pruebas de API y presente las capturas pedidas.
