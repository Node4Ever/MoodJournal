const jwt = require("jsonwebtoken");

const authenticate = (request, response, next) => {
    // Gather the jwt access token from the request header
    const authHeader = request.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null)
    {
        return response.sendStatus(401);
    }

    jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
        console.log(error);
        if (error) {
            return response.status(403).json({
                status: false,
                error
            });
        }
        request.user = user;
        next();
    });
};

module.exports = {
    authenticate
};
