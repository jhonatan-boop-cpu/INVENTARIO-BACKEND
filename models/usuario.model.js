module.exports = (sequelize, Sequelize) => {
    const Usuario = sequelize.define("usuario", {
        nombre: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING,
            unique: true
        },
        password: {
            type: Sequelize.STRING
        },
        rol: {
            type: Sequelize.ENUM('ADMIN','USER'),
        }
    });
    return Usuario;
}
