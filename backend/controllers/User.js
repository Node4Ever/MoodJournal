const User = require('../models').User;

exports.register = (request, response, next) => {
    const hash = User.generateHash(request.body.password);

    // create a new user with the password hash from bcrypt
    User.create({
        email: request.body.email,
        password: hash,
    })
        .then(user => response.json(user))
        .catch(next);
};

exports.login = async (request, response, next) => {
    try {
        const user = await User.authenticate(request.body.email, request.body.password);

        response.json(user);
    } catch (error) {
        return response.status(401).send({
            success: false,
            error: error
        });
    }
};
