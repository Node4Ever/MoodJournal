const validator = require('../services/validator');

const register = (req, res, next) => {
    const validationRule = {
        "email": "required|email|min:5",
        "password": "required|string|min:6|confirmed"
    }
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    });
}

module.exports = {
    register
}
