const { Client } = require("@elastic/elasticsearch");
const client = new Client({
  cloud: {
    id: "SurveySparrow:dXMtZWFzdC0yLmF3cy5lbGFzdGljLWNsb3VkLmNvbTo0NDMkMzc2Njc4Mzk3OTRlNDk1MmEyMDhjODU3NDAwZDlhZTYkZTc2OWVkNGJiYWNhNGYzZjk3N2ZjZjM2YjZiMzk2Mzk=",
  },

auth: {
  username: "elastic",
  password: "60N8gluIggA40EhYq9pAVpiz",
},
});


















// async function run() {
//   await client.index({
//     index: "game-of-thrones",
//     document: {
//       character: "Ned Stark",
//       quote: "Winter is coming.",
//     },
//   });

//   await client.index({
//     index: "game-of-thrones",
//     document: {
//       character: "Ned Stark",
//       quote: "Winter is coming second!!!.",
//     },
//   });

//   await client.index({
//     index: "game-of-thrones",
//     document: {
//       character: "Daenerys Targaryen",
//       quote: "I am the blood of the dragon.",
//     },
//   });

//   await client.index({
//     index: "game-of-thrones",
//     document: {
//       character: "Tyrion Lannister",
//       quote: "A mind needs books like a sword needs a whetstone.",
//     },
//   });

//   // here we are forcing an index refresh, otherwise we will not
//   // get any result in the consequent search
//   await client.indices.refresh({ index: "game-of-thrones" });

//   const result = await client.search({
//     index: "game-of-thrones",
//     query: {
//       match: { quote: "winter" },
//     },
//   });

//   console.log(result.hits.hits);
// }

// run().catch(console.log);

module.exports = client;


// const { Client } = require("elasticsearch");
// const client = new Client({
//   host: "http://localhost:9200",
//   apiVersion: "6.8",
// });

// client.ping(
//   {
//     requestTimeout: 30000,
//   },
//   function (error) {
//     if (error) {
//       console.error("Cannot connect to Elasticsearch.");
//       console.error(error);
//     } else {
//       console.log("Connected to Elasticsearch!");
//     }
//   }
// );

// module.exports = client;