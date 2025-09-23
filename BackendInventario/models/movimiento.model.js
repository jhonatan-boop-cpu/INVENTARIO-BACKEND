module.exports = (sequelize, Sequelize) => {
    const Movimiento = sequelize.define("movimiento", {
        entradaId: {
            type: Sequelize.INTEGER
        },
        salidaId: {
            type: Sequelize.INTEGER
        },
        
    });
    return Movimiento;
}