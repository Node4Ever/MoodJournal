const jwt = require("jsonwebtoken");

const generate = async function(userId, email) {
    if (!userId) {
        throw new Error('AuthToken requires a user ID')
    }

    const expiresIn = parseInt(process.env.JWT_TTL) * 60;
    const token = jwt.sign({ sub: email }, process.env.JWT_SECRET, {
        expiresIn: expiresIn
    });

    return {
        token: token,
        createdAt: (new Date()).toISOString(),
        expiresAt: (new Date(new Date().getTime() + expiresIn * 1000))
    };
};

module.exports = {
    generate
};
