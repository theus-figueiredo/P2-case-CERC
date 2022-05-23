const mongoose = require('mongoose');
require('dotenv').config();

const MONGO_DB_URL = `mongodb://${process.env.HOST || 'mongodb'}:27017/Publica`;

mongoose.connect(MONGO_DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('connected')).catch((err) => console.log(err.message));

const UserRegisters = mongoose.model('cadastros', new mongoose.Schema({
  email: String,
  name: String,
  password: String,
  phone: Number,
}));

module.exports = UserRegisters;
