import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUserContext } from "../context/userContext";
import { Link, useNavigate } from "react-router-dom";
import { Delete, DeleteIcon, HomeIcon, LogIn, LogOut, Trash } from "lucide-react";

const Rooms = () => {
  const { id } = useUserContext();
  const [Rooms, setRooms] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const rooms = await axios.get(`https://serverchat-p6jr.onrender.com/rooms/${id}`);
        setRooms(rooms.data);
     
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchRooms();
  }, [id]);
 
    const handleJoin = (roomId, roomName) => {
  localStorage.setItem("roomId", roomId);
  localStorage.setItem("roomName", roomName);
  localStorage.setItem("isExistingMember", "true"); 
  navigate(`/chat`);
};


  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-3">
      {Rooms.length>0?Rooms.map((item) => (
        <div
          key={item._id}
          className="bg-gradient-to-br from-slate-800 to-slate-900 shadow-lg p-6 rounded-2xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl flex flex-col justify-between "
        >
          <div>
            <HomeIcon />
            <h2 className="text-xl font-bold text-white mb-2">
              {item.roomName}
            </h2>
            <p className="text-slate-400 text-sm">
              {item.members?.length || 0} members
            </p>
          </div>
       
            <button onClick={()=>handleJoin( item._id,item.roomName)}className="flex items-center justify-center gap-2 bg-blue-600 cursor-pointer hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-300 w-full">
              <LogIn size={18} />
              Join Room
            </button>

          {item.admins?.[0] === id ? (
            <Link to={`/remove/${item._id}`}>
              <button className="flex items-center justify-center gap-2 mt-2 cursor-pointer bg-red-900 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-300 w-full">
                <Trash size={18} />
                Delete
              </button>
            </Link>
          ):<Link to={`/leave/${item._id}`}>
              <button className="flex items-center justify-center gap-2 mt-2 cursor-pointer bg-red-900 hover:bg-red-800 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-300 w-full">
                <LogOut size={18} className="" />
                Leave
              </button>
            </Link> }
        </div>
      )):"No Rooms Please Join"}
    </div>
  );
};

export default Rooms;
