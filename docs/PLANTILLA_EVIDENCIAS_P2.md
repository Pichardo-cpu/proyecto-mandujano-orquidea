# P2 - Distribución de servicios web: Docker + OpenAPI

Proyecto: REFRICAZ | Repositorio: https://github.com/Pichardo-cpu/proyecto-mandujano-orquidea

Integrantes:
- Perez Martinez Ali Ramses
- Zamora Ojeda Estrella Edith
- Perez Martinez Grettell Garet
- Mendoza Olmedo Ricardo
- Mendez Millan Monserat Nizbeth

Número de equipo: **PENDIENTE DE ASIGNAR**
Fecha: 20 de octubre de 2026

## Objetivo
Distribuir REFRICAZ mediante contenedores reproducibles para backend, frontend y emuladores locales de Firebase, con una interfaz Swagger UI que permita consumir endpoints desde documentación OpenAPI.

## Arquitectura implementada
`Navegador → Nginx (frontend, :8080) → Node.js (backend, :3000) → Firestore emulado (servicio firestore)`.
El contenedor `firestore` también sirve Auth y Storage emulados para que la web local no modifique datos de producción.

## Evidencia 1. Contenedores funcionando
**[PEGAR CAPTURA REAL: `docker compose ps`]**
Estado observado: **[COMPLETAR DESPUÉS DE EJECUTAR]**.

## Evidencia 2. Swagger UI / Try it out
**[PEGAR CAPTURA REAL: GET /api/ubicaciones-guardadas devuelve 200]**
**[PEGAR CAPTURA REAL: POST /api/ubicaciones-guardadas devuelve 201]**
**[PEGAR CAPTURA REAL: GET /api/ubicaciones-guardadas/{id} devuelve 200]**

## Evidencia 3. Sitio y 404 personalizada
**[PEGAR CAPTURA REAL: http://localhost:8080 y http://localhost:8080/ruta-inexistente]**

## Evidencia 4. Clonación limpia
**[PEGAR CAPTURA REAL: git clone, Copy-Item y docker compose up --build]**
Resultados: **[COMPLETAR]**.

## Evidencia 5. Evaluación de otro equipo
Equipo evaluador: **[COMPLETAR]**.
Reporte del equipo (máximo cinco líneas): **[COMPLETAR CON SU REPORTE REAL]**.

## Evidencia 6. Control de versiones y release
Repositorio: https://github.com/Pichardo-cpu/proyecto-mandujano-orquidea
Release `v1.0.0`: **[PEGAR ENLACE REAL UNA VEZ PUBLICADO]**
**[PEGAR CAPTURA REAL DEL RELEASE]**

## Dictamen
Configuración proporcionada y documentación preparada. La ejecución local y la validación del otro equipo están pendientes de evidencia real.
