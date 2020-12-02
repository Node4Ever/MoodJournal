const bcrypt = require('bcrypt');
const myJWT = require('../services/myJWT');

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

    // Add the foreign key(s).
    User.associate = function ({JournalEntry}) {
        User.hasMany(JournalEntry);
    };

    User.prototype.toJSON = function () {
        var values = Object.assign({}, this.get());

        delete values.password;
        return values;
    };

    User.authenticate = async function (email, password) {
        const user = await User.findOne({where: {email}});

        if (bcrypt.compareSync(password, user.password)) {
            return user.authorize();
        }

        throw new Error('invalid password');
    }

    User.prototype.authorize = async function () {
        const user = this;

        const authToken = await myJWT.generate(this.id, this.email);

        return {user, authToken}
    };


    User.generateHash = function (password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
    };

    return User;
};
