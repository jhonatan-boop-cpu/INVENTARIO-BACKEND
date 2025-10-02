const express = require('express');
const router = express.Router();
const unidadController = require('../controllers/unidad.controller')

router.post('/unidad', unidadController.crearUnidad);
router.get('/unidad', unidadController.traerUnidades);
router.put ('/unidad/:id', unidadController.editarUnidad);
router.delete('/unidad/:id', unidadController.eliminarUnidad);


module.exports = app => {
    app.use('/api', router);
};