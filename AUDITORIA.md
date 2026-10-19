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
**Dictamen:** Aprobado con observaciones de pruebas de entorno. El repositorio cumple con los estándares mínimos de seguridad y aislamiento de credenciales para código fuente.
