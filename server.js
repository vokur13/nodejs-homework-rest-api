const app = require('./app');

// const PORT = 3000;
const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Server running. Use our API on port: ${PORT}`);
});
