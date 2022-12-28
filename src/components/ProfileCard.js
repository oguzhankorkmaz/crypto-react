import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import img from "../img/profile.png";

const ProfileCard = () => {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [money, setMoney] = useState("");
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
  const [users, setUsers] = useState([]);
  const history = useNavigate();

  useCallback(() => {
    refreshToken();
  }, [users, token]);

  const refreshToken = useEffect(() => {
    try {
      const response = axios.get("http://localhost:5000/token");
      setToken(response.data.accessToken);
      const decoded = jwt_decode(response.data.accessToken);
      setName(decoded.name);
      setExpire(decoded.exp);
    } catch (error) {
      console.log(error);
      if (error.response) {
        history.push("/");
      }
    }
  }, [history]);

  const axiosJWT = axios.create();
  useEffect(() => {
    axiosJWT.interceptors.request.use(
      async (config) => {
        const currentDate = new Date();
        if (expire * 1000 < currentDate.getTime()) {
          const response = await axios.get("http://localhost:5000/token");
          config.headers.Authorization = `Bearer ${response.data.accessToken}`;
          setToken(response.data.accessToken);
          const decoded = jwt_decode(response.data.accessToken);
          setName(decoded.name);
          setLastname(decoded.lastName);
          setUsername(decoded.userName);
          setMoney(decoded.money);
          setExpire(decoded.exp);
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }, [axiosJWT.interceptors.request, expire]);

  useEffect(() => {
    const data = axiosJWT.get("http://localhost:5000/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }, []);

  const Logout = async () => {
    try {
      await axios.delete("http://localhost:5000/logout");
      history("/");
    } catch (error) {
      console.log(error);
    }
  };

  // const getUsers = useEffect (() => {
  //   const response = axiosJWT.get("http://localhost:5000/users", {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   });
  //   console.log(users)
  //   setUsers(response.data);
  // }, [axiosJWT, token, users]);

  return (
    <div className="profile-card">
      <div className="card">
        <div className="img-area">
          <img src={img} alt="Profile" />
        </div>
        <div className="content">
          <div className="username">{username}</div>
          <div className="name">
            {name} {lastname}
          </div>
          <div className="money">{money} $</div>

          <div className="wallet-area">
            <div className="title">Wallet</div>
            <div className="coins">
              <div className="coin">
                <div className="coin-name">
                  <div className="token">BTC</div>
                  <div className="token-long">Bitcoin</div>
                </div>
                <div className="coin-available">0.000456</div>
              </div>
            </div>
          </div>
        </div>
        <div className="logout-area">
          <button onClick={Logout} className="button red">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
