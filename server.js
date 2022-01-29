const path = require('path');
const express = require('express');
// our api routes
const routes = require('./controllers');
// sequelize connection
const sequelize = require('./config/connection');
const app = express();
const PORT = process.env.PORT || 3001;
// my helper funtions
const helpers = require('./utils/helpers');
// require express handlebars
const exphbs = require('express-handlebars');
// activate handlebars and pass in our helper functions
const hbs = exphbs.create({ helpers });
// require dotenv for our session secret
require('dotenv').config();
// require express session
const session = require('express-session');
// require connect session sequelize
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// make the session
const sess = {
  secret: process.env.mySecret,
  cookie:{},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

// use our session with this middleware lets all routes know about the session
app.use(session(sess));
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