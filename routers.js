const express = require('express');
const { body, param } = require('express-validator');
// Línea 3 corregida: apunta al archivo de validación local en la raíz
const validar = require('./middlewares-validar');
const router = express.Router();

// GET /api/recursos - Listar (200 OK)
router.get('/', (req, res) => {
    res.status(200).json({
        ok: true,
        data: [{ id: 1, nombre: 'Elemento 1' }],
        total: 1,
    });
});

// GET /api/recursos/:id - Obtener uno (200 / 404)
router.get(
    '/:id', [param('id').isInt({ min: 1 }).withMessage('El ID debe ser un número entero positivo')],
    validar,
    (req, res) => {
        const { id } = req.params;
        if (id !== '1') {
            return res.status(404).json({
                ok: false,
                error: { codigo: 'NO_ENCONTRADO', mensaje: 'El recurso solicitado no existe' },
            });
        }
        res.status(200).json({ ok: true, data: { id: 1, nombre: 'Elemento 1' } });
    }
);

// POST /api/recursos - Crear (201 Created / 400 Bad Request)
router.post(
    '/', [
        body('nombre').trim().notEmpty().withMessage('El nombre es obligatorio'),
        body('precio').isFloat({ min: 0 }).withMessage('El precio debe ser un número positivo'),
    ],
    validar,
    (req, res) => {
        const nuevoElemento = { id: Date.now(), ...req.body };
        res.status(201).json({ ok: true, data: nuevoElemento });
    }
);

// DELETE /api/recursos/:id - Eliminar (204 No Content / 404 Not Found)
router.delete(
    '/:id', [param('id').isInt({ min: 1 }).withMessage('ID inválido')],
    validar,
    (req, res) => {
        // Si el proceso de borrado fue exitoso:
        res.status(204).send();
    }
);

module.exports = router;