const { validationResult } = require('express-validator');

module.exports = (req, res, next) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({
            ok: false,
            error: {
                codigo: 'VALIDACION_FALLIDA',
                mensaje: 'Los datos enviados son inválidos',
                detalles: errores.array().map((e) => ({ campo: e.path, mensaje: e.msg })),
            },
        });
    }
    next();
};