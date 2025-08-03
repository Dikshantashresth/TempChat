import { UserRound } from "lucide-react";
import React, { useEffect, useState } from "react";
import socket from "../utils/Socket";

const Sidebar = ({ members, currentUser }) => {
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    // Emit current user join
    socket.emit("join", currentUser);

    // Handle joined event
    socket.on("joined", ({ user, onlineUsers }) => {
      setOnlineUsers(onlineUsers);
    });

    // Handle left event
    socket.on("left", ({ user, onlineUsers }) => {
      setOnlineUsers(onlineUsers);
    });

    // Cleanup listeners
    return () => {
      socket.off("joined");
      socket.off("left");
    };
  }, [currentUser]);

  return (
    <div>
      <h3 className="text-lg font-bold mb-4">Members</h3>

      <div className="space-y-2">
        {members.map((member) => {
          const isOnline = onlineUsers.includes(member.username);

          return (
            <div
              key={member._id}
              className="flex items-center justify-between bg-gray-800 p-2 rounded-lg"
            >
              <div className="text-white">{member.username}</div>
              <div
                className={`h-3 w-3 rounded-full ${
                  isOnline ? "bg-green-500" : "bg-red-500"
                }`}
              ></div>
            </div>
          );
        })}
      </div>

      <button className="mt-6 w-full bg-red-700 hover:bg-red-600 text-white py-2 rounded-lg">
        Leave Room
      </button>
    </div>
  );
};

export default Sidebar;
