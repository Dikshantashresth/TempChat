import React from "react";
import { useState } from "react";
import socket from "../utils/Socket";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/userContext";
const Create = () => {
  const [RoomName, setRoomName] = useState();
  const [Password, setPassword] = useState();
  const { id } = useUserContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }
    socket.on("roomCreated", (message) => {
      localStorage.setItem("roomName", RoomName);
      localStorage.setItem("roomPassword", Password);
      localStorage.setItem("roomId", message.room);
      if (message.status) {
        navigate("/chat");
      }
    });
    return () => {
      socket.off("roomCreated");
    };
  }, [RoomName, Password]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const roomData = {
      roomname: RoomName,
      password: Password,
      userid: id,
    };
    socket.emit("create_room", roomData);
  };
  return (
    <div className="bg-zinc-900 h-screen text-white flex justify-around items-center">
      <div className="card rounded-lg bg-black shadow-xl/30 shadow-black flex flex-col p-4 w-70 ">
        <div className="flex flex-row items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-7"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
            />
          </svg>

          <h1 className="font-bold text-3xl ">Create</h1>
        </div>
        <label className="mt-2 mb-2">Roomname</label>
        <input
          type="text"
          className="text-white border border-white rounded-lg p-3"
          placeholder="Roomname"
          value={RoomName}
          onChange={(e) => setRoomName(e.target.value)}
        />
        <label className="mt-2 mb-2">Password</label>
        <input
          type="text"
          className="text-white border border-white rounded-lg p-3"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleSubmit}
          className="mt-3 bg-slate-900 p-2 rounded-lg "
        >
          Create
        </button>
      </div>
    </div>
  );
};

export default Create;
