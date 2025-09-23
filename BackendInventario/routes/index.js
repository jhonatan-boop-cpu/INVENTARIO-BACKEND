module.exports = (app) => {
    console.log("entrando a rutas");

    require('./usuarios.routes')(app);
    require('./componentes.routes')(app);
    require('./clase.routes')(app);
    require('./tipo.routes')(app);
    require('./movimiento.routes')(app);
    require('./unidad.routes')(app);
    require('./responsable.routes')(app);
};       
