const client = require("../configs/elasticsearch");

const syncMoviesToWorkerProcessor = async (job, done) => {
  let movieObject = job.data.movie;
  await client.index({
    index: "movies",
    document: movieObject,
  });
  await client.indices.refresh({ index: "movies" });

  done();
};

module.exports = syncMoviesToWorkerProcessor;

















// const client = require("../configs/elasticsearch");

// const syncMoviesToWorkerProcessor = async (job, done) => {
//   try {
//     let movieObject = job.data.movie;

//     await client.index({
//       index: "movies",
//       type: "_doc",
//       body: movieObject,
//     });
//     await client.indices.refresh({ index: "movies" });

//     done(null, result.hits.hits);

//   } catch (error) {
//     done(error);
//   }
// };

// module.exports = syncMoviesToWorkerProcessor;
