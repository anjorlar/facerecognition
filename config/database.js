const Sequelize = require('sequelize');

const sequelize = new Sequelize("smartbrain", "root", process.env.MYSQL_PASSWORD, {
  host: "localhost",
  dialect: "mysql"
});

module.exports = sequelize;


