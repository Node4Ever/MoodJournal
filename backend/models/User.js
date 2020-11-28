// Import the encryption module
const bcrypt = require("bcrypt");
const { Sequelize } = require('sequelize');
const AuthToken = require('./AuthToken');

// class User extends Model {}

const User = (sequelize) => {
    const {INTEGER, STRING} = Sequelize;
    const model = sequelize.define('User', {
        id: {type: INTEGER, primaryKey: true, autoIncrement: true},
        email: {type: STRING, primaryKey: true, unique: true, allowNull: false},
        password: {type: STRING, allowNull: false},
        resetToken: {type: STRING, allowNull: true}
    }, {tableName: 'users', underscored: true});

    return model;
}

User.associate = function(models) {
  User.hasMany(models.AuthToken, {
    foreignKey: 'id',
    targetId: 'user_id',
    onDelete: 'CASCADE'
  });
};


module.exports = User;
