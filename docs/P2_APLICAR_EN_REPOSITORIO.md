# Aplicación de la práctica al MISMO repositorio original de GitHub

Este paquete **no** crea un proyecto distinto. La carpeta contiene la página
original `index.html`, `admin.html`, `script.js`, CSS, imágenes y archivos backend,
con los nuevos archivos de la práctica 2 integrados.

## Procedimiento recomendado en Windows

1. Guarda el ZIP original como respaldo y **no lo modifiques**.
2. Clona el repositorio real para conservar sus commits y su enlace de GitHub:

```powershell
git clone https://github.com/Pichardo-cpu/proyecto-mandujano-orquidea.git
```

3. Extrae `REFRICAZ_ORIGINAL_CON_PRACTICA_2.zip` en una carpeta aparte.
4. Copia **el contenido** de `proyecto-mandujano-orquidea-main` (no la carpeta
contenedora) sobre la carpeta clonada `proyecto-mandujano-orquidea`. Puedes
hacerlo con el Explorador de archivos de Windows, aceptando combinar las carpetas
y reemplazar solamente los archivos repetidos. **NO borres la carpeta `.git`**
de la clonación, y **NO copies el `.env` del respaldo**.
5. Abre la carpeta clonada en Visual Studio Code y ejecuta:

```powershell
git status
git diff --stat
git ls-files .env .env.local
```

`git status` muestra los archivos agregados y modificados. Si el último comando
muestra `.env` o `.env.local`, deja las copias locales fuera del control de versiones:

```powershell
git rm --cached --ignore-unmatch .env .env.local
```

Comprueba que `.env` y `.env.local` no figuren como archivos nuevos en `git status`.
Nunca incluyas contraseñas o claves privadas en commits.

## Probar antes de publicar

```powershell
Copy-Item .env.example .env
docker compose config
docker compose up --build -d
docker compose ps
```

Visita `http://localhost:8080`, `http://localhost:3000/api-docs/` y
`http://localhost:8080/estado-api.html`. Realiza tres `Try it out` reales con
Swagger y toma capturas. Los emuladores usan información local de prueba, no
los registros de la empresa.

## Publicar en el repositorio original

Desde la carpeta clonada (si tienes permisos de escritura):

```powershell
git switch -c practica-distribucion
git add .
git status
git commit -m "feat: practica P2 Docker OpenAPI sobre REFRICAZ original"
git push -u origin practica-distribucion
```

Revisa el pull request en GitHub y fusiona a `main` después de comprobar todo.
**No crees la etiqueta `v1.0.0` hasta que el proyecto esté validado.**
Para las capturas de clonación limpia, clona el mismo repositorio en otra carpeta
y sigue únicamente el README para levantarlo.

## Advertencias

- El ZIP no incluye `.git`, por diseño. El historial se conserva trabajando
  sobre una clonación auténtica de GitHub.
- No hemos ejecutado Docker en tu computadora. El estado `healthy` y las
  respuestas `Try it out` deben verificarse en la máquina del equipo.
- La calificación final la determina el docente tras revisar las evidencias.
