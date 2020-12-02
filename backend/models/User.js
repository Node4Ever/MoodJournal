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

    User.authenticate = async function (email, password) {
        const user = await User.findOne({where: {email}});

        if (bcrypt.compareSync(password, user.password)) {
            return user.authorize();
        }

        throw new Error('invalid password');
    }

    User.prototype.authorize = async function () {
        const {AuthToken} = sequelize.models;
        const user = this;

        // create a new auth token associated to 'this' user
        // by calling the AuthToken class method we created earlier
        // and passing it the user id
        const authToken = await AuthToken.generate(this.id, this.email);
        await user.addAuthToken(authToken);

        return {user, authToken}
    };

    User.prototype.logout = async function (token) {
        // destroy the auth token record that matches the passed token
        sequelize.models.AuthToken.destroy({ where: { token } });
    };

    User.generateHash = function (password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
    };


    return User;
};
