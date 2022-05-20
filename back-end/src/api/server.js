const app = require('./app');
require('dotenv').config();

const PORT = process.env.API_PORT;

app.listen(PORT, () => console.log(`conectado à porta ${PORT}`));
