import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUserContext } from "../context/userContext";
import { Loader } from "lucide-react";

const Leave = () => {
  const { roomid } = useParams();
  const { username, id } = useUserContext();
  const [warning, setWarning] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const leave = async () => {
      const memberLeft = await axios.get(
        `http://localhost:4000/leave/${roomid}`,
        {
          params: { userId: id },
        }
      );
      console.log(memberLeft.data);
      if (memberLeft.data.status === true || false) {
        setWarning(memberLeft.data.message);
        navigate(`/dashboard/${username}`);
        localStorage.removeItem("roomId");
        localStorage.removeItem("roomName");
        localStorage.removeItem("roomPassword");
        localStorage.removeItem("isExistingMember");
      }
    };
    leave();
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

export default Leave;
