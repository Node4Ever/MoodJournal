const { User } = require('../models');

exports.register = (request, response, next) => {
    const hash = User.generateHash(request.body.password);

    // create a new user with the password hash from bcrypt
    User.create({
        email: request.body.email,
        password: hash,
    })
        .then(user => {
            response.json({user, success: true});
        })
        .catch(next);
};

exports.login = async (request, response, next) => {
    try {
        const user = await User.authenticate(request.body.email, request.body.password);
        user.success = true;

        response.json(user);
    } catch (error) {
        return response.status(401).send({
            success: false,
            error: error
        });
    }
};

exports.logout = async (request, response, next) => {
    const authHeader = request.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    console.log('Logging out: ' + token);

    try {
        console.log(request.user);
        response.json({
            status: true
        });
    } catch (error) {
        response.status(400).json({
            status: false,
            error
        });
    }
};
