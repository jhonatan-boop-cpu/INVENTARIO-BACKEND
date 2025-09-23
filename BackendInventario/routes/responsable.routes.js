const express = require ('express');
const router = express.Router();
const responsableController = require  ('../controllers/responsable.controller');

router.post ('/responsable', responsableController.crearResponsable); ///  (/componente) ===> como va ir en la URL
router.get ('/responsable', responsableController.traerResponsable);
router.put ('/responsable/:id', responsableController.editarResponsable);
router.delete('/responsable/:id', responsableController.eliminarResponsable);

module.exports = app => {
    app.use ('/api', router);
};