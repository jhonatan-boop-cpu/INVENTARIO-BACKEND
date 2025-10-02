const db = require('../models')

exports.crearClase = async (req, res) => {
    if (!req.body.nombre) {
        return res.status(400).send({ 
            message: "El contenido no puede estar vacio!" 
        });
    }

    const clase = {
        nombre: req.body.nombre,
    };
    try{
        const nuevaClase = await  db.clase.create(clase);
        res.status(201).send(nuevaClase);
    }catch (error){
        res.status(500).send({
            message: "ocurio un error al crear clase"
        });
    }
};

exports.traerClases = async(req, res) => {
    try {
        const Clases = await db.clase.findAll({
            include: [
                {
                    model: db.tipo,
                    as: 'tipo'
                    //attributes: ['nombre'] causa errores es mejor sin esto para el frond
                }
            ]
        });
        res.status(200).send(Clases);
    } catch (error) {
        res.status(500).send({
            message: "Ocurrio un error al traer las clases"
        });        
    }
};

exports.editarClase = async(req, res) => {
    try {
        const id = req.params.id;
        const {nombre} = req.body;
        const Clase = await db.clase.findByPk(id);
        if (!Clase) {
            return res.status(404).send({
                message: "Clase no encontrada."
            });
        }
        Clase.nombre = nombre || Clase.nombre;
        await Clase.save();
        res.status(200).send(Clase);
    } catch (error) {
        console.log("erro al editar clase", error);
        res.status(500).send ({
            message: "Error al editar la clase"
        });
    }
};

exports.eliminarClase = async(req, res) => {
    try {
        const id = req.params.id;
        const Clase = await db.clase.findByPk(id);

        if (!Clase) {
            return res.status(404).send ({
                message: "Clase no encontrada."
            });
        }
        await Clase.destroy();
        res.status(200).send({
            message: "Clase eliminada correctamente."
        });
    } catch (error) {
        res.status(500).send({
            message: "Error al eliminar clase."
        });
    }
};

