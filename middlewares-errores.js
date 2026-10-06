const path = require('path');

// 404 para API y Frontend
exports.noEncontrado = (req, res, next) => {
    if (req.originalUrl.startsWith('/api')) {
        return res.status(404).json({
            ok: false,
            error: {
                codigo: 'RUTA_NO_ENCONTRADA',
                mensaje: `La ruta ${req.method} ${req.originalUrl} no existe`,
            },
        });
    }
    // Entrega el HTML 404 del frontend si no es una ruta API
    res.status(404).sendFile(path.join(__dirname, '../../frontend/404.html'));
};

// Manejador centralizado de errores 500
exports.manejadorErrores = (err, req, res, next) => {
    const estado = err.status || 500;
    console.error(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`, err);

    res.status(estado).json({
        ok: false,
        error: {
            codigo: estado === 500 ? 'ERROR_INTERNO' : 'ERROR',
            mensaje: estado === 500 ? 'Ocurrió un error interno en el servidor' : err.message,
        },
    });
};