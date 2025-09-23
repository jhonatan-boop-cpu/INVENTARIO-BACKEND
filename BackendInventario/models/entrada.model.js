module.exports = (sequelize, Sequelize) => {
    
    const Entrada = sequelize.define("entrada", {
        componenteId:{
            type: Sequelize.INTEGER
        },
        nombre: {
            type: Sequelize.STRING
        },
        cantidad: {
            type: Sequelize.STRING
        },
        motivo: {
            type: Sequelize.STRING
        },
    
    });
    return Entrada;
}