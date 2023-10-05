import React from "react";
import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";
import "../styles/Welcome.css";
const Welcome = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="welcome-container">
      <h1 className="welcome-heading">Welcome</h1>
      {user ? (
        <div>
          <h2 className="welcome-message">Hello, {user.name}</h2>
          <NavBar />
        </div>
      ) : (
        <div>
          <button
            onClick={() => navigate("/login")}
            className="btn btn-primary welcome-button"
          >
            Login
          </button>
        </div>
      )}
    </div>
  );
};

export default Welcome;
