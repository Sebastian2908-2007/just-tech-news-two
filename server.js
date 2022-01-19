const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// turn on the routes
app.use(routes);

// turn on connection to the db and the server
// change {force: true} to drop tables at every restart
sequelize.sync({force: false}).then(() => {
  app.listen(PORT, () => console.log(`now listening on port ${PORT}`));
});