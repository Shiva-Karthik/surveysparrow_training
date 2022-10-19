import { useState, useEffect } from "react";
import React from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllMoviesData,
  getSearchedMovieData,
} from "../../redux/movie/action";
import "../all.css";

const Home = () => {
  const [searchedMovie, setSearchedMovie] = useState("");

  const isAuth = useSelector((store) => store.user.isAuth);

  const { movies, loading } = useSelector((store) => store.movies);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const getMoviesData = () => {
    dispatch(getAllMoviesData());
  };
  
  const handleChange = (e) => {
    if(e.target.value === ""){
      return;
    }
    setSearchedMovie(e.target.value);
  };
  
  const searchedMovieData = () => {
    
    if(searchedMovie=== ""){
      location.reload();
      return;
    }
    dispatch(getSearchedMovieData(searchedMovie));
  };
  
  useEffect(() => {
    getMoviesData();
  }, []);

  return loading ? (
    <>
      <h3 className="loading">Loading...</h3>
    </>
  ) : (
    <div>
      <div className="search-bar-container">
        {!isAuth && <h4>PLEASE LOGIN TO ADD MOVIES</h4>}
        {isAuth && movies.length > 0 &&(
          <div className="search-bar">
            <input type="text" onChange={handleChange} />
            <button onClick={searchedMovieData}>Search Movie</button>
          </div>
        )}
      </div>
      <div className="movie-card-container">
        {movies !== undefined
          ? movies.map((e, i) => {
              return (
                <div className="movie-card" key={e.id}>
                  <div className="movie-image">
                    <img src={e.image_url} alt="" />
                  </div>
                  <div className="movie-name">Movie Name: {e.movieName}</div>
                  <div className="movie-year">Year: {e.year}</div>
                  <div className="movie-imdb">IMDb: {e.imdb}</div>
                </div>
              );
            })
          : ""}
      </div>
    </div>
  );
};

export default Home;
