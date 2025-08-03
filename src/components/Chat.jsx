import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import socket from "../utils/Socket";
import axios from "axios";
import { useUserContext } from "../context/userContext";
import { SendHorizontal } from "lucide-react";
import { useNavigate } from "react-router-dom";
const Chat = () => {
  const [Message, setMessage] = useState("");
  const [Members, setMembers] = useState([]);
  const [chat, setChat] = useState([]);
  const [joinedMember,setJoinedMember] = useState([]);

  const storedRoomId = localStorage.getItem("roomId");
  const storedRoom = localStorage.getItem("roomName");
  const storedPassword = localStorage.getItem("roomPassword");
  const { id,username} = useUserContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (!socket.connected) socket.connect();

    axios
      .get("http://localhost:4000/messages", {
        params: { roomId: storedRoomId },
      })
      .then((res) => setChat(res.data))
      .catch((err) => console.error(err));

if (id && storedRoomId) {
      socket.emit("join_existing_room", { roomId : storedRoomId,username });
    } 
    socket.on('joined', (message) => {
  if (message.status) {
    const newMember = { id: Date.now(), username: message.user };

    setJoinedMember((prev) => [...prev, newMember]);

    setTimeout(() => {
      setJoinedMember((prev) => prev.filter((m) => m.id !== newMember.id));
    }, 5000);
  }
});

    
    //messagehandler
    const messageHandler = (message) => {
      setChat((prev) => [...prev, message]);
      setMessage("");
      console.log(message);
    };
    //getmessage
    socket.on("get_message", messageHandler);
   
    socket.on("members", (updatedRoom) => {
      console.log(updatedRoom);
      setMembers(updatedRoom.members);
    });
    return () => {
      socket.off("get_message", messageHandler);
    };
  }, [id, storedRoomId]);
  


  const handleMessage = (e) => {
    e.preventDefault();

    if (!Message.trim()) return;
    const msgData = {
      message: Message,
      id,
      roomid: storedRoomId,
    };

    socket.emit("send_message", msgData);
    setMessage("");
  };

  return (
    <div className="flex h-screen">
      <div className="w-64 bg-gray-950 border-r border-white p-4 text-white">
        <Sidebar members={Members} />
      </div>
      <div className="flex flex-col flex-grow bg-slate-950 p-4 text-white">
        <div className="text-xl font-semibold mb-4 border-b pb-2 border-gray-700">
          {storedRoom || "Room Name"}
        </div>
<div className="flex-grow overflow-y-auto mb-4 space-y-2 pr-2 flex flex-col">
  {chat.map((item) => (
    <div
      key={item._id}
      className={`text-white ${
        item.sender._id === id ? "self-end ml-auto" : ""
      } p-2 w-fit max-w-xs`}
    >
      <span className="block text-xs text-gray-400 mb-2 text-right">
        {item.sender.username}
      </span>
      <div
        className={`${
          item.sender._id === id ? "bg-blue-600" : "bg-gray-900"
        } p-2 rounded-3xl`}
      >
        <span className="text-base">{item.content}</span>
      </div>
    </div>
  ))}

  
</div>


        <form onSubmit={handleMessage} className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Enter Message"
            className="flex-grow px-4 py-2 rounded-md border border-gray-700 bg-gray-900 text-white focus:outline-none focus:ring focus:border-blue-500"
            value={Message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            type="submit"
            className="p-2 rounded-md bg-blue-500 hover:bg-blue-600 transition duration-200 cursor-pointer"
          >
            <SendHorizontal />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
