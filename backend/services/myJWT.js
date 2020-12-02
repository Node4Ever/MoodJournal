const jwt = require("jsonwebtoken");

const generate = async function(userId, email) {
    if (!userId) {
        throw new Error('AuthToken requires a user ID')
    }

    const token = jwt.sign({ sub: email }, process.env.JWT_SECRET, {
        expiresIn: parseInt(process.env.JWT_TTL) * 60
    });

    return {
        token: token,
        createdAt: (new Date()).toISOString()
    };
};

module.exports = {
    generate
};
