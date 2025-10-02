const db = require('../models')

exports.crearResponsable = async (req, res) => {
    if (!req.body.nombre) {
        return res.status(400).send({ 
            message: "El contenido no puede estar vacio!" 
        });
    }
    const Responsable = {
        nombre: req.body.nombre,
    };
    try{
        const nuevoResponsable = await  db.responsable.create(Responsable);
        res.status(201).send(nuevoResponsable);
    }catch (error){
        console.log("error al crear", error);
        res.status(500).send({
            message: "Ocurrio un error al crear responsable"
        });
    }
};

exports.traerResponsable = async(req, res) => {
    try {
        const Responsable = await db.responsable.findAll();
        res.status(200).send(Responsable);
    } catch (error) {
        res.status(500).send({
            message: "Ocurrio un error al traer los responsables"
        });        
    }
};

exports.editarResponsable = async(req, res) => {
    try {
        const id = req.params.id;
        const {nombre} = req.body;
        const Responsable = await db.responsable.findByPk(id);
        if (!Responsable) {
            return res.status(404).send({
                message: "Responsable no encontrado."
            });
        }
        Responsable.nombre = nombre || Responsable.nombre;
        await Responsable.save();
        res.status(200).send(Responsable);
    } catch (error) {
        console.log("Error al editar.", error);
        res.status(500).send ({
            message: "Error al editar responsable"
        });
    }
};

exports.eliminarResponsable = async(req, res) => {
    try {
        const id = req.params.id;
        const Responsable = await db.responsable.findByPk(id);

        if (!Responsable) {
            return res.status(404).send ({
                message: "Responsable no encontrado."
            });
        }
        await Responsable.destroy();
        res.status(200).send({
            message: "Responsable eliminado correctamente."
        });
    } catch (error) {
        res.status(500).send({
            message: "Error al eliminar responsable."
        });
    }
};
