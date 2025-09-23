const db = require('../models');
const bcrypt = require('bcrypt');
const { generarToken } = require('../utils/token.utils');


// Crear y guardar un nuevo usuario
exports.crearUsuario = async (req, res) => {
    if (!req.body.nombre || !req.body.email || !req.body.password || !req.body.rol) {
        return res.status(400).send({
            message: "El contenido no puede estar vacio!"
        });
    }
    
    const hashedPassword = await bcrypt.hash(req.body.password, 10);  //para hashear (encriptar) la contraseña 
    const   usuario =  {
        nombre: req.body.nombre,
        email: req.body.email,
        password: hashedPassword,
        rol: req.body.rol
    }; 
    try {
        const nuevoUsuario = await db.usuario.create(usuario);
        res.status(201).send(nuevoUsuario);
    } catch (error) {
        res.status(500).send({
            message: error.message || "Ocurrio un error al crear el usuario."
        });
    }
};

// traer todos los usuarios
exports.traerUsuarios = async (req, res) => {
    try {
        const usuarios = await db.usuario.findAll();
        res.status(200).send(usuarios);
    } catch (error) {
        res.status(500).send({
            message: error.message || "Ocurrio un error al traer los usuarios."
        });
    }
};



//login de ususario
exports.loginUsuario = async (req, res) => {
    const{email, password} = req.body;

    if (!email || !password) {
        return res.status(400).send({
            message: "El contenido no puede estar vacio!"
        });
    }

    try {
        const usuario = await db.usuario.findOne({ where: {email} });
        if (!usuario) {
            return res.status(401).send({
                message: "Usuario no encontrado." 
            });
        }


        const isPasswordValid = await bcrypt.compare(password, usuario.password);
        if (!isPasswordValid) {
            return res.status(401).send({
                message: "Usuario o contraseña incorrectos." 
            });
        }

        const token = generarToken();
        await db.auth_tokens.create({ token, userId: usuario.id });

        res.json({ 
            token,
            usuario:{
                id: usuario.id,
                nombre: usuario.nombre,
                email: usuario.email,
                rol: usuario.rol
            }
            });
    }
        catch (error) {
        res.status(500).send({
            message:"Ocurrio un error al hacer login."
        });
    }
};

//informacion del login
    exports.infodelusuario = async (req, res) => {
    try {
        const id = req.params.id;       
        const usuario = await db.usuario.findByPk(id, {
            attributes: ['nombre', 'email', 'rol']
        });
        if (!usuario) {
            return res.status(404).send({
                message: "Usuario no encontrado."
            });
        }
        res.status(200).send({
            message: "Informacion del usuario",
            usuario: {  //trae la informacion del usuario 
                "nombre": usuario.nombre,
                "email": usuario.email,
                "rol": usuario.rol
            }
        });

    } catch (error) {       
        res.status(500).send({
            message: "Ocurrio un error al traer la informacion del usuario."
        });
    }
};

//editar Nombre
exports.editarUsuario = async (req, res) => {
    try {
        const id = req.params.id; //const declara una variable 
        const { nombre } = req.body; //estructura de objetos del body de postman
        const usuario = await db.usuario.findByPk(id); //db.usuario base de datos de usuario
        if (!usuario) { //si NO existe el usuario
            return res.status(404).send({
                message: "Usuario no encontrado."
            });
        }
        usuario.nombre = nombre || usuario.nombre; 
        await usuario.save(); //await una promesa que llama un dato  // save guarda los cambios
        res.status(200).send(usuario); 
    } catch (error) {
        res.status(500).send({
            message: "Ocurrio un error al editar el usuario."
        });
    }
};

// eliminar po ID
exports.eliminarUsuario = async (req, res) => {
    try {
        const 
        id = req.params.id;
        const usuario = await db.usuario.findByPk(id); //(findByPk) busca directamente solo por ID

        if (!usuario) {
            return res.status(404).send({
                message: "Usuario no encontrado."
            });
        }
        await db.auth_tokens.destroy({where: {userId: id}}) 
        await usuario.destroy();              // DESTROY elimina usuario
        
        res.status(200).send({  
            message: "Usuario eliminado correctamente."
        });
    } catch (error) {
        console.log("error al eliminar" , error);
        res.status(500).send({
            message: "Ocurrio un error al eliminar el usuario."
        });
    }          
};
