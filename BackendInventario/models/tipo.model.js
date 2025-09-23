module.exports = (sequelize, Sequelize) => {
    const Tipo = sequelize.define("tipo", {
        nombre: {
            type: Sequelize.STRING
        },
        //falta clase id
    });
    return Tipo;
}