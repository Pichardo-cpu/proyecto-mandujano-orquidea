const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

// 1. Cargar variables de entorno desde dotenv
require('dotenv').config();

// 2. Usar los archivos que SÍ existen en tu raíz
const recursosRouter = require('./routers');
const { noEncontrado, manejadorErrores } = require('./middlewares-errores');

const app = express();

// Configuración de origen
const corsOrigin = process.env.CORS_ORIGIN || 'http://localhost:5500';
const port = process.env.PORT || 3000;

// Cabeceras de Seguridad y CORS Restrictivo
app.use(helmet());
app.use(
    cors({
        origin: corsOrigin,
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    })
);

// Middlewares de Lectura y Logs
app.use(express.json({ limit: '100kb' }));
app.use(morgan(process.env.LOG_LEVEL || 'dev'));

// Servir Frontend Estático (o raíz)
app.use(express.static('.'));

// Rutas de la API
app.use('/api', recursosRouter);

// Manejo Centralizado de Errores (SIEMPRE AL FINAL)
app.use(noEncontrado);
app.use(manejadorErrores);

// Arrancar Servidor
app.listen(port, () => {
    console.log(`🚀 Servidor ejecutándose en http://localhost:${port}`);
});