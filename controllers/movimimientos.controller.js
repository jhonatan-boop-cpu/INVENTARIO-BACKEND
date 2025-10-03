const db = require('../models')

//REGISTRAR ENTRADA
exports.registrarEntrada = async (req, res) =>{
    try{
        if(!req.body.componenteId || !req.body.nombre || !req.body.cantidad){
            return res.status(400).send({
                message: "Faltan campos por llenar!"
            });
        }

//buscar componente (stock)
        const componente = await db.componente.findByPk(req.body.componenteId);
        if (!componente) {  
            return res.status(404).send({
                message: "Componente no encontrado."
            });
        }
//actualizar stock (sumar)
        componente.cantidad = (componente.cantidad || 0) + Number(req.body.cantidad);  //
        await componente.save();
        
//    
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

        if(!req.body.componenteId || !req.body.cantidad || !req.body.codigo || !req.body.tipodeorden|| !req.body.responsableId || !req.body.unidadId){
            return res.status(400).send({
                message: "Faltan campos por llenar!"
            });
        }

//buscar componente (stock)
        const componente = await db.componente.findByPk(req.body.componenteId);
        if (!componente) {  
            return res.status(404).send({message: "Componente no encontrado."});
        }

//Validar stock     
        if (Number(req.body.cantidad) > componente.cantidad) {
            return res.status(400).send({
                message: "No hay suficiente stock para realizar la salida."
            });
        }

//actualizar stock (restar)
        componente.cantidad = componente.cantidad - Number(req.body.cantidad);
        await componente.save();
    
//
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
//funcion para aumentar el stck en componente
        //buscar componente
        const componente = await db.componente.findByPk(componenteId);
        if (!componente) {
            return res.status(404).send({
                message: "Componente no encontrado."
            });
        }
        //calcular la diferencia 
        const cantidadAnterior = Entrada.cantidad;
        const nuevaCantidad = Number(cantidad);
        const diferencia = nuevaCantidad - cantidadAnterior;
        //actualizar stock
        componente.cantidad = (componente.cantidad || 0) + diferencia;
        await componente.save();
///-------------
        Entrada.cantidad = nuevaCantidad;
        Entrada.componenteId = componenteId || Entrada.componenteId;
        Entrada.nombre = nombre || Entrada.nombre;
        //Entrada.cantidad = cantidad || Entrada.cantidad;
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
//FUNCION PARA AUMENTAR O RESTAR EL STOCK DEL COMPONENTE
        //buscar componente
        const componente = await db.componente.findByPk(componenteId);
        if (!componente) {
            return res.status(404).send({
                message: "Componente no encontrado."
            });
        }
        //calcular diferencia 
        const cantidadAnterior = Salida.cantidad;
        const nuevaCantidad = Number(cantidad);
        const diferencia = nuevaCantidad - cantidadAnterior;
        //validar el stock si la diferencia es mayor 
        if (diferencia > 0 && diferencia > componente.cantidad) {
            return res.status(400).send({
                message: "No hay suficiente stock para realizar la salida."
            });
        }
        //salida resta stock => se aplica con signo inverso 
        componente.cantidad = componente.cantidad - diferencia;
        await componente.save();
//----------------
        
        Salida.cantidad = nuevaCantidad;
        Salida.componenteId = componenteId || Salida.componenteId;
        //Salida.cantidad = cantidad || Salida.cantidad;
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

//DETALLE DE ENTRADA
exports.obtenerEntrada = async (req, res) => {
    try {
        const id = req.params.id;
        const entrada = await db.entrada.findByPk(id, {
            attributes: ["id", "componenteId", "nombre", "cantidad", "motivo"],
            include: [
                { model: db.componente, as: "componente", attributes: ["id", "nombre"]},
            ]
            });

        if (!entrada) {
        return res.status(404).send({ message: "Registro de entrada no encontrado" });
        }

        res.send(entrada);
    } catch (error) {
        res.status(500).send({ message: "Error al obtener registro de entrada" });
    }
};

//DETALLE DE SALIDA
exports.obtenerSalida = async (req, res) => {
    try {
        const id = req.params.id;
        const salida = await db.salida.findByPk(id, {
            attributes: ["id", "componenteId", "cantidad", "codigo", "motivo", "tipodeorden", "responsableId", "unidadId"],
            include: [
                { model: db.componente, as: "componente", attributes: ["nombre"]},
                { model: db.responsable, as: "responsable", attributes: ["nombre"]},
                { model: db.unidad, as: "unidad", attributes: ["nombre"]}
            ]
            });

        if (!salida) {
        return res.status(404).send({ message: "Registro de salida no encontrado" });
        }

        res.send(salida);
    } catch (error) {
        res.status(500).send({ message: "Error al obtener registro de salida" });
    }
};