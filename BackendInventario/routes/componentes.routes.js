const express = require ('express');
const router = express.Router();
const componetenteController = require  ('../controllers/componente.controller');

router.post ('/componente', componetenteController.crearComponente); ///  (/componente) ===> como va ir en la URL
router.get ('/componentes', componetenteController.traerComponentes);
router.put ('/componente/:id', componetenteController.editarComponente);
router.delete('/componente/:id', componetenteController.eliminarComponente);

module.exports = app => {
    app.use ('/api', router);
};