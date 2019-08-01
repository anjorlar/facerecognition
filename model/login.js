const Sequelize = require('Sequelize');

const sequelize = require('../config/database');

class Login extends Sequelize.Model { }
Login.init({
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  hash: {
    type: Sequelize.STRING,
    allowNull: false
  }
},
  { sequelize }
);

module.exports = Login;