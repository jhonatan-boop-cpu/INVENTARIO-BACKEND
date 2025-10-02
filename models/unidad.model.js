module.exports = (sequelize, Sequelize) => {
    const Unidad = sequelize.define("unidad", {
        nombre: {
            type: Sequelize.STRING
        },

    });
    return Unidad;
}