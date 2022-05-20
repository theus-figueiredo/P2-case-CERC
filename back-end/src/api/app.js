const express = require('express');
const registrationRoute = require('../routes/registrationRoute');
const loginRoute = require('../routes/loginRoute');

const app = express();

app.use(express.json());
app.use('/cadastro', registrationRoute)
app.use('/login', loginRoute);

module.exports = app;
