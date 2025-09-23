const db = require('../models')

//TRAER ID DE ENTRA Y SALIDA A MOVIMIENTO
//exports.llamarEntradaySalida = async (req, res) => {

//};


//REGISTRAR ENTRADA
exports.registrarEntrada = async (req, res) =>{
    try{
        if(!req.body.componenteId || !req.body.nombre || !req.body.cantidad || !req.body.motivo){
            return res.status(400).send({
                message: "El contenido no puede estar vacio!"
            });
        }
        const registrarEntrada = await db.entrada.create({
                componenteId: req.body.componenteId,
                nombre: req.body.nombre,
                cantidad: req.body.cantidad,
                motivo: req.body.motivo,
        });
        await db.movimiento.create({entradaId: registrarEntrada.id, 
            componenteId: registrarEntrada.componenteId});


        const traerComponentes = await db.entrada.findByPk(registrarEntrada.id,{
            attributes: ['id','nombre', 'cantidad', 'motivo'],
            include:[
                {
                    model: db.componente,
                    as : 'componente',
                    attributes: ['nombre']
                },
            ]
        });
            res.status(201).send(traerComponentes);
    }catch (error){
        console.log('Error al registrar.', error);
        res.status(500).send({
            message: error.message || "Ocurrio un error al registrar la entrada."
        })
    }
};

//REGISTRAR SALIDA
exports.registrarSalida = async (req, res) =>{
    try{

        if(!req.body.componenteId || !req.body.cantidad || !req.body.codigo || !req.body.motivo || !req.body.tipodeorden|| !req.body.responsableId || !req.body.unidadId){
            return res.status(400).send({
                message: "El contenido no puede estar vacio!"
            });
        }
        const registrarSalida = await db.salida.create({
                componenteId: req.body.componenteId,
                cantidad: req.body.cantidad,
                codigo: req.body.codigo,
                motivo: req.body.motivo,
                tipodeorden: req.body.tipodeorden,
                responsableId: req.body.responsableId,
                unidadId: req.body.unidadId,
        });
        await db.movimiento.create({salidaId: registrarSalida.id,
            componenteId: registrarSalida.componenteId
        });
        


        const traerElementos = await db.salida.findByPk(registrarSalida.id,{
            attributes: ['id','cantidad', 'codigo', 'motivo', 'tipodeorden'],
            include:[
                {
                    model: db.componente,
                    as : 'componente',
                    attributes: ['nombre']
                },
                {
                    model: db.responsable,
                    as : 'responsable',
                    attributes: ['nombre']
                },
                {
                    model: db.unidad,
                    as : 'unidad',
                    attributes: ['nombre']
                },
            ]
        });
            res.status(201).send(traerElementos);

        
    }catch (error){
        console.log('Error al registrar.', error);
        res.status(500).send({
            message: error.message || "Ocurrio un error al registrar la salida."
        })
    }
};

//EDITAR ENTRADA
exports.editarEntrada = async (req, res) => {
    try {
        const id = req.params.id;
        const {componenteId, nombre, cantidad, motivo} = req.body;
        const Entrada = await db.entrada.findByPk(id);
        if (!Entrada) {
            return res.status(404).send({
                message: "Registro de entrada no encontrado"
            });
        }
        Entrada.componenteId = componenteId || Entrada.componenteId;
        Entrada.nombre = nombre || Entrada.nombre;
        Entrada.cantidad = cantidad || Entrada.cantidad;
        Entrada.motivo = motivo || Entrada.motivo;
        await Entrada.save();
        res.status(200).send(Entrada);
    } catch (error) {
        console.log('error al editar.', error);
        res.status(500).send ({
            message: "Ocurrio un error al editar componente"
        });
        
    }
};

//EDITAR SALIDA
exports.editarSalida = async (req, res) => {
    try {
        const id = req.params.id;
        const {componenteId, cantidad, codigo, motivo, tipodeorden, responsableId, unidadId} = req.body;
        const Salida = await db.salida.findByPk(id);
        if (!Salida) {
            return res.status(404).send({
                message: "Registro de salida no encontrado"
            });
        }
        Salida.componenteId = componenteId || Salida.componenteId;
        Salida.cantidad = cantidad || Salida.cantidad;
        Salida.codigo = codigo || Salida.codigo;
        Salida.motivo = motivo || Salida.motivo;
        Salida.tipodeorden = tipodeorden || Salida.tipodeorden;
        Salida.responsableId = responsableId || Salida.responsableId;
        Salida.unidadId = unidadId || Salida.unidadId;

        await Salida.save();
        res.status(200).send(Salida);
    } catch (error) {
        console.log('error al editar.', error);
        res.status(500).send ({
            message: "Ocurrio un error al editar el registro de salida"
        });
        
    }
};  

//ELIMINAR ENTRADA
exports.eliminarEntrada = async (req, res) => {
    try {
        const id = req.params.id;
        const Entrada = await db.entrada.findByPk(id);
        if (!Entrada) {
            return res.status(404).send({
                message: "Registro de entrada no encontrado."
            });
        } 
        await Entrada.destroy();
        res.status(200).send({
            message: "Registro de entrada eliminado correctamente."
        });
    } catch (error) {
        res.status(500).send({
            message: "Ocurrio un error al eliminar registro de entrada."
        });
    }
};

//ELIMINAR SALIDA
exports.eliminarSalida = async (req, res) => {
    try {
        const id = req.params.id;
        const Salida = await db.salida.findByPk(id);
        if (!Salida) {
            return res.status(404).send({
                message: "Registro de salida no encontrado."
            });
        } 
        await Salida.destroy();
        res.status(200).send({
            message: "Registro de salida eliminado correctamente."
        });
    } catch (error) {
        res.status(500).send({
            message: "Ocurrio un error al eliminar registro de salida."
        });
    }
};


//TRAER TODOS LOS REGISTROS DE ENTRADA 
exports.traerEntradas = async (req, res) => {
    try {
        const Entrada = await db.entrada.findAll();
        res.status(200).send(Entrada);
    } catch (error) {
        res.status(500).send({
            message: error.message || "Ocurrio un error al traer los registros de entrada"
        });
    }
};
//TRAER TODOS LOS REGISTROS DE SALIDA    
exports.traerSalidas = async (req, res) => {
    try {
        const Salida = await db.salida.findAll();
        res.status(200).send(Salida);
    } catch (error) {
        res.status(500).send({
            message: error.message || "Ocurrio un error al traer los registros de salida"
        });
    }
};
