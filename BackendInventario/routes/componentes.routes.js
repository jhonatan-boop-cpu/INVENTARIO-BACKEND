const express = require ('express');
const router = express.Router();
const componetenteController = require  ('../controllers/componente.controller');

router.get ('/componentes', componetenteController.traerComponentes);
router.post ('/componente', componetenteController.crearComponente); ///  (/componente) ===> como va ir en la URL
router.put ('/componente/:id', componetenteController.editarComponente);
router.delete('/componente/:id', componetenteController.eliminarComponente);
router.get('/componente/:id', componetenteController.obtenerComponente);

module.exports = app => {
    app.use ('/api', router);
};