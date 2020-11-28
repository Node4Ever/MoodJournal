// Import the encryption module
const bcrypt = require("bcrypt-nodejs");

const { Sequelize, Model, DataTypes } = require('sequelize');

// class User extends Model {}

const User = (sequelize) => {
    const {INTEGER, STRING, FLOAT, BOOLEAN, DATE} = Sequelize;
    const User = sequelize.define('user', {
        id: {type: INTEGER, primaryKey: true, autoIncrement: true},
        email: {type: STRING, primaryKey: true, allowNull: false},
        password: STRING,
        resetToken: {type: STRING, allowNull: true}
    });

    return User;
}

module.exports = User;
