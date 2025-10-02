module.exports = (sequelize, Sequelize) => {

    const Salida = sequelize.define("salida", {
        componenteId:{
            type: Sequelize.INTEGER
        },
        cantidad: {
            type: Sequelize.STRING
        },
        codigo: {
            type: Sequelize.STRING
        },
        motivo: {
            type: Sequelize.STRING
        },
        tipodeorden: {
            type: Sequelize.STRING
        },
        responsableId: {
            type: Sequelize.INTEGER
        },
        unidadId: {
            type: Sequelize.INTEGER
        }
        
    });
    return Salida;
}