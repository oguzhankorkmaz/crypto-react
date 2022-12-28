import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [msg, setMsg] = useState("");
  const history = useNavigate();

  const Register = async (e) => {
    e.preventDefault();
    try {
      console.log("try'a girdi");
      await axios.post("http://localhost:5000/users", {
        name: name,
        lastName: lastName,
        userName: userName,
        password: password,
        confPassword: confPassword,
      });
      console.log("yönlendir");
      history.push("/");
    } catch (error) {
      console.log("olmadı");
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div className="login-area">
      <div className="login-card">
        <p className="title">Register</p>
        <form onSubmit={Register}>
          <div className="input-area">
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="input-area">
            <label>Lastname</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
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
          <div className="input-area">
            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="******"
              value={confPassword}
              onChange={(e) => setConfPassword(e.target.value)}
            />
          </div>
          <div className="input-area button-area">
            <button type="submit" className="button green">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
