const Sequelize = require("sequelize");
const sequelize = require("../configs/db");
const bcrypt = require("bcryptjs");

const userModel = sequelize.define(
  "user",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    isLoggedIn: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    }
  }
);
// userModel.addHook("afterValidate", function(user){
//   user.password = bcrypt.hashSync(user.password, 8);
// })

module.exports = userModel;
