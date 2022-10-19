"use strict";
const path = require("path");
const Hapi = require("hapi");
const HapiAuthCookie = require("hapi-auth-cookie");
require("./src/bull-utils/index");
require("./src/configs/elasticsearch");

const Auth = require("./src/routes/auth");
const Movie = require("./src/routes/movie");

const Users = require("./src/models/user.model");
const Sessions = require("./src/models/session.model");
const Movies = require("./src/models/movie.model");

const server = new Hapi.Server({
  connections: {
    routes: {
      files: {
        relativeTo: path.join(__dirname, "public"),
      },
    },
  },
});

server.connection({
  port: 8080,
  host: "localhost",
  routes: {
    cors: true,
  },
});

server.register(require("hapi-auth-cookie"), (err) => {
  if (err) {
    throw err;
  }

  server.auth.strategy("session", "cookie", true, {
    ttl: 3 * 24 * 60 * 60 * 1000,
    password: "password-should-be-32-characters",
    cookie: "sessionId",
    redirectTo: "/",
    isSecure: false,
    validateFunc: async function (req, session, callback) {
      const account = await Sessions.findOne({
        where: {
          id: session.sId,
        },
        include: Users,
      });

      if (!account) {
        return callback(err, false);
      }
      req.userId = session.userId;
      return callback(null, true);
    },
  });
  server.route([...Movie, ...Auth]);

  server.start((err) => {
    if (err) {
      throw err;
    }
    console.log(`Server running at: ${server.info.uri}`);
  });
});

server.state("session", {
  ttl: 3 * 24 * 60 * 60 * 1000,
  isSecure: true,
  isHttpOnly: true,
  encoding: "base64json",
  clearInvalid: false,
  strictHeader: true,
});

// Relationship & Create table

const sequelize = require("./src/configs/db");

Users.hasMany(Sessions, { onDelete: "cascade" });
Sessions.belongsTo(Users);

Users.hasMany(Movies, { onDelete: "cascade" });
Movies.belongsTo(Users);

sequelize
  .sync({ alter: true })
  .then((response) => {})
  .catch((err) => {
    console.log(err);
  });
