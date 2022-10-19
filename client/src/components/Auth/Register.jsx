import { useState, useEffect } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../all.css";

export const Register = () => {
  const navigate = useNavigate();
  const [details, setDetails] = useState({
    username: "",
    email: "",
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
      axios
        .post("http://localhost:8080/user/register", details)
        .then(({ data }) => {
          alert(`${data.message}`);
          if (data.message == "User registered successfully") {
            navigate("/login");
          }
        });
    } catch (error) {
      console.log("Error: " + error.message);
    }
  };

  return (
    <div className="container">
      <h1>Register</h1>
      <div className="form">
        <form action="" onSubmit={handleSubmit}>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            onChange={handleChange}
            required
          />
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
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
          <input className="submit-btn" type="submit"/>
        </form>
      </div>
    </div>
  );
};
