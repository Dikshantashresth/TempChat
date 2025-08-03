import axios from "axios";
import React, { useEffect, useState } from "react";
import { useUserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setUsername: setLoggedInUsername, setId, id } = useUserContext();
  const navigate = useNavigate();
  useEffect(()=>{
    if(id){
      navigate(`/dashboard/${username}`)
    }
  },[id,username])
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("https://serverchat-p6jr.onrender.com/login", {
        username,
        password,
      });
      if (data) {
        setLoggedInUsername(username);
        setId(data.id);
        console.log(data);
        navigate(`/dashboard/${username}`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-zinc-950 h-screen flex items-center ">
      <form
        onSubmit={handleSubmit}
        className="text-white w-100 mx-auto bg-black shadow-2xl p-7 rounded-md"
      >
        <p className="py-5 font-bold text-4xl ">Login</p>
        <input
          type="text"
          placeholder="username"
          className="block w-full rounded-md p-3 mb-2 border"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <input
          type="password"
          placeholder="password"
          className="block w-full rounded-md p-3 mb-2 border"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <button className="bg-blue-500 cursor-pointer text-white block w-full rounded-md p-2">
          Login
        </button>
        <div className="footer  text-center text-white py-5">
          Don't have an account
          <Link to="/register">
            <p className="cursor-pointer text-blue-400">Register</p>{" "}
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
