import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./login.scss";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const history = useNavigate("");

  const Auth = (e) => {
    try {
      axios.post("http://localhost:5000/login", {
        userName: userName,
        password: password,
      });
      history("/homepage");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <>
      <div className="login-area">
        <div className="login-card">
          <p className="title">Login</p>
          <form onSubmit={Auth}>
            <div className="input-area">
              <label>Username</label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className="input-area">
              <label>Password</label>
              <input
                type="password"
                placeholder="******"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="input-area button-area">
              <button type="submit" className="button green">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
