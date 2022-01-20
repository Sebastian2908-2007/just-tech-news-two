// import sequelize constructo from the library
const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

if(process.env.JAWSDB_URL) {
    sequelize = new Sequelize(process.env.JAWSDB_URL);
}else{ 

// create connection to our database, pass in your MySQL information for use
 sequelize = new Sequelize(process.env.database,process.env.user,process.env.password,{
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
});
}

module.exports = sequelize;
