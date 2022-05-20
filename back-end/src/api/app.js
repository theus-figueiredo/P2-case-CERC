const express = require('express');
const registrationRoute = require('../routes/registrationRoute');

const app = express();

app.use(express.json());
app.use('/cadastro', registrationRoute)

module.exports = app;
