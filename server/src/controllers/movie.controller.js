const Movie = require("../models/movie.model");
const User = require("../models/user.model");
const redis = require("../configs/redis");
const client = require("../configs/elasticsearch");
const Queue = require("bull");
const path = require("path");

const syncMoviesToWorkerQueue = new Queue(
  "moviesQueue",
  "redis://127.0.0.1:6379"
);

const movieCreate = async (req, reply) => {
  try {
    const movie = await Movie.create({
      userId: req.userId,
      movieName: req.payload.movieName,
      year: req.payload.year,
      imdb: req.payload.imdb,
      image_url: req.payload.image_url,
    });
    // const movies = await Movie.findAll();
    syncMoviesToWorkerQueue.add({ movie });
    redis.del(`allMovies_${req.userId}`);
    reply({
      message: "Movie added successfully",
      data: movie,
    });
  } catch (error) {
    reply({ Error: error.message });
  }
};

const movieGetAll = async (req, reply) => {
  try {
    if (req.params.movie) {
      console.log(req.params.movie);
      const result = await client.search({
        index: "movies",
        // sort: [{ score: "desc" }],
        query: {
          bool: {
            must: {
              query_string: {
                query: `*${req.params.movie}*`,
              },
            },
            filter: {
              term: { userId: `${req.userId}` },
            },
          },
        },
      });
      return reply({ movies: result.hits.hits, msg: "movie found" });
    } else {
      redis.get(`allMovies_${req.userId}`, async function (err, fetchedMovies) {
        if (err) return reply({ Error: error.message });
        if (fetchedMovies) {
          return reply({ movies: JSON.parse(fetchedMovies), redis: true });
        }

        const movies = await Movie.findAll({ where: { userId: req.userId } });
        redis.set(`allMovies_${req.userId}`, JSON.stringify(movies));

        reply({ movies, redis: false });
      });
    }
  } catch (error) {
    reply({ Error: error.message });
  }
};

const movieGetOne = async (req, reply) => {
  try {
    redis.get(`Movie.${req.userId}`, async function (err, fetchedMovie) {
      if (err) return reply({ Error: error.message });
      if (fetchedMovie) {
        return reply({ movie: JSON.parse(fetchedMovie), redis: true });
      }
      const movie = await Movie.findByPk(req.userId);
      redis.set(`Movie.${req.userId}`, JSON.stringify(movie));
      reply({ movie, redis: false });
    });
  } catch (error) {
    reply({ Error: error.message });
  }
};

const movieUpdate = async (req, reply) => {
  try {
    const movie = await Movie.update(req.payload, {
      where: { id: req.params.id },
    });
    const movieById = await Movie.findByPk(req.params.id);
    const movies = await Movie.findAll();
    redis.set(`Movie.${req.params.id}`, JSON.stringify(movieById));
    redis.set("allMovies", JSON.stringify(movies));
    reply({
      message: "Movie updated successfully",
      data: movie,
    });
  } catch (error) {
    reply({ Error: error.message });
  }
};

const movieDelete = async (req, reply) => {
  try {
    const movie = await Movie.destroy({ where: { id: req.params.id } });
    const movies = await Movie.findAll();
    redis.del(`Movie.${req.userId}`);
    redis.set(`allMovies_${req.userId}`, JSON.stringify(movies));
    reply({
      message: "Movie deleted successfully",
      data: movie,
    });
  } catch (error) {
    reply({ Error: error.message });
  }
};

// const syncMoviesToWorker = async (req, reply) => {
//   try {
//     const movies = await Movie.findAll();
//     // console.log(JSON.parse(JSON.stringify(movies)));
//     const m = JSON.parse(JSON.stringify(movies));
//     m.forEach((movie, i) => {
//       // console.log("queueing movie------------------------", movie);
//       syncMoviesToWorkerQueue.add({ movie }).then(() => {
//         if (i + 1 === m.length) {
//           reply("All movies added");
//         }
//         // console.log("queueing movie------------------------", movie);
//       });
//     });
//     reply("All movies added");
//   } catch (error) {
//     return reply({ message: error.message });
//   }
// };

module.exports = {
  movieCreate,
  movieGetAll,
  movieGetOne,
  movieUpdate,
  movieDelete,
  // syncMoviesToWorker,
};
