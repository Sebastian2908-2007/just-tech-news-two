// import sequelize constructo from the library
const Sequelize = require('sequelize');
require('dotenv').config();

// create connection to our database, pass in your MySQL information for use
const sequelize = new Sequelize(process.env.database,process.env.user,process.env.password,{
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
});

module.exports = sequelize;
