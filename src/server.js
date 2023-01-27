const app = require('./app');
const { main } = require('./db/connect');

const PORT = process.env.PORT || 3000;

async function start() {
  try {
    await main().catch((err) => console.log(err));
    console.log('Database connection successful');

    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
}

start();
