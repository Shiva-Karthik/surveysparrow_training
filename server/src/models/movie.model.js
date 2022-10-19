const Sequelize = require("sequelize");
const sequelize = require("../configs/db");

const Movie = sequelize.define("movie", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  movieName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  year: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  imdb: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  image_url: {
    type: Sequelize.STRING,
    allowNull: false,
  }
});

module.exports = Movie;