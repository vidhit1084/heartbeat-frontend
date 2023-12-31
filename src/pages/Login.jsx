import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Login = () => {
  const navigate = useNavigate();

  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  
  const handleLogin = async () => {
    console.log(user);
    const resp = await axios.post("http://localhost:3000/auth/login", user);
    setUser(resp.data);
    console.log(resp.data);
    localStorage.setItem("user", JSON.stringify(resp.data));

    // setUser(resp.data);
    navigate("/");
  };
  // useEffect(() => {
  //   const json = JSON.stringify(user);
  //   localStorage.setItem("user", json);
  // }, [user]);

  return (
    <div className="login d-flex align-items-center mt-4">
      <div className="card w-25 mx-auto  p-4">
        <h1 className="text-center text-dark mb-4">Login</h1>
        <form action="" className="">
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
          </div>
        </form>
        <div className="d-flex justify-content-between">
          <button onClick={handleLogin} className="btn btn-primary mx-auto">
            Login
          </button>
          {/* <div className="d-flex align-items-center">
            <span className="text-primary mx-2 fs-6">Need an account?</span>
            <button
              onClick={() => navigate("/register")}
              className="btn btn-primary"
            >
              Sign-Up
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Login;
