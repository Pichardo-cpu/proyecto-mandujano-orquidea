const CACHE_NAME = "refricaz-static-v23";
const STATIC_ASSETS = [
    "./",
    "index.html",
    "style.css?v=18",
    "script.js?v=14",
    "firebase-client.js?v=6",
    "manifest.json",
    "img/favicon.png",
    "img/logo-azul.png",
    "img/logo-blanco.png",
    "img/hero-bg.jpg"
];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => cache.addAll(STATIC_ASSETS))
            .then(() => self.skipWaiting())
    );
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys()
            .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
            .then(() => self.clients.claim())
    );
});

self.addEventListener("fetch", (event) => {
    const { request } = event;
    if (request.method !== "GET") return;

    const url = new URL(request.url);
    // Solo se gestionan recursos del propio sitio (Firebase, CDN y APIs van directo a la red).
    if (url.origin !== self.location.origin) return;
    // El panel de administración nunca se guarda en caché.
    if (url.pathname.endsWith("/admin.html")) return;

    // Páginas HTML: red primero, caché solo si no hay conexión (así siempre ves la versión nueva).
    if (request.mode === "navigate") {
        event.respondWith(
            fetch(request).catch(() => caches.match("index.html"))
        );
        return;
    }

    // Imágenes, CSS y JS: caché primero y se actualiza en segundo plano.
    event.respondWith(
        caches.match(request).then((cached) => {
            const red = fetch(request).then((response) => {
                if (response && response.ok) {
                    const copia = response.clone();
                    caches.open(CACHE_NAME).then((cache) => cache.put(request, copia));
                }
                return response;
            }).catch(() => cached);
            return cached || red;
        })
    );
});
