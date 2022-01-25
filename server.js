const path = require('path');
const express = require('express');
// our api routes
const routes = require('./controllers');
// sequelize connection
const sequelize = require('./config/connection');
const app = express();
const PORT = process.env.PORT || 3001;
// require express handlebars
const exphbs = require('express-handlebars');
// activate handlebars
const hbs = exphbs.create({});
// set handlebars as our templ;ate engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// serve up our public directory static files "style.css"
app.use(express.static(path.join(__dirname, 'public')));
// turn on the routes
app.use(routes);


// turn on connection to the db and the server
// change {force: true} to drop tables at every restart
sequelize.sync({force: false}).then(() => {
  app.listen(PORT, () => console.log(`now listening on port ${PORT}`));
});