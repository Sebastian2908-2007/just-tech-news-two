const {Model,DataTypes} = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

// create user model
class User extends Model {}

// define table columns and configuration
User.init(
    {
        // define an id column
      id: {
          // use the special Sequuelize DataTypes object provide what type of data it is
          type: DataTypes.INTEGER,
          // this is the equivilent  of SQL's `NOT  NULL` option
          allowNull: false,
          // indtruct that this os the primary Key
          primaryKey: true,
          // turn on auto increment
          autoIncrement: true 
      },
      // define username column
      username: {
        type: DataTypes.STRING,
        allowNull: false
      },
      // define an email column
      email: {
          type: DataTypes.STRING,
          allowNull: false,
          // there cannot be any duplicate email values in this table
          unique: true,
          // allowNull is set to false, we can run our data through a validator before creating
          validate: {
               isEmail: true 
           }         
      },
      // define password column
      password: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
              // this means the password must be at  least four characters long
              len: [4]
          }
      }
    },
    {
        // hook for hashing passwords with bcrypt
        hooks: {
            // set up beforeCreate llifecycle "hook" functionality
           async beforeCreate(newUserData) {
                newUserData.password = await bcrypt.hash(newUserData.password,10);
                return newUserData;
            },
            async beforeUpdate(updatedUserData) {
                updatedUserData.password = await bcrypt.hash(updatedUserData.password,10);
                return updatedUserData; 
            }
        },
        // TABLE CONFIGURATION OPTIONS GO HERE (https://sequelize.org/v5/manual/models-definition.html#configuration))

        // pass in our imported sequelize connection (the direct connection to our database)
        sequelize,
        // don't automatically create createdAt/updatedAt timestamp fields
        timestamps: false,
        // don't pluralize name of database table
        freezeTableName: true,
        // use underscores instead of camel-casing (i.e. `comment_text` and not `commentText`)
         underscored: true,
        // make it so our model name stays lowercase in the database
        modelName: 'user' 
    }
);

module.exports = User;