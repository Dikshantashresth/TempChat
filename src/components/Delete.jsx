import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUserContext } from "../context/userContext";
import Loader from "./Loader";
const Delete = () => {
  const { roomid } = useParams();
  const { username } = useUserContext();
  const [warning, setWarning] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const remove = async () => {
      const deleted = await axios.delete(
        `https://serverchat-p6jr.onrender.com/delete/${roomid}`
      );
      console.log(deleted);
      if (deleted.status === false || true) {
        setWarning(deleted.message);
        navigate(`/dashboard/${username}`);
        localStorage.removeItem("roomId");
        localStorage.removeItem("roomName");
        localStorage.removeItem("roomPassword");
        localStorage.removeItem("isExistingMember");
      }
    };
    remove();
  }, [roomid]);
  return (
    <div>
      <Loader />
      <div className="border border-red-600 text-red-700 bg-red-100 rounded-lg p-4 max-w-md mx-auto mt-6 text-center shadow">
        {warning}
      </div>
    </div>
  );
};

export default Delete;
