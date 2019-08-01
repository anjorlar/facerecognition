const Sequelize = require('sequelize');

const sequelize = new Sequelize("smart-brain", "root", process.env.MYSQL_PASSWORD, {
  host: "localhost",
  dialect: "mysql"
});

module.exports = sequelize;


