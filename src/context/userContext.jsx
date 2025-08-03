import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
const UserContext = createContext({});
export const useUserContext = () => useContext(UserContext);

export function UserProvider({ children }) {
  const [username, setUsername] = useState("");
  const [id, setId] = useState(null);
  const [roomid, setRoomId] = useState();
  const [roomname, setRoomname] = useState();

  const navigate = useNavigate();
  const location = useLocation();
  const shouldRedirect =
    location.pathname === "/" ||
    location.pathname === "/login" ||
    location.pathname === "/register";
  useEffect(() => {
    axios
      .get("https://serverchat-p6jr.onrender.com/profile", { withCredentials: true })
      .then((res) => {
        if (res.data) {
          setUsername(res.data.username);
          setId(res.data.userId);
          if (shouldRedirect) {
            navigate(`/dashboard/${username}`);
          }
        }
        
      })
      .catch((err) => {
        console.log("Not logged in", err.message);
        navigate('/')
      });
  }, [username]);

  return (
    <UserContext.Provider
      value={{roomname,setRoomname ,roomid, setRoomId, username, setUsername, id, setId }}
    >
      {children}
    </UserContext.Provider>
  );
}
