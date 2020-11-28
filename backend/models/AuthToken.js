// Import the encryption module
const bcrypt = require("bcrypt");

const { Sequelize } = require('sequelize');

// class User extends Model {}

const AuthToken = (sequelize) => {
    const {STRING, INTEGER} = Sequelize;
    const model = sequelize.define('AuthToken', {
        token: {type: STRING},
        userId: {type: INTEGER, field: 'user_id'}
    }, {tableName: 'auth_tokens', underscored: true});

    return model;
};

// AuthToken.associate = function(models) {
//     AuthToken.belongsTo(models.User);
// };


// generates a random 15 character token and
// associates it with a user
// From https://medium.com/@jgrisafe/custom-user-authentication-with-express-sequelize-and-bcrypt-667c4c0edef5z
AuthToken.generate = async function(UserId) {
    if (!UserId) {
        throw new Error('AuthToken requires a user ID')
    }

    let token = '';

    const possibleCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
        'abcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < 15; i++) {
        token += possibleCharacters.charAt(
            Math.floor(Math.random() * possibleCharacters.length)
        );
    }

    return AuthToken.create({ token, UserId })
}

AuthToken.associate = (models) => {
  AuthToken.belongsTo(models.User, {
    foreignKey: 'user_id',
    targetKey: 'id',
    onDelete: 'CASCADE'
  });
};

module.exports = AuthToken;
