module.exports = (sequelize, Sequelize) => {
    const Tipo = sequelize.define("tipo", {
        nombre: {
            type: Sequelize.STRING
        },
        claseId: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    });
    return Tipo;
}