import { useState, useEffect } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  isAuthenticated,
  loginUserData,
} from "../../redux/auth/action";
import "../all.css";
export const Login = () => {
  const isAuth = useSelector((store) => store.user.isAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [details, setDetails] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setDetails({
      ...details,
      [id]: value,
    });
  };
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      dispatch(loginUserData(details));
      dispatch(isAuthenticated());
      
      if (isAuth) {
        navigate("/");
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.log("Error: " + error.message);
    }
  };

  return (
    <div className="container">
      <h1>Login</h1>
      <div className="form">
        <form action="" onSubmit={handleSubmit}>
          <input
            type="username"
            id="username"
            name="username"
            placeholder="Username"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />
          <input className="submit-btn" type="submit" />
        </form>
      </div>
    </div>
  );
};
