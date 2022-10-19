const Sequelize = require("sequelize");
const sequelize = require("../configs/db");

const Session = sequelize.define("session", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: true,
    primaryKey: true,
  },
  status: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Session;