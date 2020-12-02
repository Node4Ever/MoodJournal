const validator = require('../services/validator');

const validationCB = function (validationRules, request, response, next) {
    validator(request.body, validationRules, {}, (err, status) => {
        if (!status) {
            response.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    errors: err.errors
                });
        } else {
            next();
        }
    });
};

const register = (request, response, next) => {
    const validationRules = {
        "email": "required|email|min:5",
        "password": "required|string|min:6|confirmed"
    };

    validationCB(validationRules, request, response, next);
}

const login = (request, response, next) => {
    const validationRules = {
        "email": "required|email",
        "password": "required|string"
    };

    validationCB(validationRules, request, response, next);
};

module.exports = {
    register,
    login,
};
