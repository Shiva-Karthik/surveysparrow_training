import React, { useEffect, useState } from "react";
import axios from "axios";
import { isAuthenticated, isAuthUser } from "../../redux/auth/action";
import "../all.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllMovies } from "../../redux/movie/action";

export const NavBar = () => {
  const isAuth = useSelector((store) => store.user.isAuth);
  const { user } = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = () => {
    axios.get("http://localhost:8080/user/logout").then((res) => {
      dispatch(isAuthUser(false));
      dispatch(getAllMovies([]));
    });
  };
  useEffect(() => {}, [isAuth]);
  return (
    <>
      <nav>
        <button onClick={() => {navigate("/"), location.reload();}}>Home</button>
        <ul>
          <li>
            {isAuth && (
              <button style={{ fontWeight: "bold", fontSize: "16px" }} onClick={() => navigate("/addmovie")}>Add Movie</button>
            )}
          </li>
          <li>
            {!isAuth ? (
              <>
                <button onClick={() => navigate("/login")}>Login</button>
              </>
            ) : (
              <>
                {/* <button onClick={() => navigate("/addmovie")}>Add Movie</button> */}
               
                  <h4 style={{ color: "white" }}>
                    Hello, {user.data?.username}
                  </h4>
                
              </>
            )}
          </li>
          <li>
            {isAuth ? (
              ""
            ) : (
              <button onClick={() => navigate("/register")}>Register</button>
            )}
          </li>
          <li>
            {isAuth ? (
              <>
                <button
                  onClick={() => {
                    logout();
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              ""
            )}
          </li>
        </ul>
      </nav>
    </>
  );
};
