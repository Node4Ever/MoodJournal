const jwt = require('jsonwebtoken');

module.exports = (sequelize, DataTypes) => {

    const AuthToken = sequelize.define('AuthToken', {
        token: { type: DataTypes.STRING, allowNull: false }
    }, {tableName: 'auth_tokens', underscored: true});

    // set up the associations so we can make queries that include
    // the related objects
    AuthToken.associate = function({ User }) {
        AuthToken.belongsTo(User, { onDelete: 'cascade' });
    };

    // generates a random 15 character token and
    // associates it with a user
    AuthToken.generate = async function(userId, email) {
        if (!userId) {
            throw new Error('AuthToken requires a user ID')
        }

        const token = jwt.sign({ sub: email }, process.env.JWT_SECRET, {
            expiresIn: parseInt(process.env.JWT_TTL) * 60
        });

        AuthToken.create({ token, userId });

        return {
            token: token,
            createdAt: (new Date()).toISOString()
        };
    }

    return AuthToken;
};
