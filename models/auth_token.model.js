module.exports = (sequelize, Sequelize) => {
    const AuthToken = sequelize.define("auth_tokens", {
        token: {
            type: Sequelize.STRING,
            unique: true
        },
        userId: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    });
    return AuthToken;
};