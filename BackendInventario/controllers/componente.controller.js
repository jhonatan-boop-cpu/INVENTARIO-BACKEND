const db = require('../models')
const {generarCodigo} = require ('../utils/codigo.utils');



exports.crearComponente = async (req, res ) =>{
    if (!req.body.nombre || !req.body.descripcion || !req.body.modelo || !req.body.marca || !req.body.cantidad || !req.body.claseId || !req.body.tipoId){
        return res.status(400).send({
            message: "El contenido no puede estar vacio!"
        });
    }
    const codigoGenerado = await generarCodigo(req.body.nombre);
    const nuevoComponente = await db.componente.create({
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            modelo: req.body.modelo,
            marca: req.body.marca,
            cantidad: req.body.cantidad,
            codigo: codigoGenerado, 
            claseId: req.body.claseId,
            tipoId: req.body.tipoId
    });
        //res.status(201).send(nuevoComponente);

    const traerClaseTipo = await db.componente.findByPk(nuevoComponente.id,{
        attributes: ['nombre', 'descripcion', 'modelo', 'marca', 'cantidad', 'codigo'],
        include:[
            {
                model: db.clase,
                as : 'clase',
                attributes: ['nombre']
            },
            {
                model: db.tipo,
                as : 'tipo',
                attributes: ['nombre']
            }
        ]
    });
    try{
        //const nuevoComponente = await db.componente.create(Componente);
        res.status(201).send(traerClaseTipo);
        
    }catch (error){
        console.log('Error al crear componente:', error);
        res.status(500).send({
            message: error.message || "Ocurrio un error al crear componente."
        })
    }
};

//Traer todos los componentes 
exports.traerComponentes = async (req, res) => {
    try {
        const Componente = await db.componente.findAll();
        res.status(200).send(Componente);
    } catch (error) {
        res.status(500).send({
            message: error.message || "Ocurrio un error al traer componentes"
        });
    }
};

//Editar componente
exports.editarComponente = async (req, res) => {
    try {
        const id = req.params.id;
        const {nombre, descripcion, modelo, marca, cantidad, claseId, tipoId} = req.body;
        const Componente = await db.componente.findByPk(id);
        if (!Componente) {
            return res.status(404).send({
                message: "Componente no encontrado"
            });
        }
        Componente.nombre = nombre || Componente.nombre;
        Componente.descripcion = descripcion || Componente.descripcion;
        Componente.modelo = modelo || Componente.modelo;
        Componente.marca = marca || Componente.marca;
        Componente.cantidad = cantidad || Componente.cantidad;
        Componente.claseId = claseId || Componente.claseId;
        Componente.tipoId = tipoId || Componente.tipoId;
        await Componente.save();
        res.status(200).send(Componente);
    } catch (error) {
        console.log('error al editar.', error);
        res.status(500).send ({
            message: "Ocurrio un error al editar componente"
        });
        
    }
};

//Eliminar componente 
exports.eliminarComponente = async (req, res) => {
    try {
        const id = req.params.id;
        const Componente = await db.componente.findByPk(id);
        if (!Componente) {
            return res.status(404).send({
                message: "Componente no encontrado."
            });
        } 
        await Componente.destroy();
        res.status(200).send({
            message: "Componente eliminado correctamente."
        });
    } catch (error) {
        res.status(500).send({
            message: "Ocurrio un error al eliminar componente."
        });
    }
};




