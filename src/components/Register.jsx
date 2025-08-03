import axios from "axios";
import React, { useState } from "react";
import { useUserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setUsername: setLoggedInUsername, setId } = useUserContext();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data } = await axios.post("https://serverchat-p6jr.onrender.com/register", {
      username,
      password,
    });
    if (data) {
      setLoggedInUsername(username);
      setId(data.id);

      navigate(`/dashboard/${username}`);
    }
  };

  return (
    <div className="bg-zinc-950 h-screen flex items-center ">
      <form
        onSubmit={handleSubmit}
        className="w-100 mx-auto bg-black text-white p-7 rounded-md"
      >
        <p className="py-5 font-bold text-4xl">Register</p>
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
        <button className="bg-blue-500 text-white block w-full rounded-md p-2">
          Register
        </button>
        <div className="footer  text-center text-white py-5">
          Already have an account?
          <Link to="/">
            <p className="text-blue-400">Login</p>{" "}
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
