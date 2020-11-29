const User = require('../models').User;

exports.register = (request, response, next) => {
    User.create({
        email: request.body.email,
        password: request.body.password,
    })
        .then(user => response.json(user))
        .catch(next);
};
