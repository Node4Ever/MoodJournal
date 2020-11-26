const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Serve static files from the React app
app.use(express.static(path.join(__dirname + '/../', 'frontend/build')));

// Put all API endpoints under '/api'
app.get('/api', (req, res) => {
  res.send('Hello World!')
});

app.post('/api/auth/register', (req, res) => {
});

app.post('/api/auth/login', (req, res) => {
});

app.get('/api/auth/token', (req, res) => {
});

app.post('/api/auth/token/:email', (req, res) => {
});

app.patch('/api/auth/user/:userId', (req, res) => {

});

// Refresh JWT Token
app.get('/api/auth/jwt', (req, res) => {

});

app.get('/api/auth/logout', (req, res) => {

});

// Google SSO
app.patch('/api/auth/google', (req, res) => {

});


// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/../frontend/build/index.html'));
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
});
