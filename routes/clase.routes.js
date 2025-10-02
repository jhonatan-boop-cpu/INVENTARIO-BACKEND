const express = require('express');
const router = express.Router();
const claseController = require('../controllers/clase.controller')

router.post('/clase', claseController.crearClase);
router.get('/clase', claseController.traerClases);
router.put ('/clase/:id', claseController.editarClase);
router.delete('/clase/:id', claseController.eliminarClase);


module.exports = app => {
    app.use('/api', router);
};