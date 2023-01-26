// getting-started.js
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

// Connection URL
const url = process.env.DB_HOST;

async function main() {
  mongoose.connect(url);
}

module.exports = {
  main,
};
