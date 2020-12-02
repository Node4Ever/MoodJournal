const express = require('express');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const db = require("./models");

// @todo: Store JWT in httpOnly + Secure cookies.
const cookieParser = require('cookie-parser');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());

// Serve static files from the React app
app.use(express.static(path.join(__dirname + '/../', 'frontend/build')));

// Load Express Controllers
const validation = require('./middleware/validation');
// Use our own JWT setup.
const myJWT = require('./middleware/myJWT');
const journalController = require('./controllers/Journal');
const userController = require('./controllers/User');

// Configuration sanity checks:
if (!process.env.JWT_SECRET || process.env.JWT_SECRET === 'CHANGE THIS RIGHT NOW!!!!') {
    throw new Error('You *must* change the JWT_SECRET in the .env/environment variable!');
} else if (process.env.JWT_SECRET.length < 15) {
    throw new Error('The JWT_SECRET *must* be at least 15 characters or more, for security reasons.');
}

// Put all API endpoints under '/api'
app.get('/api', (req, response) => {
    response.send('Hello World!')
});

// app.post('/api/auth/register', (request, response) => {
//     const user = db.user.create({
//         email: request.body.email,
//         password: request.body.password,
//     }).then(user => user.id);
//
//     return user;
// });

app.post('/api/auth/register', validation.register, userController.register);
app.post('/api/auth/login', validation.login, userController.login);


app.post('/api/auth/loginV1', validation.login, (request, response) => {
    response.cookie('jwtToken', 'cookieValue', {
        maxAge: 60 * 60 * 1000, // 1 hour
        httpOnly: true,
        // If it's not accessed via http://localhost/, require SSL-only cookies.
        secure: request.connection.remoteAddress !== '::ffff:127.0.0.1',
        sameSite: true,
    })
    response.send({
        hostname: request.connection.remoteAddress,
        status: 'success',
        email: 'example@example.org',
    })
});

app.get('/api/auth/token', (request, response) => {
    response.send({
        value: request.cookies.jwtToken
    });
});

// @todo: Create and email a password reset (JWT) token.
app.post('/api/auth/token/:email', (request, response) => {
});

// @todo: Update user account and/or reset password.
app.patch('/api/auth/user/:userId', (request, response) => {

});

// @todo: Refresh JWT Token
app.get('/api/auth/jwt', (request, response) => {

});

// AKA: Log out.
app.delete('/api/auth/login', myJWT.authenticate, userController.logout);

// @todo: Google SSO
app.patch('/api/auth/google', (req, res) => {

});

// Journal routes
// List all of the journal entries of the logged-in user.
app.get('/api/journal', myJWT.authenticate, journalController.list);


// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (request, response) => {
    response.sendFile(path.join(__dirname + '/../frontend/build/index.html'));
});

// Initialize the Sequelize ORM
db.init();

async function getAll(req, res) {
    const users = await db.User.findAll();
    //res.status(200).json(users);

    return users;
}

db.sequelize.sync({ force: false }).then(() => {
    // Ensure that the database is being listened to before we start listening for HTTP requests.
    app.listen(PORT, () => {
        console.log(`Example app listening at http://localhost:${PORT}`)
    });

    getAll().then(users => {
        console.log(users);
    });
});


