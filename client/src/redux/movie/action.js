import axios from "axios";
export const ADD_MOVIE = "ADD_MOVIE";
export const GET_ONE_MOVIE = "ADD_MOVIE";
export const GET_ALL_MOVIES = "ADD_MOVIES";
export const UPDATE_MOVIES = "UPDATE_MOVIES";
export const DELETE_MOVIE = "DELETE_MOVIES";
export const GET_SEARCHED_MOVIE = "GET_SEARCHED_MOVIE";

export const MOVIES_LOADING = "MOVIES_LOADING";

export const addMovie = (movies) => ({ type: ADD_MOVIE, payload: movies });
export const getOneMovie = (movies) => ({
  type: GET_ONE_MOVIE,
  payload: movies,
});
export const getAllMovies = (movies) => ({
  type: GET_ALL_MOVIES,
  payload: movies,
});
export const getSearchedMovies = (movies) => ({
  type: GET_SEARCHED_MOVIE,
  payload: movies,
});
export const deleteMovies = () => ({ type: DELETE_MOVIE });
export const moviesLoading = () => ({ type: MOVIES_LOADING });

export const addMovieData = (details) => (dispatch) => {
  dispatch(moviesLoading());
  axios
    .post("http://localhost:8080/movie/create", details)
    .then(({ data }) => {
      dispatch(addMovie(data));
      dispatch(getAllMoviesData());
      // dispatch(getAllMovies(data.movies));
      alert(`${data.message}`);
    })
    .catch((err) => {
      console.log(err.message);
    });
};

export const getAllMoviesData = () => (dispatch) => {
  dispatch(moviesLoading());
  axios
    .get("http://localhost:8080/movie/getAll")
    .then(({ data }) => {
      dispatch(getAllMovies([...data.movies]));
    })
    .catch((err) => {
      console.log(err.message);
    });
};

export const getOneMovieData = (id) => (dispatch) => {
  axios
    .get(`http://localhost:8080/movie/getOne/${id}`)
    .then(({ data }) => {
      dispatch(getOneMovie(data));
      alert(`${data.message}`);
    })
    .catch((err) => {
      console.log(err.message);
    });
};

export const getSearchedMovieData = (movie) => (dispatch) => {
  // dispatch(moviesLoading());
  axios
    .get(`http://localhost:8080/movie/getAll/${movie}`)
    .then(({ data }) => {
      console.log("SearchedMovies from redux", data);
      let SearchedMovies = [];
      for (let i = 0; i < data.movies.length; i++) {
        SearchedMovies.push(data.movies[i]._source);
      }
      if(SearchedMovies.length===0){
        alert("No movies were found");
        dispatch(getAllMoviesData());
      }
      dispatch(getAllMovies([...SearchedMovies]));
    })
    .catch((err) => {
      

      console.log("Error in searching movies", err.message);
    });
};

export const updateMovieData = (id) => (dispatch) => {
  axios
    .patch(`http://localhost:8080/movie/update/${id}`)
    .then(({ data }) => {
      dispatch(getAllMovies(data));
      dispatch(getAllMoviesData());
      alert(`${data.message}`);
    })
    .catch((err) => {
      console.log(err.message);
    });
};

export const deleteMovieData = (id) => (dispatch) => {
  axios
    .delete(`http://localhost:8080/movie/update/${id}`)
    .then(({ data }) => {
      dispatch(deleteMovies());
      dispatch(getAllMoviesData());
      alert(`${data.message}`);
    })
    .catch((err) => {
      console.log(err.message);
    });
};
