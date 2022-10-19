const Queue = require("bull");
const path = require("path");

const syncMoviesToWorkerQueue = new Queue(
  "moviesQueue",
  "redis://127.0.0.1:6379"
);

syncMoviesToWorkerQueue.process(path.join(__dirname, "syncMoviesToWorkerProcessor.js"));

module.exports = syncMoviesToWorkerQueue;

