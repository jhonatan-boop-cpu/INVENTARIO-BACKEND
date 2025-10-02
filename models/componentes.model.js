module.exports = (sequelize, Sequelize) => {
    const Componente = sequelize.define("componente", {
        nombre: {
            type: Sequelize.STRING
        },
        descripcion: {
            type: Sequelize.STRING
        },
        modelo: {
            type: Sequelize.STRING
        },
        marca: {
            type: Sequelize.STRING
        },
        cantidad: {
            type: Sequelize.INTEGER
        },
        codigo: {
            type: Sequelize.STRING,
            unique: true
        },
        claseId: {
            type: Sequelize.INTEGER,
            allowNull: false 
        },
        tipoId: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
        
    });
    return Componente;
}