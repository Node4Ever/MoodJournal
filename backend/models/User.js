const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {tableName: 'users', underscored: true});

    // Add the foreign key.
    User.associate = function ({AuthToken}) {
        User.hasMany(AuthToken);
    };

    User.prototype.logout = async function (token) {
        // destroy the auth token record that matches the passed token
        sequelize.models.AuthToken.destroy({ where: { token } });
    };

  return User;
};
