const express = require('express');
const router = express.Router();
const movimientoController = require('../controllers/movimimientos.controller')

router.post('/entrada', movimientoController.registrarEntrada);
router.post('/salida', movimientoController.registrarSalida);

router.put ('/entrada/:id', movimientoController.editarEntrada);
router.put ('/salida/:id', movimientoController.editarSalida);

router.delete('/entrada/:id', movimientoController.eliminarEntrada);
router.delete('/salida/:id', movimientoController.eliminarSalida);

router.get('/entrada', movimientoController.traerEntradas);
router.get('/salida', movimientoController.traerSalidas);//

router.get('/entrada/:id', movimientoController.obtenerEntrada);
router.get('/salida/:id', movimientoController.obtenerSalida);

//


module.exports = app => {
    app.use('/api', router);
};