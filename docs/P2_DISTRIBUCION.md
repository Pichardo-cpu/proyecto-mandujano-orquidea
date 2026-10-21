# Práctica 2 — Distribución del servicio web REFRICAZ

## Alcance
Se contienenizan el backend Node.js, el frontend con Nginx y el **conjunto de emuladores locales de Firebase (Firestore, Authentication y Storage)** para las rutas de ubicaciones guardadas. La solución no requiere credenciales privadas de Firebase para las pruebas de la API.

> Nota: cuando se abre el sitio desde `localhost:8080`, `firebase-client.js` utiliza Firestore, Authentication y Storage emulados (puertos 8081, 9099 y 9199). Los servicios externos del sitio (`/api/leads` y `/api/ai-chat`) siguen siendo funciones del despliegue original y NO se ejecutan con este backend Docker.

## Requisitos y ejecución en Windows (PowerShell)
```powershell
git clone https://github.com/Pichardo-cpu/proyecto-mandujano-orquidea.git
cd proyecto-mandujano-orquidea
Copy-Item .env.example .env
docker compose up --build -d
docker compose ps
```
Docker Desktop debe estar iniciado con contenedores Linux y WSL2.

## Direcciones y pruebas
- Sitio web: http://localhost:8080
- Prueba de comunicación con API: http://localhost:8080/estado-api.html
- Estado backend: http://localhost:3000/
- Documentación Swagger: http://localhost:3000/api-docs/
- Prueba 404: http://localhost:8080/nada

Para Swagger UI, usar encabezado `x-user-id: equipo-practica-2`.
1. `GET /api/ubicaciones-guardadas` debe devolver 200 y array (posiblemente vacío).
2. `POST /api/ubicaciones-guardadas` con los datos de ejemplo YAML debe devolver 201 e ID nuevo.
3. `GET /api/ubicaciones-guardadas/{id}` usando el ID devuelto debe responder 200 con ese registro.
4. `PATCH` o `DELETE` sirven para verificar cambios y errores 404 con un ID inexistente.

## Comandos de diagnóstico
```powershell
docker compose logs -f backend
docker compose logs -f firestore
docker compose down
docker compose config
```
**No usar `docker compose down -v` si se quieren conservar los registros de prueba.**

## Control de secretos
Antes de publicar:
```powershell
git ls-files .env .env.local backend/config/firebase-service-account.json
```
El comando no debe mostrar archivos. Si están rastreados, tras mantener sus copias locales y revisar que no haya secretos reales:
```powershell
git rm --cached -- .env .env.local
```
Eliminar un archivo rastreado NO borra las versiones anteriores del historial. Rotar credenciales reales que se hubieran publicado.

## Publicación y clonación limpia
En la rama de la práctica, revisar cambios, hacer commit, fusionar después de pruebas y publicar etiqueta/release `v1.0.0`. Desde otra carpeta ejecutar nuevamente clone, `.env.example -> .env`, `docker compose up --build`, y documentar el resultado. En la prueba cruzada, otro equipo debe usar solo README + Swagger para probar tres endpoints y elaborar un reporte de máximo 5 líneas.

## Evidencias requeridas
Capturas reales de `docker compose ps`, Swagger con `Try it out` exitoso, clonación limpia y reporte del otro equipo; nombres de todos los integrantes y corrección de `AUDITORIA.md`. Crear PDF final `P2_Distribucion_Equipo<N>.pdf` **solo después de tomar capturas reales**.
