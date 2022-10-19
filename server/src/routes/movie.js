const {
  movieCreate,
  movieGetAll,
  movieGetOne,
  movieUpdate,
  movieDelete,
  syncMoviesToWorker,
} = require("../controllers/movie.controller");

module.exports = [
  {
    method: "POST",
    path: "/movie/create",
    handler: movieCreate,
  },
  {
    method: "GET",
    path: "/movie/getAll/{movie?}",
    handler: movieGetAll,
  },
  {
    method: "GET",
    path: "/movie/getOne/{id?}",
    handler: movieGetOne,
  },
  {
    method: "PATCH",
    path: "/movie/update/{id?}",
    handler: movieUpdate,
  },
  {
    method: "DELETE",
    path: "/movie/delete/{id?}",
    handler: movieDelete,
  },
  // {
  //   method: "POST",
  //   path: "/addmovie/worker",
  //   config: {
  //     auth: false,
  //   },
  //   handler: syncMoviesToWorker,
  // },
];
