const {
  registerUser,
  loginUser,
  isAuth,
  logoutUser,
} = require("../controllers/auth.controller");

module.exports = [
  {
    method: "POST",
    path: "/user/login",
    config: {
      handler: loginUser,
      auth: { mode: "try" },
      plugins: { "hapi-auth-cookie": { redirectTo: false } },
    },
  },

  {
    method: "POST",
    path: "/user/register",
    config: {
      auth: false,
    },
    handler: registerUser,
  },
  {
    method: "GET",
    path: "/user/isAuth",
    handler: isAuth,
  },
  {
    method: "GET",
    path: "/user/logout",
    handler: logoutUser,
  },
  {
    method: "GET",
    path: "/{param*}",
    config: {
      auth: false,
    },
    handler: function (request, reply) {
      reply(`
      <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Webpack</title>
            <link rel="stylesheet" href="./index.css" />
          </head>
          <body>
            <div id="root"></div>
          </body>
        </html>

        <script src="http://localhost:3000/bundle.js"></script>
      `);
    },
  }
];
