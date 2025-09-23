const express = require('express');
const router = express.Router();
const tipoController = require('../controllers/tipo.controller')

router.post('/tipo', tipoController.crarTipo);
router.get('/tipo', tipoController.traerTipos);
router.put ('/tipo/:id', tipoController.editarTipo);
router.delete('/tipo/:id', tipoController.eliminarTipo);

module.exports = app => {
    app.use('/api', router);
};