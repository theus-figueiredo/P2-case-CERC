const express = require('express');
const registrationRoute = require('../routes/registrationRoute');
const loginRoute = require('../routes/loginRoute');
const updateRoute = require('../routes/updateRoute');
const cors = require('cors');

const corsOptions = {
  origin: 'http://localhost:3000',
  methods: ['POST', 'GET', 'PATCH'],
};

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use('/register', registrationRoute)
app.use('/login', loginRoute);
app.use('/users', updateRoute);

module.exports = app;
