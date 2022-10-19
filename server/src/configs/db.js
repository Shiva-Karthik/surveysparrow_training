const Sequelize = require("sequelize");

const sequelize = new Sequelize("movie_db", "surveysparrow", "SS741852963", {
  host: "localhost",
  dialect: "postgres",
});

module.exports = sequelize;