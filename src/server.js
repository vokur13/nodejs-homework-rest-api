const app = require('./app');
const { main } = require('./db/dbConnect');

const PORT = process.env.PORT || 3000;

main()
  .then(() => console.log('Database connection successful'))
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(`Server not running. Error message: ${err.message}`);
    process.exit(1);
  });
