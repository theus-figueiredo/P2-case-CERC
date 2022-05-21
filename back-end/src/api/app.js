const express = require('express');
const registrationRoute = require('../routes/registrationRoute');
const loginRoute = require('../routes/loginRoute');
const cors = require('cors');

const corsOptions = {
  origin: 'http://localhost:3000',
  methods: ['POST', 'GET'],
};

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use('/cadastro', registrationRoute)
app.use('/login', loginRoute);

module.exports = app;
