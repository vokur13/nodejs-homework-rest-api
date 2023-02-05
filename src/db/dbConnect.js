// getting-started.js
const mongoose = require('mongoose');
// mongoose.set('strictQuery', false);
mongoose.set('useCreateIndex', true);

// Connection URL
const URL = process.env.DB_HOST;

async function main() {
  mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

module.exports = {
  main,
};
