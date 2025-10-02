const db = require('../models')

exports.crearUnidad = async (req, res) => {
    if (!req.body.nombre) {
        return res.status(400).send({ 
            message: "El contenido no puede estar vacio!" 
        });
    }
    const Unidad = {
        nombre: req.body.nombre,
    };
    try{
        const nuevaUnidad = await  db.unidad.create(Unidad);
        res.status(201).send(nuevaUnidad);
    }catch (error){
        console.log("error al crear", error);
        res.status(500).send({
            message: "Ocurrio un error al crear la unidad de proceso"
        });
    }
};

exports.traerUnidades = async(req, res) => {
    try {
        const Unidad = await db.unidad.findAll();
        res.status(200).send(Unidad);
    } catch (error) {
        res.status(500).send({
            message: "Ocurrio un error al traer las unidades"
        });        
    }
};

exports.editarUnidad = async(req, res) => {
    try {
        const id = req.params.id;
        const {nombre} = req.body;
        const Unidad = await db.unidad.findByPk(id);
        if (!Unidad) {
            return res.status(404).send({
                message: "Unidad no encontrada."
            });
        }
        Unidad.nombre = nombre || Unidad.nombre;
        await Unidad.save();
        res.status(200).send(Unidad);
    } catch (error) {
        console.log("Error al editar.", error);
        res.status(500).send ({
            message: "Error al editar responsable"
        });
    }
};

exports.eliminarUnidad = async(req, res) => {
    try {
        const id = req.params.id;
        const Unidad = await db.unidad.findByPk(id);

        if (!Unidad) {
            return res.status(404).send ({
                message: "Unidad no encontrada."
            });
        }
        await Unidad.destroy();
        res.status(200).send({
            message: "Unidad eliminada correctamente."
        });
    } catch (error) {
        res.status(500).send({
            message: "Error al eliminar la Unidad."
        });
    }
};
