const db = require('../models')

exports.crarTipo = async (req, res) => {
    if (!req.body.nombre) {
        return res.status(400).send({ 
            message: "El contenido no puede estar vacio!" 
        });
    }

    const tipo = {
        nombre: req.body.nombre,
    };
    try{
        const nuevoTipo = await  db.tipo.create(tipo);
        res.status(201).send(nuevoTipo);
    }catch (error){
        res.status(500).send({
            message: error.message || "Ocurrio un error al crear tipo"
        })
    }
};

exports.traerTipos = async(req, res) => {
    try {
        const Tipos = await db.tipo.findAll();
        res.status(200).send(Tipos);
    } catch (error) {
        res.status(500).send({
            message: "Ocurrio un error al traer los tipos"
        });        
    }
};

exports.editarTipo = async(req, res) => {
    try {
        const id = req.params.id;
        const {nombre} = req.body;
        const Tipo = await db.tipo.findByPk(id);
        if (!Tipo) {
            return res.status(404).send({
                message: "Tipo no encontrado."
            });
        }
        Tipo.nombre = nombre || Tipo.nombre;
        await Tipo.save();
        res.status(200).send(Tipo);
    } catch (error) {
        console.log("error al editar tipo", error);
        res.status(500).send ({
            message: "Error al editar la tipo"
        });
    }
};

exports.eliminarTipo = async(req, res) => {
    try {
        const id = req.params.id;
        const Tipo = await db.tipo.findByPk(id);

        if (!Tipo) {
            return res.status(404).send ({
                message: "Tipo no encontrado."
            });
        }
        await Tipo.destroy();
        res.status(200).send({
            message: "Tipo eliminado correctamente."
        });
    } catch (error) {
        res.status(500).send({
            message: "Error al eliminar tipo."
        });
    }
};
