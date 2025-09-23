module.exports = (sequelize, Sequelize) => {
    const Responsable = sequelize.define("responsable", {
        nombre: {
            type: Sequelize.STRING
        },
        
    });
    return Responsable;
}