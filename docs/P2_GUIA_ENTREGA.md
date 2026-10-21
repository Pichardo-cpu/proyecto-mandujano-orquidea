# Práctica P2 - guía de ejecución, comprobación y entrega

**Integrantes:**
- Perez Martinez Ali Ramses
- Zamora Ojeda Estrella Edith
- Perez Martinez Grettell Garet
- Mendoza Olmedo Ricardo
- Mendez Millan Monserat Nizbeth

## A. Ejecutar desde el ZIP entregado

1. Descomprime `REFRICAZ_P2_DOCKER_OPENAPI.zip` en una carpeta nueva.
2. Abre PowerShell y sitúate en `proyecto-mandujano-orquidea`.
3. Abre Docker Desktop (espera a que muestre Engine running).
4. Ejecuta:

```powershell
Copy-Item .env.example .env
docker compose up --build -d
docker compose ps
```

5. Las tres filas `backend`, `frontend` y `firestore` deben mostrar `Up` (o `running`), y `firestore` debe estar `healthy`. El arranque inicial puede descargar imágenes y el emulador.
6. Abre `http://localhost:8080/estado-api.html` y presiona `Probar GET`: debe responder `HTTP 200` con un JSON cuyo campo `total` sea entero.
7. Abre `http://localhost:3000/api-docs/` y usa `Try it out`.

## B. Tres pruebas mínimas desde Swagger

En todas las peticiones de ubicaciones guardadas establece `x-user-id: equipo-practica-2`.

**Prueba 1.** `GET /api/ubicaciones-guardadas` -> HTTP 200, `{ "status": "success", "total": 0, "data": [] }` si no hay registros para el usuario.

**Prueba 2.** `POST /api/ubicaciones-guardadas` -> HTTP 201. Pega JSON de ejemplo:

```json
{
  "external_id": "practica-p2-001",
  "nombre": "Sucursal de prueba",
  "categoria": "sucursal",
  "estado": "Estado de México",
  "municipio": "Nezahualcóyotl",
  "codigo_postal": "57000",
  "latitud": 19.4000,
  "longitud": -99.0000,
  "notas": "Registro académico de prueba"
}
```

**Prueba 3.** `GET /api/ubicaciones-guardadas/{id}` -> HTTP 200, usa `data.id` de la respuesta anterior. Para comprobar error 404, intenta GET con un ID inexistente. Para comprobar 400, intenta POST sin campo `nombre`.

Si ya existe el registro con `external_id` fijo y POST responde 409, cambia `external_id` a otro valor.

## C. Validación automatizada opcional

Con Node.js >=18 instalado en el equipo: `node scripts/validar-p2.mjs`. El script crea un registro único, comprueba respuesta y lo elimina. Puede ser una comprobación adicional a Swagger, pero no sustituye las capturas de Try it out.

## D. Capturas que requiere la práctica

1. `docker compose ps` mostrando los tres servicios y estado de la base `healthy`.
2. Swagger UI abierto en `/api-docs/`, con al menos tres `Try it out` (GET / lista, POST / crear, GET / id) ejecutados correctamente.
3. Sitio servido en `http://localhost:8080` y página 404 personalizada en `/ruta-inexistente`.
4. Clonación limpia desde GitHub: terminal con `git clone`, copia de `.env.example`, `docker compose up --build` y resultado funcionando.
5. Evidencia del equipo evaluador externo: nombre del equipo que probó el proyecto y reporte de máximo cinco líneas.
6. Etiqueta `v1.0.0` y release visibles en GitHub.

## E. Enviar a GitHub sin publicar secretos

**Trabajar con rama nueva; nunca sobrescribir el respaldo ZIP original.** Si `.env` o `.env.local` figuran en el índice del repositorio, desde una clonación Git original:

```powershell
git switch -c practica-distribucion
git rm --cached --ignore-unmatch .env .env.local
git add .
git status
```

Verifica que `git status` NO anuncie secretos nuevos. Para revisar qué archivos `.env` se rastrean:

```powershell
git ls-files | Select-String -Pattern '(^|/)\.env(\.local)?$'
```

Si esta comprobación muestra archivos, quítalos del índice antes del commit. Subir el ZIP a un repo nuevo sin preservar historial no elimina secretos existentes en el historial del antiguo.

```powershell
git commit -m "feat: distribucion reproducible con Docker y OpenAPI"
git push -u origin practica-distribucion
```

Solicita revisión e integra la rama en `main` cuando las pruebas hayan terminado. Después:

```powershell
git switch main
git pull
git tag -a v1.0.0 -m "Primera version distribuible"
git push origin v1.0.0
```

En GitHub abre **Releases > Draft a new release**, selecciona etiqueta `v1.0.0` y publica. Si ya existe esa etiqueta, no la reemplaces sin revisar.

**Nota:** no incluimos un historial `.git` en el ZIP. Los comandos anteriores se ejecutan sobre una clonación Git auténtica.

## F. Clonación limpia

Desde una carpeta distinta:

```powershell
git clone https://github.com/Pichardo-cpu/proyecto-mandujano-orquidea.git prueba-limpia
cd prueba-limpia
Copy-Item .env.example .env
docker compose up --build -d
docker compose ps
```

Comprueba `http://localhost:8080/estado-api.html`, Swagger y los tres endpoints. Si otra copia ya ocupa esos puertos, detén sus contenedores primero con `docker compose down` desde la carpeta original.

## G. Limitaciones relevantes

- No se validó Docker en el entorno de generación: debe ejecutarse en la computadora del equipo.
- Al utilizar Firebase Emulator Suite, backend y frontend del modo Docker trabajan sobre datos locales. Es distinto al despliegue Firebase de producción.
- La geocodificación `GET /api/ubicaciones/{criterio}` requiere internet para Nominatim y puede recibir errores 502/503 si el proveedor no está accesible; las tres pruebas mínimas no dependen de Nominatim.
- Los endpoints serverless Vercel `/api/leads` y `/api/ai-chat` no están incluidos en el backend Docker. Esta limitación no afecta la documentación de los endpoints CRUD exigidos en la práctica, pero esas funciones no se prueban desde Docker.
- Los datos Firestore del emulador se exportan al detener normalmente; no es garantía de recuperación tras interrupción abrupta. No utilices `docker compose down -v` antes de documentar los resultados.
- El encabezado `x-user-id` es identificador académico y **no implementa autenticación real** para el CRUD.
- Si `.env`/`.env.local` quedaron expuestos en Git, quitar los archivos actuales no borra el historial; cambia cualquier contraseña o llave privada real previamente publicada.
