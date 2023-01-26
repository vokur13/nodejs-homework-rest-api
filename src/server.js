const app = require('./app');
const { main } = require('./db/connect');
// const { MongoClient } = require('mongodb');

const PORT = process.env.PORT || 3000;

// Connection URL
// const url = process.env.DB_HOST;
// const client = new MongoClient(url);

// Database Name
// const dbName = 'db-contacts';

async function start() {
  try {
    await main().catch((err) => console.log(err));
    // await client.connect();
    console.log('Database connection successful');
    // const db = client.db(dbName);
    // const collection = db.collection('contacts');

    // const findResult = await collection.find({}).toArray();
    // console.log('Found documents =>', findResult);

    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
}

start();
