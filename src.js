require('dotenv').config();

// Validación de variables obligatorias al arrancar
const requeridas = ['DB_HOST', 'DB_NAME', 'DB_USER', 'DB_PASSWORD'];
const faltantes = requeridas.filter((v) => !process.env[v]);

if (faltantes.length > 0) {
    console.error(`❌ Error crítico: Faltan variables de entorno: ${faltantes.join(', ')}`);
    process.exit(1);
}

module.exports = {
    port: process.env.PORT || 3000,
    env: process.env.NODE_ENV || 'development',
    db: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        name: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
    },
    externalApi: {
        url: process.env.EXTERNAL_API_URL,
        key: process.env.EXTERNAL_API_KEY,
    },
    corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5500',
    logLevel: process.env.LOG_LEVEL || 'dev',
};