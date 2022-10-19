const { createClient } = require("redis");

const client = createClient();

client.on("error", (err) => {
  console.log("redis client error: ", err);
});

module.exports = client;
