const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuario.controller');

router.post('/usuario', usuarioController.crearUsuario);
router.get('/usuario', usuarioController.traerUsuarios);
router.post('/login1', usuarioController.loginUsuario);
router.get('/usuario/:id', usuarioController.infodelusuario);
router.put('/usuario/:id', usuarioController.editarUsuario);
router.delete('/usuario/:id', usuarioController.eliminarUsuario);
module.exports = app => {
    app.use('/api', router);
};

//post crear usuario
//get traer todos los usuarios
//put editar usuario
//delete eliminar usuario
