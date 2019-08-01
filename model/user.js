const Sequelize = require('Sequelize');

const sequelize = require('../config/database');

class User extends Sequelize.Model { }
User.init(
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    entries: {
      type: Sequelize.INTEGER,
      // default: '0',
      allowNull: true
    }
  },
  { sequelize }
);

module.exports = User;