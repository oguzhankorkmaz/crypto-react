import React, { useEffect, useState, useCallback } from "react";
import "./layout.scss";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import ProfileCard from "../ProfileCard";

function Layout({ children }) {
  const [name, setName] = useState("");
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
  const [users, setUsers] = useState([]);
  const history = useNavigate();

  //   useCallback(() => {
  //     refreshToken();
  //   }, [users, token]);

  //   const refreshToken = useEffect(() => {
  //     try {
  //       const response = axios.get("http://localhost:5000/token");
  //       console.log("deneme");
  //       setToken(response.data.accessToken);
  //       const decoded = jwt_decode(response.data.accessToken);
  //       setName(decoded.name);
  //       setExpire(decoded.exp);
  //     } catch (error) {
  //       console.log(error);
  //       if (error.response) {
  //         history.push("/");
  //       }
  //     }
  //   }, [history]);

  const axiosJWT = axios.create();
  useEffect(() => {
    axiosJWT.interceptors.request.use(
      async (config) => {
        const currentDate = new Date();
        if (expire * 1000 < currentDate.getTime()) {
          const response = await axios.get("http://localhost:5000/token");
          console.log("deneme2");
          config.headers.Authorization = `Bearer ${response.data.accessToken}`;
          setToken(response.data.accessToken);
          console.log(token);
          const decoded = jwt_decode(response.data.accessToken);
          setName(decoded.name);
          setExpire(decoded.exp);
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }, [axiosJWT.interceptors.request, expire]);

  return (
    <>
      <main>
        <div className="container">{children}</div>
        <ProfileCard></ProfileCard>
      </main>
    </>
  );
}

export default Layout;
