const dbConfig = require('../config/db.config.js');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    dbConfig.BD, 
    dbConfig.USER, 
    dbConfig.PASSWORD, 
    { 
        host: dbConfig.HOST,
        dialect: dbConfig.DIALECT,
        logging: false,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;



//Modelos (tablas)
db.usuario = require('./usuario.model.js')(sequelize, Sequelize);
db.auth_tokens = require('./auth_token.model.js')(sequelize, Sequelize);

db.componente = require("./componentes.model.js")(sequelize, Sequelize);
db.clase = require("./clase.model.js")(sequelize, Sequelize);
db.tipo = require("./tipo.model.js")(sequelize, Sequelize);
db.movimiento = require("./movimiento.model.js")(sequelize, Sequelize);
db.salida = require("./salida.model.js")(sequelize,Sequelize);
db.entrada = require("./entrada.model.js")(sequelize,Sequelize);
db.unidad = require("./unidad.model.js")(sequelize, Sequelize);
db.responsable = require("./responsable.model.js")(sequelize, Sequelize);


//Relaciones entre tablas
db.auth_tokens.belongsTo(db.usuario, { foreignKey: 'userId', as: 'usuario' });
db.usuario.hasMany(db.auth_tokens, { foreignKey: 'userId', as: 'token' });

db.clase.hasMany(db.tipo, {as: "tipo", foreignKey: "claseId"});
db.tipo.belongsTo(db.clase, {foreignKey: "claseId",as: "clase",});

db.clase.hasMany(db.componente, {as: "componente", foreignKey: "claseId"});
db.componente.belongsTo(db.clase, {foreignKey: "claseId",as: "clase",});

db.tipo.hasMany(db.componente, {as: "componente", foreignKey: "tipoId"});
db.componente.belongsTo(db.tipo, {foreignKey: "tipoId",as: "tipo",});

db.componente.hasMany(db.movimiento, {as: "movimiento", foreignKey: "componenteId"});    ///
db.movimiento.belongsTo(db.componente, {foreignKey: "componenteId",as: "componente",});   ///

db.movimiento.belongsTo(db.entrada, { foreignKey: "entradaId", as: "entrada" });
db.entrada.hasOne(db.movimiento, { foreignKey: "entradaId", as: "movimiento" });

db.movimiento.belongsTo(db.salida, { foreignKey: "salidaId", as: "salida" });
db.salida.hasOne(db.movimiento, { foreignKey: "salidaId", as: "movimiento" });

db.responsable.hasMany(db.salida, {as: "salida", foreignKey: "responsableId"});
db.salida.belongsTo(db.responsable, {foreignKey: "responsableId",as: "responsable",});

db.unidad.hasMany(db.salida, {as: "salida", foreignKey: "unidadId"});
db.salida.belongsTo(db.unidad, {foreignKey: "unidadId",as: "unidad",});

db.componente.hasMany(db.entrada, {as: "entrada", foreignKey: "componenteId"});
db.entrada.belongsTo(db.componente, {foreignKey: "componenteId", as: "componente"});

db.componente.hasMany(db.salida, {as: "salida", foreignKey: "componenteId"});
db.salida.belongsTo(db.componente, {foreignKey: "componenteId", as: "componente"});

module.exports = db;

//  hasOne ===>1 a 1 
//  belongsTo ===> 1 a 1 inverso
//  hasMany ===> 1 a muchos
//  belongsToMany ===> muchos a muchos

//  foreignKey ===> clave foranea
//  as ===> alias

//  sourceKey ===> clave primaria
//  onDelete ===> accion al eliminar
//  onUpdate ===> accion al actualizar